import { motion } from 'framer-motion';
import { TrendingUp, Star } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';

export const MostSellingProducts = () => {
  // Filter products with bestseller tag
  const bestSellers = products.filter(p => p.tags?.includes('bestseller')).slice(0, 3);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full mb-4">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Trending Now</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            <span className="text-foreground">Most</span>{' '}
            <span className="text-gradient">Selling</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our customers' favorites — timeless pieces that define premium craftsmanship.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {index === 0 && (
                <div className="absolute -top-3 left-4 z-10 inline-flex items-center gap-1 px-3 py-1 bg-accent rounded-full">
                  <Star className="h-3 w-3 text-primary fill-primary" />
                  <span className="text-xs font-semibold text-primary">#1 Best Seller</span>
                </div>
              )}
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
