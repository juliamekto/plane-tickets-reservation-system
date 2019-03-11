import React from 'react';
import PropTypes from 'prop-types';

const Button = ({type, name, handleClick, caption}) => {
  return (
    <button className="button" 
            type={type}  
            name={name}
            onClick={handleClick}
    >
    {caption}
    </button>
  );
}


Button.propTypes  = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  caption: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

Button.defaultProps  = {
  type: 'button',
  name: 'button',
  caption: 'button'
}

export default Button;