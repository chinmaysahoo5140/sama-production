import { motion } from 'framer-motion';
import { Headphones, Mail, Phone, MessageCircle, Clock, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Button } from '@/components/ui/button';

const CustomerService = () => {
  const serviceOptions = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our support team',
      action: '+91 98765 43210',
      link: 'tel:+919876543210',
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get a response within 24 hours',
      action: 'support@sama.in',
      link: 'mailto:support@sama.in',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with us in real-time',
      action: 'Start Chat',
      link: '#',
    },
  ];

  const quickLinks = [
    { title: 'Track Your Order', description: 'Check the status of your delivery', path: '/track-order' },
    { title: 'Shipping Information', description: 'Delivery times and shipping costs', path: '/shipping' },
    { title: 'Returns & Exchanges', description: 'Our hassle-free return policy', path: '/returns' },
    { title: 'FAQ', description: 'Answers to common questions', path: '/faq' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      
      <main className="pt-20 md:pt-24">
        <section className="py-16 bg-card border-b border-border">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-6"
            >
              <Headphones className="h-8 w-8 text-primary" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold mb-4"
            >
              <span className="text-foreground">Customer</span>{' '}
              <span className="text-gradient">Service</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              We're here to help. Choose how you'd like to reach us.
            </motion.p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            {/* Contact Options */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {serviceOptions.map((option, index) => (
                <motion.a
                  key={option.title}
                  href={option.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors text-center group"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-accent rounded-full mb-4 group-hover:bg-primary/10 transition-colors">
                    <option.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{option.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                  <span className="text-primary font-medium">{option.action}</span>
                </motion.a>
              ))}
            </div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-xl p-6 border border-border mb-16"
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-display font-bold text-foreground">Business Hours</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
                <div>
                  <p><strong className="text-foreground">Monday - Friday:</strong> 10:00 AM - 8:00 PM IST</p>
                  <p><strong className="text-foreground">Saturday:</strong> 10:00 AM - 6:00 PM IST</p>
                </div>
                <div>
                  <p><strong className="text-foreground">Sunday:</strong> Closed</p>
                  <p><strong className="text-foreground">Response Time:</strong> Within 24 hours</p>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-display font-bold text-foreground">Quick Help</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {quickLinks.map((link, index) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="bg-card rounded-xl p-5 border border-border hover:border-primary/50 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{link.description}</p>
                    </div>
                    <div className="text-primary">→</div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CustomerService;
