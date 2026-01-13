import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroBag from '@/assets/hero-bag.jpg';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Warm beige background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-beige via-cream to-beige-dark" />
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--sage)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <Star className="h-4 w-4 text-gold fill-gold" />
              <span className="text-sm font-medium text-primary">New Collection 2024</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight">
              <span className="text-foreground">Elevate Your</span>
              <br />
              <span className="text-gradient">Everyday Carry</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Premium leather bags and accessories crafted for professionals who demand excellence. 
              Each piece tells a story of meticulous craftsmanship.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop">
                <Button variant="hero" size="xl" className="group">
                  Shop Now
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/collections">
                <Button variant="premium" size="xl">
                  View Collections
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-2xl font-display font-bold text-foreground">2K+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="text-2xl font-display font-bold text-foreground">4.9</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="text-2xl font-display font-bold text-foreground">100%</p>
                <p className="text-sm text-muted-foreground">Genuine Leather</p>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-10">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <img
                  src={heroBag}
                  alt="Premium Gym Bag"
                  className="w-full max-w-xl mx-auto rounded-2xl shadow-2xl"
                />
                
                {/* Floating price tag */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute -bottom-4 -left-4 md:left-8 glass-card rounded-xl p-4"
                >
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Starting from</p>
                  <p className="text-2xl font-display font-bold text-gradient">₹2,100</p>
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className="absolute -top-4 -right-4 md:right-8 glass-card rounded-xl p-4"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-gold fill-gold" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">Bestseller</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-sage/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
