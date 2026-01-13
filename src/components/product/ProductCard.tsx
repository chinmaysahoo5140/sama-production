import { motion } from 'framer-motion';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        whileHover={{ y: -8 }}
        className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300"
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Tags */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {discount > 0 && (
              <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                {discount}% OFF
              </span>
            )}
            {product.tags?.includes('bestseller') && (
              <span className="px-3 py-1 bg-gold text-charcoal text-xs font-semibold rounded-full">
                Bestseller
              </span>
            )}
            {product.tags?.includes('new') && (
              <span className="px-3 py-1 bg-cream text-charcoal text-xs font-semibold rounded-full">
                New
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlistClick}
            className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
              inWishlist
                ? 'bg-red-500 text-white opacity-100'
                : 'bg-background/50 opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground'
            }`}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? 'fill-white' : ''}`} />
          </button>

          {/* Quick Add */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <Button
              variant="hero"
              size="sm"
              className="w-full"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            {product.category}
          </p>
          <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-gold fill-gold" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xl font-display font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
