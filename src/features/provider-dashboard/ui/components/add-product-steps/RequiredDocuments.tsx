import React from 'react';
import { Upload, FileText, CheckCircle2, Trash2 } from 'lucide-react';

interface RequiredDocumentsProps {
    onNext: () => void;
}

export const RequiredDocuments: React.FC<RequiredDocumentsProps> = ({ onNext }) => {
    const documents = [
        { id: 'pan', name: 'PAN Card', status: 'pending' },
        { id: 'id', name: 'ID Proof (Aadhaar)', status: 'pending' },
        { id: 'insurance', name: 'Vehicle Insurance', status: 'pending' },
        { id: 'rc', name: 'RC Document', status: 'uploaded', filename: '45678543-87654-876.5433-rcDOC...' },
    ];

    return (
        <div className="step-content">
            <div className="section-header-row justify-between">
                <h2 className="section-title">Required Documents</h2>
                <button className="text-primary text-sm font-600">Delete All</button>
            </div>

            <div className="doc-list mt-6 space-y-4">
                {documents.map(doc => (
                    <div key={doc.id} className="doc-card">
                        <div className="doc-info">
                            <div className={`doc-icon-box ${doc.status === 'uploaded' ? 'success' : 'pending'}`}>
                                {doc.status === 'uploaded' ? <CheckCircle2 size={20} /> : <FileText size={20} />}
                            </div>
                            <div className="doc-text">
                                <span className="doc-name">{doc.name}</span>
                                {doc.filename && <span className="doc-filename">{doc.filename}</span>}
                            </div>
                        </div>

                        {doc.status === 'uploaded' ? (
                            <button className="doc-delete-btn">
                                <Trash2 size={20} />
                            </button>
                        ) : (
                            <button className="doc-upload-btn">
                                <Upload size={18} /> Upload
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className="step-footer">
                <button className="next-btn" onClick={onNext}>Next</button>
            </div>
        </div>
    );
};
