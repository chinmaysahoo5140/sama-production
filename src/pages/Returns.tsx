import { motion } from 'framer-motion';
import { RefreshCw, Package, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';

const Returns = () => {
  const steps = [
    { step: 1, title: 'Initiate Return', description: 'Contact us within 7 days of delivery to initiate a return' },
    { step: 2, title: 'Pack the Item', description: 'Pack the product in its original packaging with all tags attached' },
    { step: 3, title: 'Schedule Pickup', description: 'We will arrange a free pickup from your doorstep' },
    { step: 4, title: 'Get Refund', description: 'Refund processed within 5-7 days after quality check' },
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
              <span className="text-foreground">Returns &</span>{' '}
              <span className="text-gradient">Exchanges</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              We want you to love your purchase. If not, we're here to help.
            </motion.p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Return Process */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-display font-bold text-foreground mb-8 text-center">
                How to Return
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                {steps.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Policy Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent rounded-lg">
                    <RefreshCw className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">7-Day Return Policy</h3>
                    <p className="text-muted-foreground">
                      We offer a 7-day return policy from the date of delivery. Items must be unused, 
                      in original condition, with all tags attached and original packaging intact.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent rounded-lg">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Exchange Policy</h3>
                    <p className="text-muted-foreground">
                      Need a different size or color? We're happy to exchange your item free of charge. 
                      Exchanges are subject to availability.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent rounded-lg">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Refund Timeline</h3>
                    <p className="text-muted-foreground">
                      Once we receive your return, our quality team will inspect the item within 2-3 business days. 
                      Refunds are processed to the original payment method within 5-7 business days.
                    </p>
                  </div>
                </div>
              </div>

              {/* Eligible Items */}
              <h3 className="text-xl font-semibold text-foreground mt-12 mb-4">Eligible for Return</h3>
              <ul className="space-y-3">
                {[
                  'Product in original, unworn condition',
                  'All original tags and labels attached',
                  'Original packaging included',
                  'Return initiated within 7 days of delivery',
                  'Proof of purchase available',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Non-Eligible Items */}
              <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Not Eligible for Return</h3>
              <ul className="space-y-3">
                {[
                  'Items that have been used, worn, or washed',
                  'Products without original tags',
                  'Personalized or customized items',
                  'Items marked as "Final Sale"',
                  'Products with damaged packaging due to customer handling',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
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

export default Returns;
