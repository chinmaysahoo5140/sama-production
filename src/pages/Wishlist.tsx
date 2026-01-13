import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { AuthModal } from '@/components/auth/AuthModal';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistContext';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlistItems } = useWishlist();

  const wishlistProducts = products.filter(p => wishlistItems.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      <AuthModal />

      <main className="pt-20 md:pt-24">
        {/* Hero */}
        <section className="py-16 bg-card border-b border-border">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <Heart className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-display font-bold">
                <span className="text-foreground">My</span>{' '}
                <span className="text-gradient">Wishlist</span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved
            </motion.p>
          </div>
        </section>

        {/* Products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-20">
                <Heart className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground mb-6">Your wishlist is empty</p>
                <Link to="/shop">
                  <Button variant="hero">Start Shopping</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {wishlistProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;