import React, { Component } from 'react';
import './Authorization.css';
import FormInput from '../FormInput.jsx';
import Button from '../Button.jsx';


class AuthorizationForm extends Component {
  render() {
    return (
      <div className="authorization-form-wrapper">
        <h2>Sign in</h2>
        <form className="authorization-form">
            <FormInput name="text" type="email" placeholder="email"/>
            <FormInput name="password" type="password" placeholder="password"/>
            <Button type="submit" caption="sign in"/>
        </form>
        <a href="#">or sign up</a>
      </div>
    );
  }
}

export default AuthorizationForm;
