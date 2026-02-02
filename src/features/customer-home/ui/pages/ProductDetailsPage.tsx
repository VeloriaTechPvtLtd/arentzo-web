import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BackHeader } from '../../../../shared/components/layout/BackHeader';
import { mockProducts } from '../../infrastructure/api/mockData';
import { useCart } from '../../../../shared/hooks/useCart';
import { ProductGallery } from '../components/product-details/ProductGallery';
import { ProductInfo } from '../components/product-details/ProductInfo';
import { RelatedProducts } from '../components/product-details/RelatedProducts';
import '../styles/CustomerHome.css';

export const ProductDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart, items: cartItems, updateQuantity } = useCart();

    const product = useMemo(() => {
        return mockProducts.find(p => p.id === id);
    }, [id]);

    const quantity = useMemo(() => {
        if (!product) return 0;
        const cartItem = cartItems.find(item => item.product.id === product.id);
        return cartItem ? cartItem.quantity : 0;
    }, [product, cartItems]);

    const relatedProducts = useMemo(() => {
        return mockProducts.filter(p => p.id !== id).slice(0, 4);
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
        }
    };

    const handleQuantityChange = (newQuantity: number) => {
        if (product) {
            updateQuantity(product.id, newQuantity);
        }
    };

    if (!product) {
        return (
            <div className="product-details-page">
                <BackHeader title="Product Details" />
                <div className="product-not-found">
                    <h2>Product not found</h2>
                    <button onClick={() => navigate('/browse')} className="back-button">
                        <ArrowLeft size={20} />
                        Browse Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="product-details-page">
            <BackHeader title="Product Details" />
            <main className="product-details-content">
                <div className="product-details-container">
                    <div className="product-main-section">
                        <ProductGallery
                            images={product.images || [product.image, product.image, product.image]}
                            name={product.name}
                            isImported={product.isImported}
                            specifications={product.specifications}
                        />

                        <ProductInfo
                            product={product}
                            quantity={quantity}
                            onQuantityChange={handleQuantityChange}
                            onAddToCart={handleAddToCart}
                        />
                    </div>
                </div>

                <RelatedProducts products={relatedProducts} />
            </main>
        </div>
    );
};
