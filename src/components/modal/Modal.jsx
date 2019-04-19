import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './Modal.css';

const Modal = ({ show, children, modalMainClass }) => {
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

Modal.propTypes  = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.array.isRequired,
  modalMainClass: PropTypes.string
}

Modal.defaultProps = {
  show: false
}

export default Modal;