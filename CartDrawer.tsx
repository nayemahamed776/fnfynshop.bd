import type { CartItem } from '../data/products';

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onChangeQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  open,
  items,
  onClose,
  onChangeQty,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 10;
  const count = items.reduce((n, i) => n + i.qty, 0);

  return (
    <div className={`fixed inset-0 z-50 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider">Bag ({count})</h2>
          <button onClick={onClose} className="text-sm hover:underline" aria-label="Close bag">
            Close
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <p className="font-medium">Your bag is empty.</p>
            <p className="mt-1 text-sm text-slate-500">Items you add will show up here.</p>
            <button
              onClick={onClose}
              className="mt-6 bg-black px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-slate-200 overflow-y-auto px-6">
            {items.map((item) => (
              <li key={item.key} className="flex gap-4 py-5">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-28 w-24 flex-shrink-0 bg-neutral-100 object-cover"
                />
                <div className="flex flex-1 flex-col text-sm">
                  <div className="flex justify-between gap-2">
                    <p className="font-medium uppercase leading-snug">{item.product.name}</p>
                    <p>${item.product.price * item.qty}</p>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.product.color} · Size {item.size}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center border border-slate-300">
                      <button
                        onClick={() => onChangeQty(item.key, -1)}
                        className="h-8 w-8 hover:bg-slate-100"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm">{item.qty}</span>
                      <button
                        onClick={() => onChangeQty(item.key, 1)}
                        className="h-8 w-8 hover:bg-slate-100"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => onRemove(item.key)}
                      className="text-xs text-slate-500 underline underline-offset-4 hover:text-black"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <div className="border-t border-slate-200 px-6 py-6 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="mt-2 flex justify-between text-slate-500">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
            </div>
            <div className="mt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>${subtotal + shipping}</span>
            </div>
            {subtotal < 100 && (
              <p className="mt-2 text-xs text-slate-500">Add ${100 - subtotal} more for free shipping.</p>
            )}
            <button
              onClick={onCheckout}
              className="mt-5 w-full bg-black py-4 text-sm font-semibold uppercase tracking-wider text-white hover:bg-neutral-800"
            >
              Checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
