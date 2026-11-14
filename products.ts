export type Category = 'All' | 'Tops' | 'Bottoms' | 'Outerwear' | 'Footwear';

export interface Product {
  id: number;
  name: string;
  category: Exclude<Category, 'All'>;
  price: number;
  color: string;
  image: string;
  description: string;
  sizes: string[];
  badge?: string;
}

export interface CartItem {
  key: string;
  product: Product;
  size: string;
  qty: number;
}

export const CATEGORIES: Category[] = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Footwear'];

const APPAREL_SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const FOOTWEAR_SIZES = ['7', '8', '9', '10', '11', '12'];

export const HERO_IMAGE =
  'https://images.pexels.com/photos/16485645/pexels-photo-16485645.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800';

export const products: Product[] = [
  {
    id: 1,
    name: 'Essential Oversized Tee',
    category: 'Tops',
    price: 38,
    color: 'Black',
    image: 'https://images.pexels.com/photos/9558588/pexels-photo-9558588.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800',
    description: 'A heavyweight cotton tee with a relaxed, boxy fit and dropped shoulders.',
    sizes: APPAREL_SIZES,
    badge: 'Bestseller',
  },
  {
    id: 2,
    name: 'Relaxed Wide-Leg Jeans',
    category: 'Bottoms',
    price: 89,
    color: 'Light Wash',
    image: 'https://images.pexels.com/photos/24779115/pexels-photo-24779115.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800',
    description: 'Mid-rise denim with a wide leg and a soft, broken-in feel from the first wear.',
    sizes: APPAREL_SIZES,
  },
  {
    id: 3,
    name: 'Heather Grey Hoodie',
    category: 'Tops',
    price: 64,
    color: 'Heather Grey',
    image: 'https://images.pexels.com/photos/4295985/pexels-photo-4295985.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800',
    description: 'Brushed fleece hoodie with a kangaroo pocket and ribbed cuffs.',
    sizes: APPAREL_SIZES,
    badge: 'New',
  },
  {
    id: 4,
    name: 'Washed Black Hoodie',
    category: 'Tops',
    price: 72,
    color: 'Washed Black',
    image: 'https://images.pexels.com/photos/19461552/pexels-photo-19461552.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800',
    description: 'Garment-dyed heavyweight hoodie with a cropped body and oversized hood.',
    sizes: APPAREL_SIZES,
  },
  {
    id: 5,
    name: 'Studio Overshirt',
    category: 'Outerwear',
    price: 110,
    color: 'Olive',
    image: 'https://images.pexels.com/photos/22634669/pexels-photo-22634669.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800',
    description: 'A structured overshirt with two chest pockets, built for layering over tees.',
    sizes: APPAREL_SIZES,
  },
  {
    id: 6,
    name: 'Retro Red High-Top',
    category: 'Footwear',
    price: 180,
    color: 'Red / White',
    image: 'https://images.pexels.com/photos/26852497/pexels-photo-26852497.png?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800',
    description: 'Classic high-top silhouette with cushioned midsole and premium leather upper.',
    sizes: FOOTWEAR_SIZES,
    badge: 'Limited',
  },
  {
    id: 7,
    name: 'Court Low Leather',
    category: 'Footwear',
    price: 120,
    color: 'White',
    image: 'https://images.pexels.com/photos/27298315/pexels-photo-27298315.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800',
    description: 'Clean low-top sneaker in smooth white leather with a contrast black lace.',
    sizes: FOOTWEAR_SIZES,
  },
  {
    id: 8,
    name: 'Blue Sole High-Cut',
    category: 'Footwear',
    price: 140,
    color: 'White / Blue',
    image: 'https://images.pexels.com/photos/11292946/pexels-photo-11292946.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800',
    description: 'High-cut sneaker with ankle support and a bold blue rubber sole.',
    sizes: FOOTWEAR_SIZES,
  },
  {
    id: 9,
    name: 'Cream Zip Hoodie',
    category: 'Tops',
    price: 68,
    color: 'Cream',
    image: 'https://images.pexels.com/photos/20248583/pexels-photo-20248583.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800',
    description: 'Full-zip hoodie in soft cream fleece with a clean, minimal front.',
    sizes: APPAREL_SIZES,
    badge: 'New',
  },
];
