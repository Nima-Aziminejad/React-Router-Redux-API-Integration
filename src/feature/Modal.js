import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal">
                <button className="custom-modal-close" onClick={onClose}>
                    &times;
                </button>
                <div className="custom-modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;