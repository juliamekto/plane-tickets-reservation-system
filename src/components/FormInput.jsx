import React, { Component } from 'react';

class AuthorizationForm extends Component {

    render() {
      return (
         <input className="default-input" name={this.props.name} type={this.props.type} placeholder={this.props.placeholder}/>
      );
    }
  }
  
  export default AuthorizationForm;