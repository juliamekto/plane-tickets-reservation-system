import React from 'react';
import PropTypes from 'prop-types';

const FormSelect = ({ name, className }) => (
    <select className={className}
            name={name} >
        <option value='FirstClass'>First Class</option>
        <option value='BusinessClass'>Business Class</option>
        <option value='EconomyClass'>Economy Class </option>
    </select>
);

FormSelect.propTypes  = {
  name: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string
}

FormSelect.defaultProps  = {
  className: 'default-select'
}

export default FormSelect;