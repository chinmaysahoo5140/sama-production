import { motion } from 'framer-motion';
import { Truck, Shield, RefreshCw, Award } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free delivery on orders above ₹2,500 across India',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Safe and secure checkout with Razorpay',
  },
  {
    icon: RefreshCw,
    title: '15-Day Returns',
    description: 'Easy returns and exchanges within 15 days',
  },
  {
    icon: Award,
    title: '2-Year Warranty',
    description: 'Comprehensive warranty on all products',
  },
];

export const Features = () => {
  return (
    <section className="py-16 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
