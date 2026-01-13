import { Product } from '@/types';
import heroBag from '@/assets/hero-bag.jpg';
import messengerBag from '@/assets/product-messenger-bag.jpg';
import wallet from '@/assets/product-wallet.jpg';
import laptopSleeve from '@/assets/product-laptop-sleeve.jpg';
import cardHolder from '@/assets/product-card-holder.jpg';

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Executive Gym Duffle',
    price: 2100,
    originalPrice: 2800,
    description: 'Premium leather gym bag with copper hardware. Designed for the modern professional who refuses to compromise on style. Features a spacious main compartment, laptop sleeve, and ventilated shoe pocket.',
    category: 'Bags',
    image: heroBag,
    inStock: true,
    rating: 4.8,
    reviews: 127,
    tags: ['bestseller', 'new'],
  },
  {
    id: 'prod-002',
    name: 'Diplomat Messenger',
    price: 2450,
    originalPrice: 3200,
    description: 'Sophisticated messenger bag crafted from full-grain leather. Perfect for carrying your essentials to the office. Features gold-tone buckles and a padded laptop compartment.',
    category: 'Bags',
    image: messengerBag,
    inStock: true,
    rating: 4.9,
    reviews: 89,
    tags: ['premium'],
  },
  {
    id: 'prod-003',
    name: 'Heritage Bifold Wallet',
    price: 1850,
    description: 'Minimalist bifold wallet with signature copper stitching. Handcrafted from vegetable-tanned leather that develops a beautiful patina over time.',
    category: 'Wallets',
    image: wallet,
    inStock: true,
    rating: 4.7,
    reviews: 203,
    tags: ['bestseller'],
  },
  {
    id: 'prod-004',
    name: 'ProTech Laptop Sleeve',
    price: 2200,
    description: 'Protective laptop sleeve with gold zipper detailing. Fits laptops up to 15 inches. Features ultra-soft microfiber lining and a slim profile.',
    category: 'Accessories',
    image: laptopSleeve,
    inStock: true,
    rating: 4.6,
    reviews: 156,
    tags: ['new'],
  },
  {
    id: 'prod-005',
    name: 'Signature Card Holder',
    price: 1200,
    description: 'Compact card holder with copper corner accents. Holds up to 6 cards with a center cash slot. The perfect everyday carry for the modern minimalist.',
    category: 'Accessories',
    image: cardHolder,
    inStock: true,
    rating: 4.8,
    reviews: 312,
    tags: ['bestseller'],
  },
];

export const categories = ['All', 'Bags', 'Wallets', 'Accessories'];
