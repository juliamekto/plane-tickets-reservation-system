import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { Link } from "react-router-dom";
import FormInput from '../FormInput.jsx';
import Button from '../Button.jsx';
import Modal from '../modal/Modal.jsx';
import InlineError from '../InlineError.jsx';
import './RegistrationForm.css';


class RegistrationForm extends Component {
  state = {
    isModalShown: false,
    isCheckboxHovered: false,
    isCheckboxChecked: false,
    isPrivatePolicyChecked: false,
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

  handleInput = ({target: { name,value } }) => {
    if (name === 'fullName') {
      this.validateFullName();
    } else if (name === 'username'){
      this.validateUsername();
    } else if (name === 'email'){
      this.validateEmail();
    } else if (name === 'password'){
      this.validatePassword();
    } else {
      this.validateRepeatedPassword();
    }  
    
    return this.setState({
      [name]: value
    });
  }

  validateEmail = () => {
    const regExpEmailValidation = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    let { email, error } = this.state;

    if(regExpEmailValidation.test(email)) {
      error = "";
      this.setState ({ isEmailValid: true, error}); 
    } else {
      error = "Invalid email";
      this.setState ({ isEmailValid: false, error});
    }
  }

  validatePassword = () => {
    //Minimum eight characters, at least one letter and one number:
    const regExpPasswordValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    let { password, error } = this.state;
    
    if(regExpPasswordValidation.test(password)) {
      error = "";
      this.setState ({ isPasswordValid: true, error}); 
    } else {
      error = "password must be longer than 6 characters and contain at least 1 letter and 1 number";
      this.setState ({ isPasswordValid: false, error});
    }
  }

  validateRepeatedPassword = () => {
    let {password, repeatedPassword, error} = this.state;
    if (password !== repeatedPassword) {
      error = "please, repeat password correctly";
      this.setState ({ isRepeatedPasswordValid: false, error});
    } else {
      error = "";
      this.setState ({ isRepeatedPasswordValid: true, error}); 
    }
  }

  validateUsername = () => {
    //Alphanumeric string that may include _ and – having a length of 3 to 16 characters
    const regExpUsernameValidation = /^[a-z0-9_-]{3,16}$/;
    let { username, error } = this.state;

    if(regExpUsernameValidation.test(username)) {
      error = "";
      this.setState ({ isUsernameValid: true, error}); 
    } else {
      error = "username must be between 3 and 10 characters";
      this.setState ({ isUsernameValid: false, error});
    }
  }

  validateFullName = () => {
    // string that may include only letters and spaces
    const regExpUsernameValidation = /^([a-zA-Z' ]+)$/;
    let { error, fullName } = this.state;

    if(regExpUsernameValidation.test(fullName)) {
      error = "";
      this.setState ({ isFullNameValid: true, error}); 
    } else {
      error = "only letters and spaces can be entered";
      this.setState ({ isFullNameValid: false, error});
    }
  }

  validateForm = () => {
    let { error, isEmailValid, isPasswordValid, isRepeatedPasswordValid, isUsernameValid, isFullNameValid, isFormValid, isPrivatePolicyChecked } = this.state;
    let { email, password, repeatedPassword, fullName, username } = this.state;
    
    if ( !isPasswordValid || !isEmailValid || !isRepeatedPasswordValid || !isUsernameValid || !isFullNameValid) {
      error = 'Invalid form. Please,check the information once again';
      this.setState ({ isFormValid: false, error});
    } else if (  email === '' || password === '' || repeatedPassword === '' || fullName === '' || username  === '') {
      error = 'Form fields cannot be empty';
      this.setState ({ isFormValid: false, error});
    }  else if(isPrivatePolicyChecked === false) {
      error = 'Do you agree to the terms and conditions?';
      this.setState ({error});
    } else {
      error = '';
      this.setState ({ isFormValid: true, error});
    }

    return isFormValid;
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    let {email, password, fullName, username} = this.state;
    let newUserLogData;

    if (this.validateForm() === true) {
      newUserLogData = {email, password, fullName, username};
      //clear form fields and state
      this.setState ({ email: '', password: '', fullName: '', username: ''});
      this.showModal();
    } 
   
    return newUserLogData;
  }

  showModal = () => {
      this.setState ({ isModalShown: true});
  }

  hideModal = () => this.setState({isModalShown : false});

  handleCheckboxHover = () => this.setState(({ isCheckboxHovered }) => ( { isCheckboxHovered: !isCheckboxHovered }));

  handleCheckboxClick= () => this.setState(({ isCheckboxChecked, isPrivatePolicyChecked  }) => ( { isCheckboxChecked: !isCheckboxChecked, isPrivatePolicyChecked: !isPrivatePolicyChecked }));
  

  render() {
    const {isModalShown, isEmailValid, isPasswordValid, isRepeatedPasswordValid, error, isUsernameValid, isFullNameValid} = this.state;

    const errorClass = classNames('inline-error',{
      'inline-error--show': error !== ''
    }); 

    const checkBoxClass = classNames('checkmark',{
      'checkmark--hovered': this.state.isCheckboxHovered ,
      'checkmark--checked': this.state.isCheckboxChecked
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
           <InlineError className={errorClass} formErrors={this.state.error}/>
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
                      onMouseEnter={this.handleCheckboxHover} 
                      onMouseLeave={this.handleCheckboxHover} 
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