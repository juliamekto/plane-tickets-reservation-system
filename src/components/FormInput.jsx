import React from 'react';
import PropTypes from 'prop-types';

const AuthorizationForm = ({name, type, placeholder,action}) => {
  return (
    <input className="default-input" 
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
  placeholder: ''
}

export default AuthorizationForm;