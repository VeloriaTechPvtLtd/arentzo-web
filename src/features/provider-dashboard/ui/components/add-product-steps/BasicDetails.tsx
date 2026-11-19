import React from 'react';
import { Search, ChevronDown, Edit2 } from 'lucide-react';
import type { ProductDraftFields } from '../AddProductForm';

interface BasicDetailsProps {
    data: {
        categoryName?: string;
        categoryImage?: string;
        subcategoryName?: string;
        subcategoryImage?: string;
    };
    form: ProductDraftFields;
    setForm: React.Dispatch<React.SetStateAction<ProductDraftFields>>;
    onNext: () => void;
    onEditCategory: () => void;
}

export const BasicDetails: React.FC<BasicDetailsProps> = ({
    data,
    form,
    setForm,
    onNext,
    onEditCategory
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <div className="step-content">
            <div className="search-container">
                <Search size={20} className="search-icon" />
                <input type="text" placeholder="Search..." className="search-input" />
            </div>

            <div className="review-section">
                <p className="review-text">Review your Category and Subcategory before continuing</p>
                <div className="review-cards">
                    <div className="review-card">
                        <img src={data.categoryImage} alt={data.categoryName} />
                        <div className="review-overlay">
                            <span className="review-label">Category</span>
                            <span className="review-value">{data.categoryName}</span>
                        </div>
                        <button className="edit-btn" onClick={onEditCategory}><Edit2 size={14} /></button>
                    </div>
                    <div className="review-card">
                        <img src={data.subcategoryImage} alt={data.subcategoryName} />
                        <div className="review-overlay">
                            <span className="review-label">Subcategory</span>
                            <span className="review-value">{data.subcategoryName}</span>
                        </div>
                        <button className="edit-btn" onClick={onEditCategory}><Edit2 size={14} /></button>
                    </div>
                </div>
            </div>

            <div className="form-section">
                <div className="input-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="eg. Rang Rover Sports"
                        value={form.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        placeholder="Enter Description of Products"
                        value={form.description}
                        onChange={handleChange}
                    />
                    <span className="char-count">Max. words 100</span>
                </div>

                <div className="input-group">
                    <label>Condition</label>
                    <div className="select-wrapper">
                        <select name="condition" value={form.condition} onChange={handleChange}>
                            <option value="">Select Item Condition</option>
                            <option value="new">New</option>
                            <option value="used">Used</option>
                        </select>
                        <ChevronDown className="select-icon" size={20} />
                    </div>
                </div>

                <div className="input-group">
                    <label>Brand</label>
                    <input
                        type="text"
                        name="brand"
                        placeholder="eg. Land Rover"
                        value={form.brand}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label>Model</label>
                    <input
                        type="text"
                        name="model"
                        placeholder="eg. Sports Edition"
                        value={form.model}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid-2-cols">
                    <div className="input-group">
                        <label>Year</label>
                        <input
                            type="text"
                            name="year"
                            placeholder="eg. 2024"
                            value={form.year}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label>Color</label>
                        <input
                            type="text"
                            name="color"
                            placeholder="eg. White"
                            value={form.color}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <div className="step-footer">
                <button className="next-btn" onClick={onNext}>Next</button>
            </div>
        </div>
    );
};
