import React, { Component } from 'react';

class AuthorizationForm extends Component {
  render() {
    return (
      <div className = "AuthorizationForm-wrapper">
        <h2>Sign in</h2>
        <form>
            <input placeholder="username or email"/>
            <input placeholder="password"/>
        </form>
      </div>
    );
  }
}

export default AuthorizationForm;
