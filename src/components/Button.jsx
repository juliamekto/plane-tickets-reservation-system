import React from 'react';
import PropTypes from 'prop-types';

const Button = ({type, name, action, caption,className}) => {
  return (
    <button className={className} 
            type={type}  
            name={name}
            onClick={action}>
            {caption}
    </button>
  );
}

Button.propTypes  = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
  caption: PropTypes.string.isRequired,
  action: PropTypes.func
}

Button.defaultProps  = {
  type: 'button',
  name: 'button',
  caption: 'button',
  className:'button'
}

export default Button;