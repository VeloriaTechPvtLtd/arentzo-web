import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface CouponItem {
    id: string;
    title: string;
    code: string;
    isApplied: boolean;
    isOfferValid?: boolean;
    description?: string[];
    logo?: string;
}

interface CouponsViewProps {
    onApply: (coupon: CouponItem) => void;
    onRemove: (coupon: CouponItem) => void;
}

export const CouponsView: React.FC<CouponsViewProps> = ({ onApply, onRemove }) => {
    const [coupons] = useState<CouponItem[]>([
        {
            id: '1',
            title: 'Get 10% OFF upto ₹300',
            code: 'AXISCC10',
            isApplied: true,
            description: [
                'Applicable only on transactions using select Axis Bank Credit Cards',
                'Get 10% off on final bill. Maximum Discount is ₹300'
            ]
        },
        {
            id: '2',
            title: 'Get 10% OFF upto ₹600',
            code: 'AXISEL10',
            isApplied: false,
            description: [
                'Applicable only on transactions using select Axis Bank Credit Cards',
                'Maximum Discount is ₹600'
            ]
        },
        {
            id: '3',
            title: 'Flat ₹50 Cashback',
            code: 'GPAY234',
            isApplied: false,
            isOfferValid: false,
            description: [
                'Applicable only on transactions using Google Pay'
            ],
            logo: 'https://www.gstatic.com/images/branding/googlepay/googlepay_logo_color_rect_32dp.png'
        }
    ]);

    return (
        <div className="coupons-view">
            <div className="coupons-view__search">
                <input
                    type="text"
                    placeholder="Enter coupon code here"
                    className="coupons-search__input"
                />
                <button className="coupons-search__apply">Apply</button>
            </div>

            <section className="coupons-section-group">
                <h3 className="coupons-group__title">Bank offers</h3>

                <div className="coupons-list">
                    {coupons.map((coupon: CouponItem) => (
                        <div key={coupon.id} className={`coupon-card-alt ${coupon.isApplied ? 'coupon-card-alt--applied' : ''}`}>
                            <div className="coupon-card-alt__header">
                                <div className="coupon-card-alt__icon-row">
                                    <div className="coupon-card-alt__logo">
                                        {coupon.logo ? (
                                            <img src={coupon.logo} alt="brand" />
                                        ) : (
                                            <div className="brand-logo-fallback">A</div>
                                        )}
                                    </div>
                                    <div className="coupon-card-alt__main-info">
                                        <h4 className="coupon-card-alt__title">{coupon.title}</h4>
                                        <p className="coupon-card-alt__code">Use code <span>{coupon.code}</span></p>
                                    </div>
                                </div>
                                <button
                                    className={`coupon-card-alt__action ${coupon.isApplied ? 'coupon-card-alt__action--remove' : ''}`}
                                    onClick={() => coupon.isApplied ? onRemove(coupon) : onApply(coupon)}
                                >
                                    {coupon.isApplied ? 'Remove' : 'Apply'}
                                </button>
                            </div>

                            <div className="coupon-card-alt__divider"></div>

                            <div className="coupon-card-alt__details">
                                {coupon.isOfferValid === false && (
                                    <p className="coupon-card-alt__error">Add item worth ₹19 more to avail this offer</p>
                                )}
                                <ul className="coupon-conditions">
                                    {coupon.description?.map((desc: string, i: number) => (
                                        <li key={i}>{desc}</li>
                                    ))}
                                </ul>
                                <button className="coupon-read-more">
                                    <Plus size={14} />
                                    <span>Read more</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
