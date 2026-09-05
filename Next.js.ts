"use client";

import { useState } from "react";
import { ShoppingBag, SlidersHorizontal, Trash2, X, Star } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  sizes: string[];
  image: string;
  isNew?: boolean;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  selectedSize: string;
  quantity: number;
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Premium Linen Casual Shirt - Navy Blue",
    category: "Shirts",
    price: 1450,
    originalPrice: 1850,
    sizes: ["M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600",
    isNew: true,
  },
  {
    id: "2",
    name: "Oversized Cotton Graphic T-Shirt",
    category: "T-Shirts",
    price: 650,
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600",
  },
  {
    id: "3",
    name: "Slim-Fit Chino Pants - Charcoal Gray",
    category: "Pants",
    price: 1650,
    originalPrice: 1950,
    sizes: ["M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600",
  },
  {
    id: "4",
    name: "Traditional Designer Kabli Panjabi",
    category: "Panjabi",
    price: 2450,
    sizes: ["L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600",
    isNew: true,
  },
];

const CATEGORIES = ["All", "Shirts", "T-Shirts", "Pants", "Panjabi"];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const addToCart = (product: Product) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    const cartItemId = `${product.id}-${size}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          name: product.name,
          price: product.price,
          selectedSize: size,
          quantity: 1,
          image: product.image,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const filteredProducts =
    selectedCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="text-2xl font-black tracking-widest text-black">
            FNFY<span className="text-red-600">.</span>
          </a>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-700 hover:text-black transition"
          >
            <ShoppingBag className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Shop Container */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Title & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Men's Collection</h1>
            <p className="text-gray-500 text-sm mt-1">
              Elevate your everyday wardrobe with FNFY essentials.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-black text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const currentSize = selectedSizes[product.id] || product.sizes[0];

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.isNew && (
                    <span className="absolute top-3 left-3 bg-black text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
                      New Arrival
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
                      Sale
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-gray-400 font-semibold tracking-wider uppercase">
                      {product.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 mt-1 line-clamp-1 group-hover:text-red-600 transition">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold text-lg text-black">৳{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ৳{product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Size Selector */}
                    <div className="mt-4">
                      <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block mb-1.5">
                        Select Size:
                      </span>
                      <div className="flex gap-1.5 flex-wrap">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => handleSizeSelect(product.id, size)}
                            className={`text-xs px-2.5 py-1 rounded-md border font-medium transition ${
                              currentSize === size
                                ? "border-black bg-black text-white"
                                : "border-gray-200 text-gray-600 hover:border-gray-400"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full mt-5 bg-black text-white text-sm font-semibold py-3 rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Slide-over Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Your Shopping Bag
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 text-gray-400 hover:text-black rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <ShoppingBag className="w-12 h-12 text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">Your bag is currently empty.</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 border rounded-xl items-center bg-gray-50/50"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded-lg bg-gray-200"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Size: <span className="font-semibold text-black">{item.selectedSize}</span>
                      </p>
                      <p className="text-sm font-bold text-black mt-1">
                        ৳{item.price} x {item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center text-base font-bold">
                  <span>Subtotal:</span>
                  <span>৳{subtotal}</span>
                </div>
                <button className="w-full bg-red-600 text-white font-semibold py-3.5 rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-600/20">
                  Proceed to Checkout (bKash / COD)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}