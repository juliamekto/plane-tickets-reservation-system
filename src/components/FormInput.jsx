import React from 'react';
import PropTypes from 'prop-types';

const AuthorizationForm = (props) => {
  return (
    <input className="default-input" 
           name={props.name} 
           type={props.type}
           placeholder={props.placeholder}
    />
  );
}

AuthorizationForm.propTypes  = {
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string
}

AuthorizationForm.defaultProps  = {
  name: 'text',
  type: 'text',
  placeholder: ''
}
export default AuthorizationForm;