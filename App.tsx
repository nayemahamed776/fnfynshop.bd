import { useMemo, useState, type FormEvent } from 'react';
import CartDrawer from './components/CartDrawer';
import ProductCard from './components/ProductCard';
import ProductPage from './components/ProductPage';
import { CATEGORIES, products, type CartItem, type Category, type Product } from './data/products';

const looks = [
  {
    title: 'The Street Set',
    items: 'Oversized tee · Wide jeans',
    image: 'https://images.pexels.com/photos/16485645/pexels-photo-16485645.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900',
    productId: 1,
  },
  {
    title: 'Denim Day',
    items: 'Relaxed wide-leg jeans',
    image: 'https://images.pexels.com/photos/22223042/pexels-photo-22223042.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900',
    productId: 2,
  },
  {
    title: 'Black on Black',
    items: 'Washed black hoodie',
    image: 'https://images.pexels.com/photos/39257278/pexels-photo-39257278.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900',
    productId: 4,
  },
  {
    title: 'Layered Up',
    items: 'Studio overshirt',
    image: 'https://images.pexels.com/photos/17393929/pexels-photo-17393929.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900',
    productId: 5,
  },
  {
    title: 'Night Fit',
    items: 'Cream zip hoodie',
    image: 'https://images.pexels.com/photos/31482885/pexels-photo-31482885.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900',
    productId: 9,
  },
  {
    title: 'Soft Knit',
    items: 'Heather grey hoodie',
    image: 'https://images.pexels.com/photos/7718767/pexels-photo-7718767.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900',
    productId: 3,
  },
];

const findProduct = (id: number) => products.find((p) => p.id === id) as Product;

export default function App() {
  const [category, setCategory] = useState<Category>('All');
  const [productId, setProductId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const activeProduct = productId !== null ? findProduct(productId) : null;

  const visibleProducts = useMemo(
    () => (category === 'All' ? products : products.filter((p) => p.category === category)),
    [category],
  );

  const related = useMemo(() => {
    if (!activeProduct) return [];
    return products
      .filter((p) => p.id !== activeProduct.id)
      .sort((a, b) => Number(b.category === activeProduct.category) - Number(a.category === activeProduct.category))
      .slice(0, 3);
  }, [activeProduct]);

  const cartCount = cart.reduce((n, i) => n + i.qty, 0);

  const openProduct = (p: Product) => {
    setProductId(p.id);
    setOrderPlaced(false);
    window.scrollTo({ top: 0 });
  };

  const goHome = () => {
    setProductId(null);
    window.scrollTo({ top: 0 });
  };

  const goCategory = (c: Category) => {
    setProductId(null);
    setCategory(c);
    setTimeout(() => {
      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  const addToCart = (product: Product, size: string) => {
    const key = `${product.id}-${size}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { key, product, size, qty: 1 }];
    });
    setOrderPlaced(false);
    setCartOpen(true);
  };

  const changeQty = (key: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0),
    );
  };

  const removeItem = (key: string) => setCart((prev) => prev.filter((i) => i.key !== key));

  const checkout = () => {
    setCart([]);
    setCartOpen(false);
    setOrderPlaced(true);
    window.scrollTo({ top: 0 });
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-white text-black antialiased">
      <div className="bg-black px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-white">
        Free shipping over $100 · Free 30-day returns
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-3 items-center px-6 py-5">
          <nav className="hidden gap-6 text-xs font-medium uppercase tracking-wider md:flex">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => goCategory(c)} className="hover:underline underline-offset-4">
                {c === 'All' ? 'Shop all' : c}
              </button>
            ))}
          </nav>
          <button onClick={goHome} className="justify-self-start text-2xl font-black tracking-tight md:justify-self-center">
            NORTHSTREET
          </button>
          <div className="flex items-center justify-end gap-5 text-xs font-medium uppercase tracking-wider">
            <button onClick={() => goCategory('All')} className="hidden hover:underline underline-offset-4 sm:block">
              Search
            </button>
            <button onClick={() => setCartOpen(true)} className="hover:underline underline-offset-4">
              Bag ({cartCount})
            </button>
          </div>
        </div>
        <div className="flex gap-6 overflow-x-auto border-t border-slate-100 px-6 py-3 text-xs font-medium uppercase tracking-wider md:hidden">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => goCategory(c)} className="whitespace-nowrap">
              {c === 'All' ? 'Shop all' : c}
            </button>
          ))}
        </div>
      </header>

      {activeProduct ? (
        <main>
          <ProductPage
            key={activeProduct.id}
            product={activeProduct}
            related={related}
            onAdd={addToCart}
            onOpen={openProduct}
            onHome={goHome}
          />
        </main>
      ) : (
        <main>
          {/* Try the Look */}
          <section className="pb-16 pt-12">
            <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Spring / Summer 2026</p>
                <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl">Try the Look.</h1>
              </div>
              <button
                onClick={() => goCategory('All')}
                className="hidden text-sm underline underline-offset-4 hover:text-slate-500 sm:block"
              >
                Shop all →
              </button>
            </div>

            <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4">
              {looks.map((look, i) => (
                <article key={look.title} className="w-72 flex-shrink-0 snap-start sm:w-80">
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                    <img src={look.image} alt={look.title} className="h-full w-full object-cover" />
                    <span className="absolute left-3 top-3 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-wider">
                      Look {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{look.title}</p>
                      <p className="text-xs text-slate-500">{look.items}</p>
                    </div>
                    <button
                      onClick={() => openProduct(findProduct(look.productId))}
                      className="flex-shrink-0 bg-black px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-white hover:bg-neutral-800"
                    >
                      Shop look
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Shop */}
          <section id="shop" className="mx-auto max-w-7xl scroll-mt-40 px-6 py-16">
            <div className="flex flex-wrap gap-x-7 gap-y-2 border-b border-slate-200">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`-mb-px border-b-2 pb-3 text-xs font-medium uppercase tracking-wider transition ${
                    category === c
                      ? 'border-black text-black'
                      : 'border-transparent text-slate-500 hover:text-black'
                  }`}
                >
                  {c}
                </button>
              ))}
              <span className="ml-auto pb-3 text-xs text-slate-500">
                {visibleProducts.length} {visibleProducts.length === 1 ? 'product' : 'products'}
              </span>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-3">
              {visibleProducts.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={openProduct} />
              ))}
            </div>
          </section>

          {/* Order confirmation */}
          {orderPlaced && (
            <section className="mx-auto max-w-7xl px-6 pb-16">
              <div className="border border-black p-10 text-center">
                <h3 className="text-xl font-semibold">Thanks for your order.</h3>
                <p className="mt-2 text-sm text-slate-600">We're preparing your items for shipping.</p>
                <button onClick={() => setOrderPlaced(false)} className="mt-5 text-sm underline underline-offset-4">
                  Keep shopping
                </button>
              </div>
            </section>
          )}

          {/* Feature banner */}
          <section className="bg-black text-white">
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">Footwear</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight">The Retro Red High-Top.</h2>
                <p className="mt-4 max-w-md text-neutral-400">
                  Classic silhouette, cushioned midsole, premium leather. Limited pairs in every size.
                </p>
                <button
                  onClick={() => openProduct(findProduct(6))}
                  className="mt-8 bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-black hover:bg-neutral-200"
                >
                  Shop footwear
                </button>
              </div>
              <img
                src={findProduct(6).image}
                alt="Retro Red High-Top"
                className="aspect-[4/5] w-full object-cover md:aspect-square"
              />
            </div>
          </section>

          {/* Newsletter */}
          <section className="mx-auto max-w-2xl px-6 py-20 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">Be first to the drop.</h2>
            <p className="mt-2 text-sm text-slate-500">New arrivals every Friday. Unsubscribe anytime.</p>
            {subscribed ? (
              <p className="mt-6 text-sm font-medium">You're on the list.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-6 flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="flex-1 border border-slate-300 px-4 py-3.5 text-sm outline-none focus:border-black"
                />
                <button
                  type="submit"
                  className="bg-black px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-neutral-800"
                >
                  Subscribe
                </button>
              </form>
            )}
          </section>
        </main>
      )}

      <footer className="border-t border-slate-200">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 text-sm sm:grid-cols-3">
          <div>
            <p className="text-lg font-black tracking-tight">NORTHSTREET</p>
            <p className="mt-2 text-slate-500">Everyday streetwear and sneakers.</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider">Shop</p>
            <ul className="mt-3 space-y-2 text-slate-600">
              {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                <li key={c}>
                  <button onClick={() => goCategory(c)} className="hover:text-black">
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider">Help</p>
            <ul className="mt-3 space-y-2 text-slate-600">
              <li>Shipping & returns</li>
              <li>Size guide</li>
              <li>Contact us</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-100 px-6 py-6 text-center text-xs text-slate-500">
          © 2026 Northstreet. All rights reserved.
        </div>
      </footer>

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onChangeQty={changeQty}
        onRemove={removeItem}
        onCheckout={checkout}
      />
    </div>
  );
}
