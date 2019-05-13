import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({ name, type, placeholder, action, customClassName, value }) => (
    <input className={customClassName} 
           name={name} 
           type={type}
           placeholder={placeholder}
           onChange={action} 
           onKeyUp={action} />
);

FormInput.propTypes  = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  action: PropTypes.func,
  customClassName: PropTypes.string
}

FormInput.defaultProps  = {
  name: 'text',
  type: 'text',
  placeholder: '',
  customClassName: 'default-input'
}

export default FormInput;