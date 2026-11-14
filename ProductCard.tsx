import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
}

export default function ProductCard({ product, onOpen }: ProductCardProps) {
  return (
    <button onClick={() => onOpen(product)} className="group block w-full text-left">
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-wider">
            {product.badge}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-4 text-sm">
        <span className="font-medium">{product.name}</span>
        <span>${product.price}</span>
      </div>
      <p className="text-xs text-slate-500">{product.color}</p>
    </button>
  );
}
