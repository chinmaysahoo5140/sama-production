import { motion } from 'framer-motion';
import { Leaf, Shield, Award, Recycle } from 'lucide-react';

const promoItems = [
  { icon: Leaf, text: 'Sustainably Sourced' },
  { icon: Shield, text: 'Premium Quality' },
  { icon: Award, text: 'Handcrafted Excellence' },
  { icon: Recycle, text: 'Eco-Friendly Materials' },
];

export const PromoStrip = () => {
  return (
    <section className="py-6 bg-primary/5 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {promoItems.map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2"
            >
              <item.icon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
