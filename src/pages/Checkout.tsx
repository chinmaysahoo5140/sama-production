import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuthModal } from '@/components/auth/AuthModal';
import { OTPVerification } from '@/components/checkout/OTPVerification';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
    // Reset phone verification if phone number changes
    if (name === 'phone') {
      setPhoneVerified(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to login to checkout",
        variant: "destructive",
      });
      return;
    }

    if (!address.fullName || !address.phone || !address.addressLine1 || !address.city || !address.state || !address.pincode) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!phoneVerified) {
      toast({
        title: "Phone verification required",
        description: "Please verify your phone number before proceeding",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load payment gateway');
      }

      // Format phone number
      let formattedPhone = address.phone.replace(/[\s-]/g, '');
      if (!formattedPhone.startsWith('+')) {
        if (formattedPhone.startsWith('91')) {
          formattedPhone = '+' + formattedPhone;
        } else {
          formattedPhone = '+91' + formattedPhone;
        }
      }

      // Create order
      const response = await supabase.functions.invoke('create-razorpay-order', {
        body: {
          amount: totalPrice,
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          shippingAddress: address,
          phone: formattedPhone,
        },
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to create order');
      }

      const { orderId, amount, currency, dbOrderId, key, trackingId } = response.data;

      // Open Razorpay checkout
      const options = {
        key,
        amount,
        currency,
        name: 'SAMA Leather',
        description: 'Purchase from SAMA Leather',
        order_id: orderId,
        handler: async function (response: any) {
          // Verify payment
          const verifyResponse = await supabase.functions.invoke('verify-razorpay-payment', {
            body: {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              dbOrderId,
            },
          });

          if (verifyResponse.error) {
            toast({
              title: "Payment verification failed",
              description: "Please contact support",
              variant: "destructive",
            });
            return;
          }

          clearCart();
          toast({
            title: "Payment successful!",
            description: `Your order has been placed. Tracking ID: ${trackingId}`,
          });
          navigate('/profile');
        },
        prefill: {
          name: address.fullName,
          contact: address.phone,
          email: user.email,
        },
        theme: {
          color: '#c9a87c',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Payment failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20 text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Your cart is empty</h1>
          <Link to="/shop">
            <Button variant="hero">Continue Shopping</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AuthModal />

      <main className="pt-20 md:pt-24">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
        </div>

        <section className="container mx-auto px-4 pb-16">
          <h1 className="text-3xl font-display font-bold mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Shipping Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="text-xl font-display font-semibold mb-6 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Shipping Address
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={address.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={address.phone}
                      onChange={handleInputChange}
                      placeholder="+91 9876543210"
                    />
                  </div>

                  <div>
                    <Label htmlFor="addressLine1">Address Line 1 *</Label>
                    <Input
                      id="addressLine1"
                      name="addressLine1"
                      value={address.addressLine1}
                      onChange={handleInputChange}
                      placeholder="Street address"
                    />
                  </div>

                  <div>
                    <Label htmlFor="addressLine2">Address Line 2</Label>
                    <Input
                      id="addressLine2"
                      name="addressLine2"
                      value={address.addressLine2}
                      onChange={handleInputChange}
                      placeholder="Apartment, suite, etc."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={address.city}
                        onChange={handleInputChange}
                        placeholder="Mumbai"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={address.state}
                        onChange={handleInputChange}
                        placeholder="Maharashtra"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={address.pincode}
                      onChange={handleInputChange}
                      placeholder="400001"
                    />
                  </div>
                </div>
              </div>

              {/* OTP Verification */}
              {address.phone && address.phone.length >= 10 && user && (
                <OTPVerification
                  phone={address.phone}
                  onVerified={() => setPhoneVerified(true)}
                  isVerified={phoneVerified}
                />
              )}
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-card rounded-2xl p-6 border border-border sticky top-24">
                <h2 className="text-xl font-display font-semibold mb-6 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-muted-foreground text-sm">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-green-500">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-display font-bold pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <Button
                  variant="hero"
                  size="lg"
                  className="w-full mt-6"
                  onClick={handlePayment}
                  disabled={loading || !phoneVerified}
                >
                  {loading ? 'Processing...' : `Pay ${formatPrice(totalPrice)}`}
                </Button>

                {!phoneVerified && address.phone && (
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    Please verify your phone number to proceed
                  </p>
                )}

                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4" />
                  Secure payment powered by Razorpay
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
