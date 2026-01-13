import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Truck, CheckCircle, Clock, Loader2, MapPin, CreditCard, Box } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface OrderData {
  id: string;
  tracking_id: string;
  status: string;
  total: number;
  created_at: string;
  items: any[];
  shipping_address: any;
}

interface StatusHistory {
  id: string;
  status: string;
  message: string | null;
  created_at: string;
}

const statusSteps = [
  { key: 'pending', title: 'Order Placed', icon: Package },
  { key: 'paid', title: 'Payment Confirmed', icon: CreditCard },
  { key: 'processing', title: 'Order Processing', icon: Box },
  { key: 'shipped', title: 'Shipped', icon: Truck },
  { key: 'out_for_delivery', title: 'Out for Delivery', icon: Truck },
  { key: 'delivered', title: 'Delivered', icon: CheckCircle },
];

const TrackOrder = () => {
  const [trackingId, setTrackingId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [statusHistory, setStatusHistory] = useState<StatusHistory[]>([]);
  const [notFound, setNotFound] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      toast.error('Please enter a tracking ID');
      return;
    }

    setIsLoading(true);
    setNotFound(false);
    setOrder(null);
    setStatusHistory([]);

    try {
      // Fetch order by tracking_id
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('tracking_id', trackingId.trim().toUpperCase())
        .maybeSingle();

      if (orderError) throw orderError;

      if (!orderData) {
        setNotFound(true);
        toast.error('Order not found. Please check your tracking ID.');
        setIsLoading(false);
        return;
      }

      setOrder(orderData as OrderData);

      // Fetch status history
      const { data: historyData, error: historyError } = await supabase
        .from('order_status_history')
        .select('*')
        .eq('order_id', orderData.id)
        .order('created_at', { ascending: true });

      if (historyError) throw historyError;
      setStatusHistory((historyData || []) as StatusHistory[]);

    } catch (error: any) {
      console.error('Error fetching order:', error);
      toast.error('Failed to fetch order details');
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentStepIndex = () => {
    if (!order) return -1;
    return statusSteps.findIndex(step => step.key === order.status);
  };

  const getStepDate = (stepKey: string) => {
    const historyItem = statusHistory.find(h => h.status === stepKey);
    if (historyItem) {
      return format(new Date(historyItem.created_at), 'MMM d, yyyy - h:mm a');
    }
    if (stepKey === 'pending' && order) {
      return format(new Date(order.created_at), 'MMM d, yyyy - h:mm a');
    }
    return '';
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      
      <main className="pt-20 md:pt-24">
        <section className="py-16 bg-card border-b border-border">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-display font-bold mb-4"
            >
              <span className="text-foreground">Track Your</span>{' '}
              <span className="text-gradient">Order</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Enter your tracking ID to see the current status of your delivery.
            </motion.p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleTrack}
              className="bg-card rounded-xl p-6 border border-border mb-8"
            >
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Enter Tracking ID (e.g., SAMA-ABC123)"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                    className="pl-10 uppercase"
                  />
                </div>
                <Button type="submit" variant="hero" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Track'}
                </Button>
              </div>
            </motion.form>

            {order && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Order Summary Card */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Tracking ID</p>
                      <p className="text-xl font-semibold text-primary">{order.tracking_id}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-accent rounded-lg">
                        <Truck className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Current Status</p>
                        <p className="text-lg font-semibold text-foreground capitalize">
                          {order.status.replace(/_/g, ' ')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Order Date</p>
                      <p className="font-medium">{format(new Date(order.created_at), 'MMM d, yyyy')}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Amount</p>
                      <p className="font-medium">₹{order.total.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Items</p>
                      <p className="font-medium">{order.items?.length || 0} item(s)</p>
                    </div>
                    {order.shipping_address && (
                      <div>
                        <p className="text-muted-foreground">Delivery City</p>
                        <p className="font-medium">{order.shipping_address.city || 'N/A'}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-semibold mb-6">Order Progress</h3>
                  <div className="relative">
                    {statusSteps.map((step, index) => {
                      const isCompleted = index <= currentStepIndex;
                      const isCurrent = index === currentStepIndex;
                      const StepIcon = step.icon;
                      const stepDate = getStepDate(step.key);

                      return (
                        <div key={step.key} className="flex gap-4 pb-8 last:pb-0">
                          <div className="relative">
                            <motion.div
                              initial={{ scale: 0.8 }}
                              animate={{ scale: isCurrent ? 1.1 : 1 }}
                              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                isCompleted
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted border-2 border-border'
                              } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}
                            >
                              <StepIcon className={`h-5 w-5 ${isCompleted ? '' : 'text-muted-foreground'}`} />
                            </motion.div>
                            {index !== statusSteps.length - 1 && (
                              <div
                                className={`absolute left-1/2 top-10 w-0.5 h-full -translate-x-1/2 transition-colors ${
                                  index < currentStepIndex ? 'bg-primary' : 'bg-border'
                                }`}
                              />
                            )}
                          </div>
                          <div className="flex-1 min-h-[48px]">
                            <p className={`font-medium ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {step.title}
                            </p>
                            {stepDate && (
                              <p className="text-sm text-muted-foreground">{stepDate}</p>
                            )}
                            {isCurrent && (
                              <span className="inline-block mt-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Shipping Address */}
                {order.shipping_address && (
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Delivery Address</h3>
                    </div>
                    <div className="text-muted-foreground">
                      <p className="font-medium text-foreground">{order.shipping_address.fullName}</p>
                      <p>{order.shipping_address.address}</p>
                      <p>{order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {notFound && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-xl p-8 border border-border text-center"
              >
                <Package className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Order Not Found</h3>
                <p className="text-muted-foreground">
                  We couldn't find an order with that tracking ID. Please check and try again.
                </p>
              </motion.div>
            )}

            {!order && !notFound && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Package className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Enter your tracking ID above to track your package
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TrackOrder;