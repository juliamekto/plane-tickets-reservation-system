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
      error: ''
  }

  handleInput = ({target: { name,value } }) => {

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
    const regExpEmailValidation = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const { email } = this.state;
    (regExpEmailValidation.test(email)) ? this.setState({ isEmailValid: true}) : this.setState({ isEmailValid: false});
  }

  validatePassword = () => {
    //password must contain alphabetical character and be not longer than 10 characters
    const regExpPasswordValidation = /^[a-z]{0,10}$/;
    let { password, error } = this.state;
    
    if(regExpPasswordValidation.test(password)) {
      error = "";
      this.setState ({ isPasswordValid: true, error}); 
    } else {
      error = "password mustn't be longer than 10 characters";
      this.setState ({ isPasswordValid: false, error});
    }
  }

  validateForm = () => {
    let { email, password, error, isPasswordValid, isEmailValid, isFormValid } = this.state;
    
    if ( !isPasswordValid || !isEmailValid ) {
      error = 'incorrect email or password';
      this.setState ({ isFormValid: false, error});
    } else if (password !== '' && email === '' ) {
      error = 'email field cannot be empty';
      this.setState ({ isFormValid: false, error});
    } else if (password === '' && email !== '' ){
      error = 'password field cannot be empty';
      this.setState ({ isFormValid: false, error});
    } else if (email === '' && password === ''){
      error = 'email and password fields cannot be empty';
      this.setState ({ isFormValid: false, error});
    } else {
      error = '';
      this.setState ({ isFormValid: true, error});
    }

    return isFormValid;
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    let { email, password} = this.state;
    let userLogData;
    
    if (this.validateForm() === true) {
        userLogData = { email, password };
    }

    return userLogData;
  }

  render() {
    const { email, password, error, isEmailValid, isPasswordValid } = this.state;

    const errorClass = classNames('inline-error',{
      'inline-error--show': error !== ''
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
       <InlineError className={errorClass} formErrors={this.state.error}/>
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
