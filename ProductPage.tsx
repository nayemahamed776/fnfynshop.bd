import { useState } from 'react';
import type { Product } from '../data/products';
import ProductCard from './ProductCard';

interface ProductPageProps {
  product: Product;
  related: Product[];
  onAdd: (product: Product, size: string) => void;
  onOpen: (product: Product) => void;
  onHome: () => void;
}

export default function ProductPage({ product, related, onAdd, onOpen, onHome }: ProductPageProps) {
  const [size, setSize] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const handleAdd = () => {
    if (!size) {
      setShowError(true);
      return;
    }
    onAdd(product, size);
    setSize(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <nav className="text-xs text-slate-500">
        <button onClick={onHome} className="hover:text-black">
          Home
        </button>
        <span className="mx-2">/</span>
        <span>{product.category}</span>
        <span className="mx-2">/</span>
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="bg-neutral-100">
          <img src={product.image} alt={product.name} className="aspect-[4/5] w-full object-cover" />
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          {product.badge && (
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {product.badge}
            </span>
          )}
          <h1 className="mt-2 text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-3 text-lg">${product.price}</p>
          <p className="mt-6 text-sm text-slate-600">
            Color: <span className="text-black">{product.color}</span>
          </p>

          <div className="mt-6 flex items-center justify-between text-sm">
            <span className="font-medium">Size</span>
            <span className="cursor-pointer text-xs text-slate-500 underline underline-offset-4 hover:text-black">
              Size guide
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSize(s);
                  setShowError(false);
                }}
                className={`min-w-[3.25rem] border px-3 py-3 text-sm transition ${
                  size === s ? 'border-black bg-black text-white' : 'border-slate-300 hover:border-black'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {showError && <p className="mt-2 text-xs text-red-600">Please select a size.</p>}

          <button
            onClick={handleAdd}
            className="mt-6 w-full bg-black py-4 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-neutral-800"
          >
            Add to cart
          </button>

          <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200 text-sm">
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                Description
                <span className="text-lg transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-slate-600">{product.description}</p>
            </details>
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                Fit & care
                <span className="text-lg transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-slate-600">
                True to size with a relaxed fit. Machine wash cold, inside out. Do not bleach.
              </p>
            </details>
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                Shipping & returns
                <span className="text-lg transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-slate-600">
                Free shipping on orders over $100. Free 30-day returns on all items.
              </p>
            </details>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="text-sm font-semibold uppercase tracking-wider">You may also like</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={onOpen} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
