import React, { Component } from 'react';

class Button extends Component {

    render() {
      return (
         <button className="button" type={this.props.type} value={this.props.value} name={this.props.name}>{this.props.caption}</button>
      );
    }
  }
  
  export default Button;