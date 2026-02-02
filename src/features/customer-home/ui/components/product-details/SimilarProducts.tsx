import { Heart, Plus } from 'lucide-react';
import type { Product } from '../../../domain/entities/types';

interface SimilarProductsProps {
    products: Product[];
}

export const SimilarProducts: React.FC<SimilarProductsProps> = ({ products }) => {
    // Mock additional products for the grid if needed
    const displayProducts = products.length > 0 ? products.slice(0, 6) : [];

    return (
        <div className="section-container similar-products">
            <h3 className="section-title">Similar Products</h3>
            <div className="products-grid">
                {displayProducts.map((product) => (
                    <div key={product.id} className="similar-product-card">
                        <div className="product-card-image">
                            <img src={product.image} alt={product.name} />
                            <button className="favorite-btn">
                                <Heart size={16} fill={product.isFavorite ? "currentColor" : "none"} />
                            </button>
                            {product.isImported && (
                                <span className="p-badge imported">IMPORTED</span>
                            )}
                            {product.discount && (
                                <span className="p-badge discount">{product.discount}% OFF</span>
                            )}
                        </div>
                        <div className="product-card-info">
                            <h4 className="product-name">{product.name}</h4>
                            <div className="product-card-rating">
                                <span className="stars">★★★★★</span>
                                <span className="count">({(100 + (product.id.length * 7) % 400)})</span>
                            </div>
                            <div className="product-card-footer">
                                <div className="product-price">
                                    <span className="price">₹{product.price.toLocaleString()}</span>
                                    <span className="original-price">₹{(product.price * 1.2).toLocaleString()}</span>
                                </div>
                                <button className="add-btn">
                                    <Plus size={16} />
                                    ADD
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="see-all-products">
                <div className="avatar-group">
                    <img src="https://i.pravatar.cc/30?u=1" alt="u1" />
                    <img src="https://i.pravatar.cc/30?u=2" alt="u2" />
                    <img src="https://i.pravatar.cc/30?u=3" alt="u3" />
                </div>
                <span>See all products ➔</span>
            </button>
        </div>
    );
};
