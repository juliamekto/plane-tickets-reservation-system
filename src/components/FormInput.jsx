import React from 'react';
import PropTypes from 'prop-types';

const AuthorizationForm = ({name, type, placeholder,action,customClassName}) => {
  return (
    <input className={customClassName} 
           name={name} 
           type={type}
           placeholder={placeholder}
           onChange={action}
    />
  );
}

AuthorizationForm.propTypes  = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  action: PropTypes.func
}

AuthorizationForm.defaultProps  = {
  name: 'text',
  type: 'text',
  placeholder: '',
  customClassName: 'default-input'
}

export default AuthorizationForm;