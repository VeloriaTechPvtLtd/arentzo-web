'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { BackHeader } from '../../../../shared/components/layout/BackHeader';
import { useCart } from '../../../../shared/hooks/useCart';
import { ProductGallery } from '../components/product-details/ProductGallery';
import { ProductInfo } from '../components/product-details/ProductInfo';
import { RelatedProducts } from '../components/product-details/RelatedProducts';
import { useProductDetails } from '@/features/catalog/ui/hooks/useProductDetails';
import '../styles/CustomerHome.css';

export const ProductDetailsPage: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const { addToCart, items: cartItems, updateQuantity } = useCart();
  const { product, related, loading, error, favoriteError, toggleFavorite, retry } = useProductDetails(id);
  const quantity = useMemo(() => cartItems.find((item) => item.product.id === id)?.quantity || 0, [cartItems, id]);
  const handleAddToCart = () => { if (product?.isAvailable) addToCart(product); };
  const handleQuantityChange = (newQuantity: number) => { if (product) updateQuantity(product.id, newQuantity); };
  const handleRelatedAdd = (productId: string) => { const item = related.find((entry) => entry.id === productId); if (item?.isAvailable) addToCart(item); };

  if (loading) return <div className="product-details-page"><BackHeader title="Product Details" /><p role="status" className="p-6">Loading listing…</p></div>;
  if (error || !product) return <div className="product-details-page"><BackHeader title="Product Details" /><div className="product-not-found"><h2>{error === 'not_found' ? 'Listing not found' : 'Listing unavailable'}</h2><p>{error === 'timeout' ? 'The listing is taking longer than expected to load.' : error === 'request_failed' ? 'We could not load this listing right now.' : 'This listing is no longer available.'}</p>{error && error !== 'not_found' ? <button onClick={retry} className="back-button">Try again</button> : null}<button onClick={() => router.push('/browse')} className="back-button"><ArrowLeft size={20} />Browse Listings</button></div></div>;

  return <div className="product-details-page">
    <BackHeader title="Product Details" />
    <main className="product-details-content"><div className="product-details-container"><div className="product-main-section">
      <ProductGallery key={product.id} images={product.images?.length ? product.images : [product.image]} name={product.name} isImported={product.isImported} specifications={product.specifications} />
      <ProductInfo product={product} quantity={quantity} isAvailable={Boolean(product.isAvailable)} onQuantityChange={handleQuantityChange} onAddToCart={handleAddToCart} onFavoriteToggle={() => void toggleFavorite(product.id)} />
    </div></div>
      {favoriteError ? <p role="alert" className="px-4 text-sm text-destructive">We couldn’t update saved listings.</p> : null}
      {related.length ? <RelatedProducts products={related} onAddToCart={handleRelatedAdd} onFavoriteToggle={toggleFavorite} /> : null}
    </main>
  </div>;
};
