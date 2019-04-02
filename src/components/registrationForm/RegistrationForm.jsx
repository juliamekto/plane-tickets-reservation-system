import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { Link } from "react-router-dom";
import FormInput from '../FormInput.jsx';
import Button from '../Button.jsx';
import Modal from '../modal/Modal.jsx';
import InlineError from '../InlineError.jsx';
import './RegistrationForm.css';

const REG_EXP_EMAIL_VALIDATION = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      REG_EXP_PASSWORD_VALIDATION = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      REG_EXP_USERNAME_VALIDATION = /^[a-z0-9_-]{3,16}$/,
      REG_EXP_FULLNAME_VALIDATION = /^([a-zA-Z' ]+)$/;

class RegistrationForm extends Component {
  state = {
    isModalShown: false,
    isCheckboxChecked: false,
    isFormValid: false,
    isEmailValid: true,
    isRepeatedPasswordValid: true,
    isPasswordValid: true,
    isUsernameValid: true,
    isFullNameValid: true,
    fullName: '',
    username: '',
    email: '',
    password: '',
    repeatedPassword: '',
    error: ''
  }

  handleInput = ({ target: { name,value } }) => {
    if (name === 'fullName') {
      this.validateFullName(value);
    } else if (name === 'username') {
      this.validateUsername(value);
    } else if (name === 'email') {
      this.validateEmail(value);
    } else if (name === 'password') {
      this.validatePassword(value);
    } else {
      this.validateRepeatedPassword(value);
    }  
  }

  validateEmail = (value) => {
    let { error } = this.state;

    if(!REG_EXP_EMAIL_VALIDATION.test(value)) {
      error = "Invalid email";
      this.setState ({ isEmailValid: false, error });
    }

    this.setState ({ isEmailValid: true, email: value, error: '' }); 
  }

  validatePassword = (value) => {
    //Minimum eight characters, at least one letter and one number:
    let { error } = this.state;
    
    if(!REG_EXP_PASSWORD_VALIDATION.test(value)) {
      error = "password must be longer than 6 characters and contain at least 1 letter and 1 number";
      this.setState ({ isPasswordValid: false, error });
    }

    this.setState ({ isPasswordValid: true, password: value, error: '' }); 
  }

  validateRepeatedPassword = (value) => {
    let { password, repeatedPassword, error } = this.state;
    if (password !== repeatedPassword) {
      error = "please, repeat password correctly";
      this.setState ({ isRepeatedPasswordValid: false, error });
    }

    this.setState ({ isRepeatedPasswordValid: true, repeatedPassword: value, error: '' }); 
  }

  validateUsername = (value) => {
    //Alphanumeric string that may include _ and – having a length of 3 to 16 characters
    let { error } = this.state;

    if(!REG_EXP_USERNAME_VALIDATION.test(value)) {
      error = "username must be between 3 and 10 characters";
      this.setState ({ isUsernameValid: false, error });
    }

    this.setState ({ isUsernameValid: true, username: value, error: '' }); 
  }

  validateFullName = (value) => {
    // string that may include only letters and spaces
    let { error } = this.state;

    if(!REG_EXP_FULLNAME_VALIDATION.test(value)) {
      error = "only letters and spaces can be entered";
      this.setState ({ isFullNameValid: false, error });
    }

    this.setState ({ isFullNameValid: true, fullName: value, error: '' }); 
  }

  isFormValid = () => {
    let { error, isEmailValid, isPasswordValid, isRepeatedPasswordValid, 
          isUsernameValid, isFullNameValid, isFormValid, isCheckboxChecked,
          email, password, repeatedPassword, fullName, username } = this.state;
    
    if ( !isPasswordValid || !isEmailValid || !isRepeatedPasswordValid || !isUsernameValid || !isFullNameValid ) {
      error = 'Invalid form. Please, check the information once again';
      this.setState ({ isFormValid: false, error });
    } else if (  email === '' || password === '' || repeatedPassword === '' || fullName === '' || username  === '' ) {
      error = 'Form fields cannot be empty';
      this.setState ({ isFormValid: false, error });
    } else if ( isCheckboxChecked === false ) {
      error = 'Do you agree to the terms and conditions?';
      this.setState ({ error });
    } else {
      error = '';
      isFormValid = true;
      this.setState ({ isFormValid, error });
    }

    return isFormValid;
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    let { email, password, fullName, username } = this.state;
    let newUserLogData;

    if (this.isFormValid()) {
      newUserLogData = { email, password, fullName, username };
      //clear form fields and state
      this.setState ({ email: '', password: '', fullName: '', username: '' });
      this.showModal();
    } 
   
    return newUserLogData;
  }

  showModal = () => {
      this.setState ({ isModalShown: true });
  }

  hideModal = () => this.setState({ isModalShown : false });

  handleCheckboxClick= () => this.setState(({ isCheckboxChecked }) => ( { isCheckboxChecked: !isCheckboxChecked }));
  

  render() {
    const { isModalShown, isEmailValid, isPasswordValid, isRepeatedPasswordValid, error, isUsernameValid, isFullNameValid, isCheckboxChecked } = this.state;

    const errorClass = classNames('inline-error',{
      'inline-error--show': error !== ''
    }); 

    const checkBoxClass = classNames('checkmark',{
      'checkmark--checked': isCheckboxChecked
    });

    const inputClassEmail = classNames('default-input default-input--email',{
      'default-input--invalid': !isEmailValid
    }); 

    const inputClassPass = classNames('default-input default-input--password',{
      'default-input--invalid': !isPasswordValid
    }); 

    const inputClassRepeatedPass = classNames('default-input default-input--password',{
      'default-input--invalid': !isRepeatedPasswordValid
    }); 

    const inputClassUsername = classNames('default-input default-input--password',{
      'default-input--invalid': !isUsernameValid
    }); 

    const inputClassFullName = classNames('default-input default-input--password',{
      'default-input--invalid': !isFullNameValid
    }); 

    return (
      <React.Fragment>
         <div className="registration-form-wrapper">
           <h2 className="registration-form-wrapper__title">Sign Up</h2>
           <InlineError className={errorClass} formErrors={error}/>
           <form className="registration-form">
               <FormInput  id="fullName" 
                           name="fullName" 
                           type="text" 
                           placeholder="full name"
                           customClassName={inputClassFullName}
                           action={this.handleInput}/> 
               <FormInput  id="username" 
                           name="username" 
                           type="text"
                           placeholder="username"
                           customClassName={inputClassUsername}
                           action={this.handleInput}/> 
               <FormInput id="email" 
                           name="email" 
                           type="email" 
                           customClassName={inputClassEmail}
                           placeholder="email" 
                           action={this.handleInput}/>
               <FormInput id="password" 
                           name="password" 
                           type="password" 
                           placeholder="password"
                           customClassName={inputClassPass}
                           action={this.handleInput}/> 
               <FormInput  id="repeatedPassword" 
                           name="repeatedPassword" 
                           type="password" 
                           placeholder="repeat password"
                           customClassName={inputClassRepeatedPass}
                           action={this.handleInput}/> 
               <Button type="submit" 
                       className="button button--registration-form-btn"
                       caption="sign up"
                       action={this.handleFormSubmit}/>
           </form>
           <div className="privacy-policy">
               <label className="privacy-policy__container"  
                      onClick={this.handleCheckboxClick}>
                <span className={checkBoxClass}
                      tabIndex="0" 
                      role="checkbox" 
                      aria-checked="true">
                </span>
               </label>
               <span className="privacy-policy__caption">I agree to the terms and conditions</span>
           </div>
           <Link to="/authorization" className="form-link"> i already have an account </Link>
         </div>
         <Modal show={isModalShown} 
                handleClose={this.hideModal}
                modalMainClass="modal-main--greeting">
              <div className="modal-greeting">
                  <span className="modal-greeting__title">Great!</span>
                  <span className="modal-greeting__text">You've been successfully registered!</span>
              </div>
              <div className="modal__img-wrapper"></div>
              <Link to="/flight-search" className="modal__route-link" onClick={this.hideModal}>
                  <Button caption="start"/>
              </Link>
        </Modal>
      </React.Fragment>
    );
  }
}

export default RegistrationForm;