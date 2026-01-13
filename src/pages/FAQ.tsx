import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      category: 'Orders & Shipping',
      questions: [
        {
          q: 'How long does delivery take?',
          a: 'Standard delivery takes 5-7 business days across India. Express delivery (2-3 business days) is available for select locations at an additional cost of ₹199.',
        },
        {
          q: 'Do you offer free shipping?',
          a: 'Yes! We offer free standard shipping on all orders above ₹1,500. Orders below ₹1,500 have a flat shipping fee of ₹99.',
        },
        {
          q: 'Can I track my order?',
          a: 'Absolutely! Once your order is shipped, you\'ll receive an email with a tracking number. You can also track your order on our Track Order page.',
        },
        {
          q: 'Do you offer Cash on Delivery (COD)?',
          a: 'Yes, we offer COD for orders up to ₹10,000. A nominal COD fee of ₹40 applies to all cash on delivery orders.',
        },
      ],
    },
    {
      category: 'Returns & Exchanges',
      questions: [
        {
          q: 'What is your return policy?',
          a: 'We offer a 7-day return policy from the date of delivery. Items must be unused, in original condition with all tags attached.',
        },
        {
          q: 'How do I initiate a return?',
          a: 'Contact our customer service team via email at support@sama.in or call us at +91 98765 43210. We\'ll arrange a free pickup from your doorstep.',
        },
        {
          q: 'How long does it take to get a refund?',
          a: 'Once we receive and inspect your return, refunds are processed within 5-7 business days to your original payment method.',
        },
        {
          q: 'Can I exchange for a different size or color?',
          a: 'Yes! We offer free exchanges subject to availability. Contact us within 7 days of delivery to arrange an exchange.',
        },
      ],
    },
    {
      category: 'Products & Care',
      questions: [
        {
          q: 'What type of leather do you use?',
          a: 'We use premium full-grain and vegetable-tanned leather sourced from sustainable tanneries. Our leather develops a beautiful patina over time.',
        },
        {
          q: 'How should I care for my leather products?',
          a: 'Keep your leather products away from direct sunlight and moisture. Use a soft, dry cloth for regular cleaning. Apply leather conditioner every 3-6 months for best results.',
        },
        {
          q: 'Are your products handmade?',
          a: 'Yes, each SAMA product is handcrafted by skilled artisans using traditional techniques passed down through generations.',
        },
        {
          q: 'Do you offer product customization?',
          a: 'We offer monogramming and personalization services on select products. Contact us for custom orders and corporate gifting.',
        },
      ],
    },
    {
      category: 'Payment & Security',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit/debit cards, UPI, net banking, and popular wallets like Paytm and PhonePe. EMI options are available on select cards.',
        },
        {
          q: 'Is my payment information secure?',
          a: 'Absolutely! We use industry-standard SSL encryption and never store your payment details. All transactions are processed through secure payment gateways.',
        },
        {
          q: 'Do you offer EMI options?',
          a: 'Yes, we offer no-cost EMI on orders above ₹3,000 with select bank cards. EMI options will be displayed at checkout.',
        },
      ],
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
              <span className="text-foreground">Frequently Asked</span>{' '}
              <span className="text-gradient">Questions</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Find answers to common questions about our products, shipping, and policies.
            </motion.p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            {faqs.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="mb-12"
              >
                <h2 className="text-xl font-display font-bold text-foreground mb-6">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${categoryIndex}-${index}`}
                      className="bg-card rounded-lg border border-border px-6"
                    >
                      <AccordionTrigger className="text-left text-foreground hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
