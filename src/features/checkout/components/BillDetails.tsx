import React from 'react';
import { FileText, Truck, ShoppingBag } from 'lucide-react';

interface BillDetailsProps {
    itemsTotal: number;
    deliveryCharge: number;
    handlingCharge: number;
    totalSavings: number;
}

export const BillDetails: React.FC<BillDetailsProps> = ({
    itemsTotal,
    deliveryCharge,
    handlingCharge,
    totalSavings,
}) => {
    const grandTotal = itemsTotal + deliveryCharge + handlingCharge;

    return (
        <div className="bill-details">
            <h2 className="bill-details__title">Bill details</h2>

            <div className="bill-row">
                <div className="bill-label">
                    <FileText size={16} />
                    <span>Items total</span>
                    <span className="badge-saved">Saved ₹9,999</span>
                </div>
                <div className="bill-value">
                    <span className="price-struck">₹12345</span>
                    <span>₹{itemsTotal}</span>
                </div>
            </div>

            <div className="bill-row">
                <div className="bill-label">
                    <Truck size={16} />
                    <span className="label-dotted">Delivery charge</span>
                </div>
                <div className="bill-value">
                    <span className="price-struck">₹12</span>
                    <span className="bill-value--free">FREE</span>
                </div>
            </div>

            <div className="bill-row">
                <div className="bill-label">
                    <ShoppingBag size={16} />
                    <span className="label-dotted">Handling charge</span>
                </div>
                <div className="bill-value">₹{handlingCharge}</div>
            </div>

            <div className="bill-divider"></div>

            <div className="bill-grand-total">
                <span className="grand-total-label">Grand total</span>
                <span className="grand-total-value">₹{grandTotal}</span>
            </div>

            <div className="savings-container">
                <div className="savings-wave"></div>
                <div className="savings-content">
                    <div className="savings-row">
                        <span className="savings-label">Your total savings</span>
                        <span className="savings-amount">₹{totalSavings}</span>
                    </div>
                    <div className="savings-note">Includes ₹30 savings through free delivery</div>
                </div>
            </div>
        </div>
    );
};
