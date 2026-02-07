import React, { useState } from 'react';
import { ChevronDown, Plus, GripVertical } from 'lucide-react';

interface DynamicDetailsProps {
    onNext: () => void;
}

export const DynamicDetails: React.FC<DynamicDetailsProps> = ({ onNext }) => {
    const [features, setFeatures] = useState([
        { id: 1, label: 'Air Conditioning', checked: true },
        { id: 2, label: 'Navigation System', checked: true },
        { id: 3, label: 'Bluetooth', checked: true },
        { id: 4, label: 'Keyless Entry', checked: false },
        { id: 5, label: 'Adjustable Steering', checked: false },
        { id: 6, label: 'Dash cams', checked: false },
    ]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [additionalFeatures, _setAdditionalFeatures] = useState([
        { id: 1, key: 'Sunroof', value: 'No' },
        { id: 2, key: 'Airbags', value: 'Yes' },
        { id: 3, key: 'Voice Control', value: 'No' },
    ]);

    const [seats, setSeats] = useState(5);
    const [fuelType, setFuelType] = useState('Petrol');

    return (
        <div className="step-content">
            <div className="form-section">
                <div className="input-group">
                    <label>Car make</label>
                    <input type="text" placeholder="eg. Land Rover" />
                </div>

                <div className="input-group">
                    <label>Car model</label>
                    <input type="text" placeholder="eg. Range Rover" />
                </div>

                <div className="grid-2-cols">
                    <div className="input-group">
                        <label>Year</label>
                        <input type="text" placeholder="eg. 2024" />
                    </div>
                    <div className="input-group">
                        <label>Mileage</label>
                        <input type="text" placeholder="eg. 15 km/L" />
                    </div>
                </div>

                <div className="input-group">
                    <label>Transmission</label>
                    <div className="select-wrapper">
                        <select>
                            <option>Select Transmission</option>
                            <option>Automatic</option>
                            <option>Manual</option>
                        </select>
                        <ChevronDown className="select-icon" size={20} />
                    </div>
                </div>

                <div className="features-section">
                    <label className="section-label">Features</label>
                    <div className="features-grid">
                        {features.map(feature => (
                            <label key={feature.id} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={feature.checked}
                                    onChange={() => {
                                        setFeatures(features.map(f =>
                                            f.id === feature.id ? { ...f, checked: !f.checked } : f
                                        ));
                                    }}
                                />
                                <span className="checkbox-custom"></span>
                                <span className="checkbox-label">{feature.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="slider-section">
                    <div className="slider-header">
                        <label>Number of Seats</label>
                    </div>
                    <div className="slider-container">
                        <span className="slider-min">0</span>
                        <div className="slider-wrapper">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={seats}
                                onChange={(e) => setSeats(parseInt(e.target.value))}
                                className="custom-slider"
                            />
                            <div className="slider-tooltip" style={{ left: `${seats}%` }}>
                                {seats}
                            </div>
                        </div>
                        <span className="slider-max">100</span>
                    </div>
                </div>

                <div className="additional-features-section">
                    <label className="section-label">Additional Features</label>
                    <div className="additional-features-list">
                        {additionalFeatures.map((feat) => (
                            <div key={feat.id} className="additional-feature-row">
                                <div className="key-side">
                                    <GripVertical size={16} className="drag-handle" />
                                    <span className="feat-key">{feat.key}</span>
                                </div>
                                <div className="value-side">
                                    <GripVertical size={16} className="drag-handle" />
                                    <span className="feat-value">{feat.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="add-feature-btn">
                        <Plus size={16} /> Add Features
                    </button>
                </div>

                <div className="fuel-type-section">
                    <label className="section-label">Fuel Type</label>
                    <div className="fuel-grid">
                        {['Petrol', 'Diesel', 'CNG', 'Hybrid'].map(type => (
                            <button
                                key={type}
                                className={`fuel-btn ${fuelType === type ? 'active' : ''}`}
                                onClick={() => setFuelType(type)}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="step-footer">
                <button className="next-btn accent" onClick={onNext}>Add car</button>
            </div>
        </div>
    );
};
