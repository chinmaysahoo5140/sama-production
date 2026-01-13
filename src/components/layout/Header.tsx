import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, User, LogOut, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useAuthModal } from '@/context/AuthModalContext';
import { useWishlist } from '@/context/WishlistContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Collections', path: '/collections' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems, setIsOpen } = useCart();
  const { user, isAdmin, signOut } = useAuth();
  const { openModal } = useAuthModal();
  const { wishlistItems } = useWishlist();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center">
            <motion.span whileHover={{ scale: 1.05 }} className="text-2xl md:text-3xl font-display font-bold text-gradient">
              SAMA
            </motion.span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div layoutId="underline" className="absolute left-0 right-0 -bottom-1 h-0.5 bg-primary" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin/dashboard">
                    <Button variant="ghost" size="sm" className="hidden md:flex">
                      Admin
                    </Button>
                  </Link>
                )}
                <Link to="/profile">
                  <Button variant="ghost" size="icon" title="My Profile">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => signOut()} title="Sign Out">
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => openModal('login')} title="Sign In">
                <User className="h-5 w-5" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(true)}>
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium"
                >
                  {totalItems}
                </motion.span>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium py-2 ${location.pathname === link.path ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  {link.name}
                </Link>
              ))}
              {user && (
                <>
                  <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium py-2 text-muted-foreground">
                    Wishlist
                  </Link>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium py-2 text-muted-foreground">
                    My Profile
                  </Link>
                </>
              )}
              {isAdmin && (
                <Link to="/admin/dashboard" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium py-2 text-muted-foreground">
                  Admin Dashboard
                </Link>
              )}
              {!user && (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    openModal('login');
                  }}
                  className="text-lg font-medium py-2 text-muted-foreground text-left"
                >
                  Sign In
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
