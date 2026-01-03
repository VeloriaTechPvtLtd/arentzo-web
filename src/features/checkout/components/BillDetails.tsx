import React from 'react';
import { FileText, Truck, ShieldCheck } from 'lucide-react';

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
                <div className="bill-value">₹{itemsTotal}</div>
            </div>

            <div className="bill-row">
                <div className="bill-label">
                    <Truck size={16} />
                    <span>Delivery charge</span>
                </div>
                <div className="bill-value">
                    <span className="price-struck">₹{deliveryCharge}</span>
                    <span className="bill-value--free">FREE</span>
                </div>
            </div>

            <div className="bill-row">
                <div className="bill-label">
                    <ShieldCheck size={16} />
                    <span>Handling charge</span>
                </div>
                <div className="bill-value">₹{handlingCharge}</div>
            </div>

            <div className="bill-total-row">
                <span className="bill-total-label">Grand total</span>
                <span className="bill-total-value">₹{grandTotal}</span>
            </div>

            <div className="savings-highlight">
                <div className="savings-total">Your total savings ₹{totalSavings}</div>
                <div className="savings-subtext">Includes ₹20 savings through free delivery</div>
            </div>
        </div>
    );
};
