import React from 'react';
import PropTypes from 'prop-types';

const FormSelect = ({ name, className, action }) => (
    <select className={className}
            name={name} 
            onChange={action}>
        <option value='default'>Choose class seats</option>
        <option value='FirstClass'>First Class</option>
        <option value='BusinessClass'>Business Class</option>
        <option value='EconomyClass'>Economy Class </option>
    </select>
);

FormSelect.propTypes  = {
  name: PropTypes.string,
  value: PropTypes.string,
  action: PropTypes.func,
  className: PropTypes.string
}

FormSelect.defaultProps  = {
  className: 'default-select'
}

export default FormSelect;