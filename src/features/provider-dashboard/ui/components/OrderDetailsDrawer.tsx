import React, { useState } from 'react';
import {
    X,
    User,
    MapPin,
    Clock,
    ArrowLeft,
    CheckCircle2,
    Camera,
    Plus,
    AlertTriangle,
    ShieldCheck,
    CreditCard
} from 'lucide-react';
import { type Order } from '../../infrastructure/api/ordersMockData';

interface OrderDetailsDrawerProps {
    order: Order;
    onClose: () => void;
    onStatusChange: (orderId: string, status: Order['rentalStatus']) => void;
}

type DrawerStep = 'details' | 'verify' | 'handover';

export const OrderDetailsDrawer: React.FC<OrderDetailsDrawerProps> = ({ order, onClose, onStatusChange }) => {
    const [step, setStep] = useState<DrawerStep>('details');
    const [pin, setPin] = useState(['', '', '', '']);

    const formatDateRange = (start: string, end: string) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const startMonth = startDate.toLocaleDateString('en-IN', { month: 'short' });
        const startDay = startDate.getDate();
        const endDay = endDate.getDate();
        return `${startMonth} ${startDay} - ${endDay}`;
    };

    const handlePinChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        // Auto-focus next input
        if (value && index < 3) {
            const nextInput = document.getElementById(`pin-${index + 1}`);
            nextInput?.focus();
        }
    };

    const renderDetails = () => (
        <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="p-6 space-y-6">
                {/* Customer Profile Card */}
                <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt={order.customerName} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-foreground">{order.customerName}</h3>
                            <div className="flex items-center gap-1 text-amber-500">
                                <span className="text-sm font-bold">★ 4.8</span>
                                <span className="text-xs text-muted-foreground font-normal">(24 Reviews)</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Completed Rentals</p>
                            <p className="text-lg font-bold">24</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Member Since</p>
                            <p className="text-lg font-bold">Mar 2023</p>
                        </div>
                    </div>
                </div>

                {/* Booking Details Card */}
                <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-6">
                    <h4 className="text-lg font-bold">Booking Details</h4>

                    <div className="flex items-center gap-4">
                        <img src={order.image} alt={order.productName} className="w-16 h-12 rounded-lg object-cover bg-secondary" />
                        <div>
                            <p className="font-bold text-base">{order.productName}</p>
                            <p className="text-sm text-muted-foreground">{formatDateRange(order.startDate, order.returnDate)}</p>
                        </div>
                    </div>

                    <div className="bg-secondary/30 rounded-xl p-4 flex items-start gap-3">
                        <div className="p-2 bg-background rounded-lg border border-border">
                            <MapPin size={20} className="text-primary" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold">Self Pickup</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                {order.rentalStatus === 'booked' ? 'Scheduled: Jan 25, 10:00AM' : 'Andheri West, Mumbai, Maharashtra, India'}
                            </p>
                        </div>
                        {order.rentalStatus !== 'booked' && (
                            <img src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/72.83,19.12,12/100x100?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.r_68_Kdb_9WvQ3CtkB68Tw" className="w-12 h-12 rounded-lg border border-border" alt="map" />
                        )}
                    </div>

                    <div className="space-y-3 pt-4 border-t border-border">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Daily Rate</span>
                            <span className="font-medium">₹95/days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Duration</span>
                            <span className="font-medium">3 days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Coupon/Discount</span>
                            <span className="font-medium text-red-500">-₹399.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Platform Fee (10%)</span>
                            <span className="font-medium">-₹28.50</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-border">
                            <span className="text-lg font-bold">Your Earnings</span>
                            <span className="text-lg font-extrabold text-emerald-600">₹{order.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Status Notice (Waiting for Payment) */}
                {order.rentalStatus === 'approved' && order.paymentStatus === 'pending' && (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-4">
                        <div className="p-2 bg-amber-100/50 rounded-xl h-fit">
                            <Clock className="text-amber-700" size={24} />
                        </div>
                        <div className="space-y-2">
                            <p className="font-bold text-amber-900">Waiting for Payment</p>
                            <p className="text-sm text-amber-800/80">Booking will be confirmed after payment is completed.</p>
                            <button className="text-amber-700 font-bold text-sm underline hover:text-amber-800">
                                Send Reminder to Customer
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-border bg-background">
                {order.rentalStatus === 'requested' && (
                    <div className="flex gap-4">
                        <button
                            onClick={() => onStatusChange(order.id, 'cancelled')}
                            className="flex-1 flex items-center justify-center gap-2 p-4 border border-red-500 text-red-500 rounded-xl font-bold hover:bg-red-50 transition-colors"
                        >
                            <X size={20} />
                            Cancel
                        </button>
                        <button
                            onClick={() => onStatusChange(order.id, 'approved')}
                            className="flex-1 flex items-center justify-center gap-2 p-4 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
                        >
                            <CheckCircle2 size={20} />
                            Accept
                        </button>
                    </div>
                )}
                {order.rentalStatus === 'booked' && (
                    <button
                        onClick={() => setStep('verify')}
                        className="w-full p-4 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
                    >
                        Start Handover Process
                    </button>
                )}
            </div>
        </div>
    );

    const renderVerify = () => (
        <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
            <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt={order.customerName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-foreground">{order.customerName}</h3>
                        <div className="flex items-center gap-1 text-amber-500">
                            <span className="text-sm font-bold">★ 4.8</span>
                            <span className="text-xs text-muted-foreground"> (24 Reviews)</span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border">
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">Completed Rentals</p>
                        <p className="text-lg font-bold">24</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">Member Since</p>
                        <p className="text-lg font-bold">Mar 2023</p>
                    </div>
                </div>
                <div className="pt-4 flex items-center gap-4">
                    <img src={order.image} alt={order.productName} className="w-12 h-9 rounded-lg object-cover bg-secondary" />
                    <div>
                        <p className="font-bold text-sm">{order.productName}</p>
                        <p className="text-xs text-muted-foreground">Jan 20 - 23</p>
                    </div>
                </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
                <p className="text-center text-sm font-medium text-muted-foreground">Enter 4-Digit Pickup PIN</p>
                <div className="flex justify-center gap-3">
                    {pin.map((digit, i) => (
                        <input
                            key={i}
                            id={`pin-${i}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handlePinChange(i, e.target.value)}
                            className="w-14 h-16 border-2 border-border rounded-xl text-center text-2xl font-bold focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            placeholder="-"
                        />
                    ))}
                </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
                <h4 className="font-bold">Identity verification Required</h4>
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <User size={18} />
                        <span>Match customers face with registration ID</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <ShieldCheck size={18} />
                        <span>Verify government-issued photo ID</span>
                    </div>
                </div>
            </div>

            <button
                onClick={() => setStep('handover')}
                disabled={pin.some(d => !d)}
                className="mt-auto p-4 bg-primary text-white rounded-xl font-bold hover:opacity-90 disabled:bg-muted disabled:text-muted-foreground transition-all shrink-0"
            >
                Verify & Continue
            </button>
        </div>
    );

    const renderHandover = () => (
        <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
                <h4 className="font-bold">Customer Photo Verification</h4>
                <div className="grid grid-cols-4 gap-2">
                    {['Front', 'Back', 'Display', 'Serial'].map((label, i) => (
                        <button key={i} className={`aspect-square flex flex-col items-center justify-center gap-1 border border-dashed rounded-xl transition-colors ${label === 'Serial' ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'bg-secondary/50 border-border text-muted-foreground hover:bg-secondary'}`}>
                            {label === 'Serial' ? <CheckCircle2 size={24} /> : <Camera size={24} />}
                            <span className="text-[10px] font-medium">{label}</span>
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                        <div className="p-1.5 bg-red-100 rounded-full">
                            <ShieldCheck className="text-red-600" size={16} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-red-900">ID Verification</p>
                            <p className="text-[10px] text-red-700">Aadhaar</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                        <div className="p-1.5 bg-red-100 rounded-full">
                            <CreditCard className="text-red-600" size={16} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-red-900">Deposit Held</p>
                            <p className="text-[10px] text-red-700">₹10,000</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
                <h4 className="font-bold">Handover Checklist</h4>
                <div className="space-y-3">
                    {[
                        { title: 'Verify Customer', desc: 'Match face with ID photo', required: true, checked: true },
                        { title: 'Confirm Booking Details', desc: 'Verify rental period & item', required: true, checked: true },
                        { title: 'Payment Confirmed', desc: 'Rental fee & Deposit received', required: false, checked: false },
                        { title: 'Demonstrate Item Condition', desc: 'Check the item', required: false, checked: false }
                    ].map((item, i) => (
                        <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${item.checked ? 'bg-red-50/50 border-red-100' : 'bg-secondary/30 border-transparent'}`}>
                            <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${item.checked ? 'bg-red-500 border-red-500 text-white' : 'border-muted-foreground'}`}>
                                {item.checked && <CheckCircle2 size={14} strokeWidth={3} />}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <p className={`text-sm font-bold ${item.checked ? 'text-red-900' : 'text-foreground'}`}>{item.title}</p>
                                    {item.required && <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded">Required</span>}
                                </div>
                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
                <h4 className="font-bold">Take Pre-Handover Photos</h4>
                <p className="text-xs text-muted-foreground">Document item condition before handover</p>
                <div className="grid grid-cols-4 gap-2">
                    {['Front', 'Back', 'Display', 'Serial'].map((label, i) => (
                        <button key={i} className={`aspect-square flex flex-col items-center justify-center gap-1 border border-dashed rounded-xl transition-colors ${label === 'Serial' ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'bg-secondary/50 border-border text-muted-foreground hover:bg-secondary'}`}>
                            {label === 'Serial' ? <CheckCircle2 size={24} /> : <Camera size={24} />}
                            <span className="text-[10px] font-medium">{label}</span>
                        </button>
                    ))}
                    <button className="aspect-square flex flex-col items-center justify-center gap-1 border border-dashed border-muted-foreground/30 rounded-xl text-muted-foreground hover:bg-secondary transition-colors">
                        <Plus size={24} />
                        <span className="text-[10px] font-medium">Add Photo</span>
                    </button>
                </div>
            </div>

            <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3">
                <AlertTriangle size={20} className="text-red-500 shrink-0" />
                <p className="text-[10px] text-red-700 leading-normal">
                    Please complete all required checks before proceeding and take clear pre-handover photos of the product (all sides, serial number if any, accessories, and existing damage), as these will be used for comparison if any issue or dispute arises after handover.
                </p>
            </div>

            <button
                onClick={() => onStatusChange(order.id, 'active')}
                className="mt-4 p-4 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity shrink-0"
            >
                Complete Handover
            </button>
        </div>
    );

    return (
        <div className={`provider-drawer-overlay provider-drawer-overlay--open`}>
            <div className="provider-drawer-overlay__backdrop" onClick={onClose} />
            <div className="provider-drawer-panel">
                <div className="provider-drawer-panel__header">
                    <button
                        onClick={step === 'details' ? onClose : () => setStep('details')}
                        className="provider-drawer-panel__back"
                    >
                        {step === 'details' ? <X size={24} /> : <ArrowLeft size={24} />}
                    </button>
                    <h2 className="provider-drawer-panel__title">
                        {step === 'details' ? 'Order Details' :
                            step === 'verify' ? 'Verify Customer' : 'Handover Supervision'}
                    </h2>
                    <div className="w-10" />
                </div>

                <div className="provider-drawer-panel__content">
                    {step === 'details' && renderDetails()}
                    {step === 'verify' && renderVerify()}
                    {step === 'handover' && renderHandover()}
                </div>
            </div>
        </div>
    );
};
