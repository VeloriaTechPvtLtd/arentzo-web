'use client';

import { useMemo, useState } from 'react';
import { CategoryTabs } from '../components/CategoryTabs';
import { ProductsGrid } from '../components/ProductsGrid';
import { CustomerLayout } from '../layouts/CustomerLayout';
import { useCart } from '@/shared/hooks/useCart';
import { useDrawer } from '@/shared/hooks/useDrawer';
import { useCatalogProducts } from '@/features/catalog/ui/hooks/useCatalogProducts';
import { useCatalogCategories } from '@/features/catalog/ui/hooks/useCatalogCategories';
import '../styles/CustomerHome.css';

export function CustomerHomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { products, loading, error, favoritesError, toggleFavorite } = useCatalogProducts();
  const categories = useCatalogCategories();
  const { items: cartItems, addToCart, updateQuantity } = useCart();
  const { openCheckout } = useDrawer();
  const visibleProducts = useMemo(() => products
    .filter((product) => activeCategory === 'all' || product.category === activeCategory)
    .map((product) => ({ ...product, quantity: cartItems.find((item) => item.product.id === product.id)?.quantity || 0 })), [activeCategory, cartItems, products]);

  const addProductToCart = (productId: string) => {
    const product = visibleProducts.find((item) => item.id === productId);
    if (!product?.isAvailable) return;
    addToCart(product);
    openCheckout();
  };
  const changeQuantity = (productId: string, quantity: number) => updateQuantity(productId, quantity);
  const selectedName = categories.categories.find((category) => category.id === activeCategory)?.name;

  return <CustomerLayout className="customer-home--all">
    <main className="customer-home__content mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="mb-5 sm:mb-7"><h1 className="text-2xl font-bold text-foreground sm:text-3xl">Browse rentals</h1><p className="mt-1 text-sm text-muted-foreground">Explore currently available listings.</p></header>
      <CategoryTabs categories={categories.categories.map(({ id, name, icon }) => ({ id, name, icon }))} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      {categories.loading ? <p role="status" className="py-4 text-sm text-muted-foreground">Loading categories…</p> : null}
      {categories.error ? <p role="status" className="py-4 text-sm text-muted-foreground">Categories are temporarily unavailable.</p> : null}
      {loading ? <p role="status" className="py-4 text-sm text-muted-foreground">Loading current listings…</p> : null}
      {error ? <p role="alert" className="py-4 text-sm text-destructive">Current listings are temporarily unavailable.</p> : null}
      {favoritesError ? <p role="status" className="py-2 text-sm text-muted-foreground">Saved-list status could not be loaded.</p> : null}
      {!loading && !error ? <ProductsGrid title={selectedName ? `${selectedName} listings` : 'Available listings'} products={visibleProducts} onFavoriteToggle={toggleFavorite} onAddToCart={addProductToCart} onQuantityChange={changeQuantity} /> : null}
      {!loading && !error && visibleProducts.length === 0 ? <p className="mx-auto max-w-7xl px-4 py-10 text-center text-muted-foreground">No listings are available in this category yet.</p> : null}
    </main>
  </CustomerLayout>;
}
