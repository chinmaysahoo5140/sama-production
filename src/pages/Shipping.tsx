import { motion } from 'framer-motion';
import { Truck, Clock, MapPin, Package, CheckCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';

const Shipping = () => {
  const shippingInfo = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Enjoy free standard shipping on all orders above ₹1,500 across India.',
    },
    {
      icon: Clock,
      title: 'Delivery Time',
      description: 'Standard delivery takes 5-7 business days. Express delivery available for select locations.',
    },
    {
      icon: MapPin,
      title: 'Pan-India Delivery',
      description: 'We deliver to all major cities and towns across India through trusted courier partners.',
    },
    {
      icon: Package,
      title: 'Secure Packaging',
      description: 'All products are carefully packaged with premium materials to ensure safe delivery.',
    },
  ];

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
              <span className="text-foreground">Shipping</span>{' '}
              <span className="text-gradient">Information</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Everything you need to know about shipping and delivery.
            </motion.p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {shippingInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 border border-border"
                >
                  <div className="p-3 bg-accent rounded-lg w-fit mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="prose prose-sage max-w-none"
            >
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">Shipping Rates</h2>
              
              <div className="bg-card rounded-xl p-6 border border-border mb-8">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 text-foreground">Order Value</th>
                      <th className="text-left py-3 text-foreground">Shipping Cost</th>
                      <th className="text-left py-3 text-foreground">Delivery Time</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border">
                      <td className="py-3">Below ₹1,500</td>
                      <td className="py-3">₹99</td>
                      <td className="py-3">5-7 business days</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3">₹1,500 and above</td>
                      <td className="py-3">FREE</td>
                      <td className="py-3">5-7 business days</td>
                    </tr>
                    <tr>
                      <td className="py-3">Express Delivery</td>
                      <td className="py-3">₹199</td>
                      <td className="py-3">2-3 business days</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-display font-bold text-foreground mb-6">Order Processing</h2>
              <ul className="space-y-3 mb-8">
                {[
                  'Orders placed before 2 PM IST are processed the same day',
                  'Orders placed on weekends are processed on Monday',
                  'You will receive a confirmation email with tracking details',
                  'Track your order using the tracking number provided',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-display font-bold text-foreground mb-6">Important Notes</h2>
              <ul className="space-y-3">
                {[
                  'Delivery times may vary during festivals and sale periods',
                  'Remote locations may take 2-3 additional days for delivery',
                  'Cash on Delivery (COD) available for orders up to ₹10,000',
                  'Signature required upon delivery for all orders',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shipping;
