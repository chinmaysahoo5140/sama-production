import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';

const Terms = () => {
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
              <span className="text-foreground">Terms of</span>{' '}
              <span className="text-gradient">Service</span>
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
                  <h2 className="text-xl font-display font-bold text-foreground mb-4">Agreement to Terms</h2>
                  <p>
                    By accessing or using the SAMA website and services, you agree to be bound by these Terms of Service. 
                    If you disagree with any part of these terms, you may not access our website or use our services.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-display font-bold text-foreground mb-4">Use of Our Services</h2>
                  <p className="mb-4">By using our services, you agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate and complete information when creating an account or placing an order</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Use our services only for lawful purposes</li>
                    <li>Not engage in any activity that interferes with or disrupts our services</li>
                    <li>Not attempt to gain unauthorized access to our systems</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-display font-bold text-foreground mb-4">Products and Orders</h2>
                  <p className="mb-4">
                    All products displayed on our website are subject to availability. We reserve the right to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Limit quantities of products purchased per person or order</li>
                    <li>Refuse or cancel any order for any reason</li>
                    <li>Update product information including prices without prior notice</li>
                    <li>Discontinue any product at any time</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-display font-bold text-foreground mb-4">Pricing and Payment</h2>
                  <p>
                    All prices are displayed in Indian Rupees (INR) and are inclusive of applicable taxes unless otherwise stated. 
                    We accept payment through major credit cards, debit cards, UPI, net banking, and cash on delivery for eligible orders. 
                    Payment must be received in full before order dispatch for prepaid orders.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-display font-bold text-foreground mb-4">Intellectual Property</h2>
                  <p>
                    All content on the SAMA website, including text, graphics, logos, images, product designs, and software, 
                    is the property of SAMA and is protected by intellectual property laws. You may not reproduce, distribute, 
                    modify, or create derivative works without our prior written consent.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-display font-bold text-foreground mb-4">User Accounts</h2>
                  <p>
                    When you create an account with us, you are responsible for maintaining the confidentiality of your account 
                    information and for all activities that occur under your account. You must notify us immediately of any 
                    unauthorized use of your account.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-display font-bold text-foreground mb-4">Limitation of Liability</h2>
                  <p>
                    To the fullest extent permitted by law, SAMA shall not be liable for any indirect, incidental, special, 
                    consequential, or punitive damages arising from your use of our services or products. Our total liability 
                    shall not exceed the amount paid by you for the product or service in question.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-display font-bold text-foreground mb-4">Indemnification</h2>
                  <p>
                    You agree to indemnify and hold SAMA harmless from any claims, damages, losses, or expenses arising from 
                    your violation of these Terms of Service or your use of our services.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-display font-bold text-foreground mb-4">Governing Law</h2>
                  <p>
                    These Terms of Service shall be governed by and construed in accordance with the laws of India. 
                    Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-display font-bold text-foreground mb-4">Changes to Terms</h2>
                  <p>
                    We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately 
                    upon posting on our website. Your continued use of our services after any changes constitutes acceptance 
                    of the new terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-display font-bold text-foreground mb-4">Contact Information</h2>
                  <p>
                    For questions about these Terms of Service, please contact us at:
                  </p>
                  <p className="mt-4">
                    <strong className="text-foreground">Email:</strong> legal@sama.in<br />
                    <strong className="text-foreground">Phone:</strong> +91 98765 43210<br />
                    <strong className="text-foreground">Address:</strong> 123 Fashion Street, Linking Road, Mumbai 400050
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

export default Terms;
