import React from 'react';
import PropTypes from 'prop-types';
 
const InlineError = ({ formErrors, className }) =>  (
    <div className={className}>an error: {formErrors}</div>
);

 InlineError.propTypes  = {
   formErrors: PropTypes.string
 }

export default InlineError;