import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';

const Privacy = () => {
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
              <span className="text-foreground">Privacy</span>{' '}
              <span className="text-gradient">Policy</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              Last updated: January 2024
            </motion.p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-sage max-w-none"
            >
              <div className="space-y-8 text-muted-foreground">
                <div>
                  <h2 className="text-xl font-display font-bold text-foreground mb-4">Introduction</h2>
                  <p>
                    At SAMA, we are committed to protecting your privacy and ensuring the security of your personal information. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our 
                    website or make a purchase from us.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-display font-bold text-foreground mb-4">Information We Collect</h2>
                  <p className="mb-4">We collect information that you provide directly to us, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name, email address, and phone number</li>
                    <li>Billing and shipping addresses</li>
                    <li>Payment information (processed securely through our payment partners)</li>
                    <li>Order history and preferences</li>
                    <li>Communications with our customer service team</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-display font-bold text-foreground mb-4">How We Use Your Information</h2>
                  <p className="mb-4">We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Process and fulfill your orders</li>
                    <li>Send order confirmations and shipping updates</li>
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Send promotional communications (with your consent)</li>
                    <li>Improve our website and services</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-display font-bold text-foreground mb-4">Information Sharing</h2>
                  <p>
                    We do not sell, trade, or rent your personal information to third parties. We may share your information 
                    with trusted service providers who assist us in operating our website, conducting our business, or servicing you, 
                    including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>Payment processors for secure transaction handling</li>
                    <li>Shipping partners for order delivery</li>
                    <li>Email service providers for communications</li>
                    <li>Analytics providers to improve our services</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-display font-bold text-foreground mb-4">Data Security</h2>
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal information against 
                    unauthorized access, alteration, disclosure, or destruction. All payment transactions are encrypted using 
                    SSL technology.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-display font-bold text-foreground mb-4">Cookies</h2>
                  <p>
                    We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, 
                    and personalize content. You can control cookie preferences through your browser settings.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-display font-bold text-foreground mb-4">Your Rights</h2>
                  <p className="mb-4">You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-display font-bold text-foreground mb-4">Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <p className="mt-4">
                    <strong className="text-foreground">Email:</strong> privacy@sama.in<br />
                    <strong className="text-foreground">Phone:</strong> +91 98765 43210<br />
                    <strong className="text-foreground">Address:</strong> 123 Fashion Street, Linking Road, Mumbai 400050
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-display font-bold text-foreground mb-4">Updates to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
                    new Privacy Policy on this page and updating the "Last updated" date.
                  </p>
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

export default Privacy;
