import React from 'react';
import classNames from 'classnames/bind';
import './Modal.css';

const Modal = ({ handleClose, show, children, modalMainClass }) => {

const showHideClassName = classNames('modal',{
  'modal--show': show 
});

    return (
      <div className={showHideClassName}>
        <section className={modalMainClass}>
          {children}
        </section>
      </div>
    );

  };

export default Modal;