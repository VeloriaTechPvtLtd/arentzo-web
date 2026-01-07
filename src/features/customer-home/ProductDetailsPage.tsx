import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Star, Heart, ShoppingCart, Share2, Plus, Minus } from 'lucide-react';
import { mockProducts } from './data/mockData';
import { ProductsGrid } from './components/ProductsGrid';
import { CustomerLayout } from './components/layout/CustomerLayout';
import { useCart } from './context/CartContext';
import './CustomerHome.css';

export const ProductDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { addToCart, cartItems, updateQuantity } = useCart();

    const product = useMemo(() => {
        return mockProducts.find(p => p.id === id);
    }, [id]);

    const quantity = useMemo(() => {
        if (!product) return 0;
        const cartItem = cartItems.find(item => item.id === product.id);
        return cartItem ? cartItem.quantity : 0;
    }, [product, cartItems]);

    const relatedProducts = useMemo(() => {
        return mockProducts.filter(p => p.id !== id).slice(0, 4);
    }, [id]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price / 100);
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart({
                id: product.id,
                image: product.image,
                quantity: 1
            });
        }
    };

    const handleQuantityChange = (newQuantity: number) => {
        if (product) {
            updateQuantity(product.id, newQuantity);
        }
    };

    if (!product) {
        return (
            <CustomerLayout>
                <div className="product-details-page">
                    <div className="product-not-found">
                        <h2>Product not found</h2>
                        <a href="/home" className="back-button">
                            <ArrowLeft size={20} />
                            Back to Home
                        </a>
                    </div>
                </div>
            </CustomerLayout>
        );
    }

    return (
        <CustomerLayout>
            <div className="product-details-page">
                <main className="product-details-content">
                    <div className="product-details-container">
                        <div className="product-main-section">
                            <div className="product-gallery">
                                <div className="main-image-container">
                                    <img src={product.image} alt={product.name} className="main-image" />
                                    {product.isImported && (
                                        <span className="badge badge--imported">Imported</span>
                                    )}
                                </div>
                                {/* Thumbnail placeholders since we don't have multiple images in mock data */}
                                <div className="thumbnail-list">
                                    {[product.image, product.image, product.image].map((img, idx) => (
                                        <button key={idx} className={`thumbnail ${idx === 0 ? 'active' : ''}`}>
                                            <img src={img} alt={`View ${idx + 1}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="product-info-column">
                                <div className="product-header">
                                    <h1 className="product-title">{product.name}</h1>
                                    <div className="product-actions-top">
                                        <button className="action-btn" aria-label="Share">
                                            <Share2 size={20} />
                                        </button>
                                        <button className="action-btn" aria-label="Add to favorites">
                                            <Heart size={20} fill={product.isFavorite ? '#ff7e5f' : 'none'} color={product.isFavorite ? '#ff7e5f' : 'currentColor'} />
                                        </button>
                                    </div>
                                </div>

                                <div className="product-rating">
                                    <div className="stars">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                fill={i < product.rating ? '#ff7e5f' : 'none'}
                                                color={i < product.rating ? '#ff7e5f' : '#cbd5e1'}
                                            />
                                        ))}
                                    </div>
                                    <span className="review-count">({product.reviewCount} reviews)</span>
                                </div>

                                <div className="product-pricing">
                                    <div className="current-price">{formatPrice(product.price)}</div>
                                    {product.originalPrice && (
                                        <div className="original-price">{formatPrice(product.originalPrice)}</div>
                                    )}
                                    {product.discount && (
                                        <div className="discount-tag">Save {product.discount}%</div>
                                    )}
                                </div>

                                <div className="product-description">
                                    <h3>Description</h3>
                                    <p>
                                        Experience premium quality with this {product.name}. Perfect for your needs, this product features high-end materials and exceptional durability.
                                        {product.isImported ? ' This is an imported item known for its superior craftsmanship.' : ''}
                                    </p>
                                </div>

                                {product.features && product.features.length > 0 && (
                                    <div className="product-features">
                                        <h3>Key Features</h3>
                                        <ul className="features-list">
                                            {product.features.map((feature, index) => (
                                                <li key={index} className="feature-item">
                                                    <span className="feature-check">✓</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="product-availability">
                                    <span className={`status-dot ${product.isAvailable ? 'available' : 'unavailable'}`}></span>
                                    {product.isAvailable ? 'In Stock & Ready to Ship' : 'Currently Unavailable'}
                                </div>

                                <div className="purchase-actions">
                                    {quantity > 0 ? (
                                        <div className="quantity-stepper">
                                            <button
                                                className="qty-btn"
                                                onClick={() => handleQuantityChange(quantity - 1)}
                                            >
                                                <Minus size={20} />
                                            </button>
                                            <span className="qty-value">{quantity}</span>
                                            <button
                                                className="qty-btn"
                                                onClick={() => handleQuantityChange(quantity + 1)}
                                            >
                                                <Plus size={20} />
                                            </button>
                                        </div>
                                    ) : (
                                        <button className="add-to-cart-btn" onClick={handleAddToCart}>
                                            <ShoppingCart size={20} />
                                            Add to Cart
                                        </button>
                                    )}
                                    <button className="buy-now-btn">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="related-products-section">
                        <ProductsGrid
                            title="Similar Products"
                            products={relatedProducts}
                            onAddToCart={() => { }}
                            onFavoriteToggle={() => { }}
                        />
                    </div>
                </main>
            </div>
        </CustomerLayout>
    );
};
