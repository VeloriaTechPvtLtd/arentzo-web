import React from 'react';
import { Truck, Package, FileText } from 'lucide-react';

export const QuickLogistics: React.FC = () => {
    return (
        <section className="dashboard-card quick-access">
            <div className="card-header">
                <div className="card-header-title">
                    <Truck size={18} className="text-primary" />
                    <h2>Recent Logistics</h2>
                </div>
            </div>
            <div className="quick-list">
                <button className="quick-btn">
                    <Package size={16} />
                    <span>Bulk Add Inventory</span>
                </button>
                <button className="quick-btn">
                    <FileText size={16} />
                    <span>Export Tax Invoice</span>
                </button>
            </div>
        </section>
    );
};
