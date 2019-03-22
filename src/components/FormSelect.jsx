import React from 'react';
import PropTypes from 'prop-types';

const AuthorizationForm = ({name, className}) => {
  return (
    <select className={className}
            name={name} >
        <option value='FirstClass'>First Class</option>
        <option value='BusinessClass'>Business Class</option>
        <option value='EconomyClass'>Economy Class </option>
    </select>
  );
}

AuthorizationForm.propTypes  = {
  name: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string
}

AuthorizationForm.defaultProps  = {
  className: 'default-select'
}

export default AuthorizationForm;