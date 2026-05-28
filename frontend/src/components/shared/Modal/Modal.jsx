// components/private/Modal/Modal.jsx
import React from "react";
import "./Modal.css";

const Modal = ({ children, onClose }) => {
    return (
        <div className="modal__overlay" onClick={onClose}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;