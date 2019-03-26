import React, { Component } from 'react';
import { Link } from "react-router-dom";
import classNames from 'classnames/bind';
import Button from '../Button.jsx';
import FormInput from '../FormInput.jsx';
import InlineError from '../InlineError.jsx';
import './Authorization.css';

class AuthorizationForm extends Component {
    state = {
      email: '',
      password: '',
      isFormValid: false,
      isEmailValid: true,
      isPasswordValid: true,
      errors: ''
  }

  handleInput = (e) => {
    const name = e.target.name,
          value = e.target.value;

    if (name === 'email') {
      this.validateEmail();
    } else {
      this.validatePassword();
    }

    return this.setState({
      [name]: value
    });
  }

  validateEmail = () => {
    const regExpEmailValidation = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
          { email } = this.state;
    (regExpEmailValidation.test(email) === true) ? this.setState({ isEmailValid: true}) : this.setState({ isEmailValid: false});
  }

  validatePassword = () => {
    //password must contain alphabetical character and be not longer than 10 characters
    const regExpPasswordValidation = /^[a-z]{0,10}$/;
    let { password, errors } = this.state;
    
    if(regExpPasswordValidation.test(password) === true) {
      errors = "";
      this.setState ({ isPasswordValid: true, errors: errors}); 
    } else {
      errors = "password mustn't be longer than 10 characters";
      this.setState ({ isPasswordValid: false, errors: errors});
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    let { email, password, errors, isPasswordValid, isEmailValid } = this.state;
    
    const userLogData = {
        email: email,
        password: password
    };
    
    const userLogDataJson = JSON.stringify(userLogData);

    if (isPasswordValid === false && isEmailValid === false) {
      errors = 'email and password fields are invalid';
      this.setState ({ isFormValid: false, errors: errors});
    } else if (password !== '' && email === '' ) {
      errors = 'email field cannot be empty';
      this.setState ({ isFormValid: false, errors: errors});
    } else if (password === '' && email !== '' ){
      errors = 'password field cannot be empty';
      this.setState ({ isFormValid: false, errors: errors});
    } else if (email === '' && password === ''){
        errors = 'email and password fields cannot be empty';
        this.setState ({ isFormValid: false, errors: errors});
    } else {
      errors = '';
      this.setState ({ isFormValid: true, errors: errors});
    }
    
    return userLogDataJson;
  }

  render() {
    const { email, password, errors, isEmailValid, isPasswordValid } = this.state;

    const errorClass = classNames('inline-error',{
      'inline-error--show': errors !== ''
    }); 

    const inputClassEmail = classNames('default-input default-input--email',{
      'default-input--invalid': !isEmailValid
    }); 

    const inputClassPassword = classNames('default-input default-input--password',{
      'default-input--invalid': !isPasswordValid
    }); 
   
    return (
     <div className="authorization-form-wrapper">
       <h2 className="authorization-form__title"> Sign in </h2>
       <InlineError className={errorClass} formErrors={this.state.errors}/>
       <form className="authorization-form">
           <FormInput id="email"
                      name="email"
                      type="email" 
                      customClassName={inputClassEmail}
                      value={email}
                      placeholder="email" 
                      action={this.handleInput}
            />
           <FormInput id="password" 
                      name="password" 
                      type="password" 
                      placeholder="password"
                      customClassName={inputClassPassword}
                      value={password}
                      action={this.handleInput}   
            /> 
            <Link to="/flight-search" >
                <Button type="submit" 
                  caption="sign in" 
                  action={this.handleFormSubmit}
                />
          </Link>
       </form>
       <Link to="/registration" 
             className="form-link">
              or sign up
        </Link>
     </div>
   );
 }
}

export default AuthorizationForm;
