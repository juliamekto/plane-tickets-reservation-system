import React from 'react';
import './Modal.css';

const Modal = ({ handleClose, show, children }) => {
const showHideClassName = show ? "modal show" : "modal hide";
    
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
        </section>
      </div>
    );

  };

export default Modal;