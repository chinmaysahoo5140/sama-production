import { motion } from 'framer-motion';
import { Crown, Gem, Sparkles } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { AuthModal } from '@/components/auth/AuthModal';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';

const Collections = () => {
  // Filter premium products (those with premium tag or higher price)
  const premiumProducts = products.filter(
    p => p.tags?.includes('premium') || p.price >= 2000
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      <AuthModal />
      
      <main className="pt-20 md:pt-24">
        {/* Luxurious Hero */}
        <section className="py-20 bg-gradient-to-b from-accent to-background border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-32 h-32 bg-accent rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full mb-6"
            >
              <Crown className="h-4 w-4 text-accent-foreground" />
              <span className="text-sm font-medium text-accent-foreground">Exclusive Collection</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-display font-bold mb-6"
            >
              <span className="text-foreground">Premium</span>{' '}
              <span className="text-gradient">Collection</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto text-lg"
            >
              Discover our finest selection of handcrafted leather goods. 
              Each piece is a testament to exceptional craftsmanship and timeless elegance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-8 mt-10"
            >
              <div className="flex items-center gap-2">
                <Gem className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Handcrafted</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Limited Edition</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Premium Materials</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Premium Products Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {premiumProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {premiumProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No premium products available at the moment.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Collections;
