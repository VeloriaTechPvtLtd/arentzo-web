import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { CategorySelection } from './add-product-steps/CategorySelection';
import { SubcategorySelection } from './add-product-steps/SubcategorySelection';
import { BasicDetails } from './add-product-steps/BasicDetails';
import { DynamicDetails } from './add-product-steps/DynamicDetails';
import { PhotoUpload } from './add-product-steps/PhotoUpload';
import { RentalRates } from './add-product-steps/RentalRates';
import { Availability } from './add-product-steps/Availability';
import { LocationDelivery } from './add-product-steps/LocationDelivery';
import { TermsSelection } from './add-product-steps/TermsSelection';
import { RequiredDocuments } from './add-product-steps/RequiredDocuments';
import { ReviewPublish } from './add-product-steps/ReviewPublish';
import '../styles/AddProductSteps.css';

interface AddProductFormProps {
    onClose: () => void;
    onSuccess: () => void;
}

export interface ProductDraftFields {
    title: string; description: string; condition: string; brand: string; model: string; year: string; color: string;
}
interface ListingCategory { id: string; name: string; image: string }

export const AddProductForm: React.FC<AddProductFormProps> = ({ onClose, onSuccess }) => {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<ListingCategory | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<ListingCategory | null>(null);
    const [form, setForm] = useState<ProductDraftFields>({
        title: '',
        description: '',
        condition: '',
        brand: '',
        model: '',
        year: '',
        color: ''
    });

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => {
        if (step === 1) onClose();
        else setStep(prev => prev - 1);
    };

    const getStepTitle = () => {
        switch (step) {
            case 1: return 'Select Category';
            case 2: return 'Select Subcategory';
            case 3: return 'Basic Details';
            case 4: return 'Add Your Car';
            case 5: return 'Upload Photos';
            case 6: return 'Rental Rates & Deposit';
            case 7: return 'Availability';
            case 8: return 'Location & Delivery';
            case 9: return 'Terms Selection';
            case 10: return 'Required Documents';
            case 11: return 'Review Listing';
            default: return 'Add Product';
        }
    };

    const renderStep = () => {
        const stepData = {
            categoryName: selectedCategory?.name,
            categoryImage: selectedCategory?.image,
            subcategoryName: selectedSubcategory?.name,
            subcategoryImage: selectedSubcategory?.image,
            form
        };

        switch (step) {
            case 1:
                return (
                    <CategorySelection
                        onSelect={(cat) => {
                            setSelectedCategory(cat);
                            handleNext();
                        }}
                    />
                );
            case 2:
                return (
                    <SubcategorySelection
                        categoryName={selectedCategory?.name ?? ''}
                        categoryImage={selectedCategory?.image ?? ''}
                        selectedSubcategory={selectedSubcategory}
                        onSelect={setSelectedSubcategory}
                        onNext={handleNext}
                    />
                );
            case 3:
                return (
                    <BasicDetails
                        data={stepData}
                        form={form}
                        setForm={setForm}
                        onNext={handleNext}
                        onEditCategory={() => setStep(1)}
                    />
                );
            case 4:
                return <DynamicDetails onNext={handleNext} />;
            case 5:
                return <PhotoUpload onNext={handleNext} />;
            case 6:
                return <RentalRates onNext={handleNext} />;
            case 7:
                return <Availability onNext={handleNext} />;
            case 8:
                return <LocationDelivery onNext={handleNext} />;
            case 9:
                return <TermsSelection onNext={handleNext} />;
            case 10:
                return <RequiredDocuments onNext={handleNext} />;
            case 11:
                return <ReviewPublish data={stepData} onPublish={onSuccess} />;
            default:
                return null;
        }
    };

    return (
        <div className="add-product-flow">
            <header className="step-header">
                <button className="back-btn" onClick={handleBack}>
                    <ChevronLeft size={24} />
                </button>
                <h1 className="step-title">{getStepTitle()}</h1>
            </header>

            {renderStep()}
        </div>
    );
};
