import React, { Component } from 'react';
import { Link } from "react-router-dom";
import classNames from 'classnames/bind';
import Button from '../Button.jsx';
import FormInput from '../FormInput.jsx';
import InlineError from '../InlineError.jsx';
import './Authorization.css';

const REG_EXP_EMAIL_VALIDATION = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      REG_EXP_PASSWORD_VALIDATION = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

class AuthorizationForm extends Component {
    state = {
      email: '',
      password: '',
      isFormValid: false,
      isEmailValid: true,
      isPasswordValid: true,
      error: ''
  }

  handleInput = ({ target: { name, value } }) => {
    if (name === 'email') {
      this.validateEmail(value);
    } else {
      this.validatePassword(value);
    }
  }

  validateEmail = (value) => {
    (REG_EXP_EMAIL_VALIDATION.test(value)) ? this.setState({ isEmailValid: true, email: value}) : this.setState({ isEmailValid: false});
  }

  validatePassword = (value) => {
    //Minimum eight characters, at least one letter and one number:
    let { error } = this.state;
    
    if(!REG_EXP_PASSWORD_VALIDATION.test(value)) {
      error = "password must be longer than 6 characters and contain at least 1 letter and 1 number";
      this.setState ({ isPasswordValid: false, error });
      return;
    }

    this.setState ({ isPasswordValid: true, password: value, error: '' }); 
  }

  isFormValid = () => {
    let { email, password, error, isPasswordValid, isEmailValid, isFormValid } = this.state;
    
    if (!isPasswordValid || !isEmailValid) {
      error = 'incorrect email or password';
      this.setState ({ isFormValid: false, error });
    } else if (password !== '' && email === '') {
      error = 'email field cannot be empty';
      this.setState ({ isFormValid: false, error });
    } else if (password === '' && email !== '') {
      error = 'password field cannot be empty';
      this.setState ({ isFormValid: false, error });
    } else if (email === '' && password === '') {
      error = 'email and password fields cannot be empty';
      this.setState ({ isFormValid: false, error });
    } else {
      isFormValid = true;
      error = '';
      this.setState ({ isFormValid, error});
    }

    return isFormValid;
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    let { email, password } = this.state;
    let userLogData;
    
    if (this.isFormValid()) {
        userLogData = { email, password };
        window.location.href = 'flight-search';
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
     <div className="authorization">
       <h2 className="authorization__title">Sign in</h2>
       <InlineError className={errorClass} formErrors={error}/>
       <form className="authorization__form">
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
            <Button className="button button--auth-form-btn"
                    type="submit" 
                    caption="sign in" 
                    action={this.handleFormSubmit}
            />
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
