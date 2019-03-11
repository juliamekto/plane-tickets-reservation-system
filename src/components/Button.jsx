import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  return (
    <button className="button" 
            type={props.type}  
            name={props.name} 
    >
    {props.caption}
    </button>
  );
}

Button.propTypes  = {
  type: PropTypes.string,
  name: PropTypes.string,
  caption: PropTypes.string
}

Button.defaultProps  = {
  type: 'button',
  name: 'button',
  caption: 'button'
}

export default Button;