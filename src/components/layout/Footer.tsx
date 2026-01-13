import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold text-gradient">SAMA</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium leather goods for the modern professional. Crafted with passion, designed for life.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon"><Instagram className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon"><Twitter className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon"><Facebook className="h-5 w-5" /></Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shop All</Link>
              <Link to="/collections" className="text-sm text-muted-foreground hover:text-primary transition-colors">Collections</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
              <Link to="/customer-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">Customer Service</Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Support</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/shipping" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shipping Info</Link>
              <Link to="/returns" className="text-sm text-muted-foreground hover:text-primary transition-colors">Returns & Exchanges</Link>
              <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
              <Link to="/track-order" className="text-sm text-muted-foreground hover:text-primary transition-colors">Track Order</Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">Subscribe to receive updates and exclusive offers.</p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" className="bg-muted border-border" />
              <Button variant="hero" size="icon"><Mail className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2024 SAMA. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
