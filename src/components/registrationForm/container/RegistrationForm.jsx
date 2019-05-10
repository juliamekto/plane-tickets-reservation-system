import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import firebaseConfig from '../../firebase/firebase.js';
import FormInput from '../../FormInput.jsx';
import Button from '../../Button.jsx';
import Modal from '../../modal/Modal.jsx';
import InlineError from '../../InlineError.jsx';
import { signUp } from '../actions/RegistrationFormActions.js';

const REG_EXP_EMAIL_VALIDATION = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const REG_EXP_PASSWORD_VALIDATION = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
const REG_EXP_USERNAME_VALIDATION = /^[a-z0-9_-]{3,16}$/;
const REG_EXP_FULLNAME_VALIDATION = /^([a-zA-Z' ]+)$/;

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
        repeatedPassword: '',
        error: ''
    }

  handleInput = ({ target: { name, value } }) => {
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

  validateEmail = value => {
    let { error } = this.state;

    if(!REG_EXP_EMAIL_VALIDATION.test(value)) {
      error = "Invalid email";
      this.setState ({ isEmailValid: false, error });
      return;
    }

    this.props.onChangeEmail(value);
    this.setState ({ isEmailValid: true, error: '' }); 
  }

  validatePassword = value => {
    //Minimum eight characters, at least one letter and one number:
    let { error } = this.state;
    
    if(!REG_EXP_PASSWORD_VALIDATION.test(value)) {
      error = "password must be longer than 6 characters and contain at least 1 letter and 1 number";
      this.setState ({ isPasswordValid: false, error });
      return;
    }

    this.props.onChangePassword(value);
    this.setState ({ isPasswordValid: true, error: '' }); 
  }

  validateRepeatedPassword = value => {
    let { error } = this.state;
    let { password } = this.props.registrationForm;
   
    if( password !== value) {
      error = "please, repeat password correctly";
      this.setState ({ isRepeatedPasswordValid: false, error });
      return;
    }

    this.setState ({ isRepeatedPasswordValid: true, repeatedPassword: value, error: '' }); 
  }

  validateUsername = value => {
    //Alphanumeric string that may include _ and – having a length of 3 to 16 characters
    let { error } = this.state;

    if(!REG_EXP_USERNAME_VALIDATION.test(value)) {
      error = "username must be between 3 and 10 characters";
      this.setState ({ isUsernameValid: false, error });
      return;
    }

    this.props.onChangeUsername(value);
    this.setState ({ isUsernameValid: true, error: '' }); 
  }

  validateFullName = value => {
    // string that may include only letters and spaces
    let { error } = this.state;

    if(!REG_EXP_FULLNAME_VALIDATION.test(value)) {
      error = "only letters and spaces can be entered";
      this.setState ({ isFullNameValid: false, error });
      return;
    }

    this.props.onChangeFullName(value);
    this.setState ({ isFullNameValid: true, error: '' }); 
  }

  isFormValid = () => {
    let { error, isEmailValid, isPasswordValid, isRepeatedPasswordValid, 
          isUsernameValid, isFullNameValid, isFormValid, isCheckboxChecked,
          repeatedPassword } = this.state;
    const { email, password, fullName, username } = this.props.registrationForm;  
    
    if (!isPasswordValid || !isEmailValid || !isRepeatedPasswordValid || !isUsernameValid || !isFullNameValid) {
      error = 'Invalid form. Please, check the information once again';
      this.setState ({ isFormValid: false, error });
    } else if (email === undefined || password === undefined || repeatedPassword === undefined || fullName === undefined || username  === undefined) {
      error = 'Form fields cannot be empty';
      this.setState ({ isFormValid: false, error });
    } else if (isCheckboxChecked === false) {
      error = 'Do you agree to the terms and conditions?';
      this.setState ({ error });
    } else {
      error = '';
      isFormValid = true;
      this.setState ({ isFormValid, error });
    }

    return isFormValid;
  }

  handleFormSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.props.registrationForm;
   
    if (this.isFormValid()) {
      try {
        const user = await firebaseConfig.auth().createUserWithEmailAndPassword(email, password);
        const userId =  user.user.uid;
            
        firebaseConfig.database().ref(`/users/${userId}/data`).set({
            "id": userId
        });

        this.showModal();
      } catch (error) {
        this.setState ({ error: error.message });
      }
    } 

  }

  showModal = () => {
      this.setState ({ isModalShown: true });
  }

  hideModal = () => this.setState({ isModalShown : false });

  handleCheckboxClick= () => this.setState(({ isCheckboxChecked }) => ( { isCheckboxChecked: !isCheckboxChecked }));
  

  render() {
    const { isModalShown, isEmailValid, isPasswordValid, isRepeatedPasswordValid, error, isUsernameValid, isFullNameValid, isCheckboxChecked } = this.state;

    const errorClass = classNames('inline-error',{
      'inline-error--show': error
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
         <div className="registration">
           <h2 className="registration__title">Sign Up</h2>
           <InlineError className={errorClass} formErrors={error}/>
           <form className="registration___form">
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

const mapStateToProps = state => ({ registrationForm: state.registrationForm });

const mapDistpatchToProps = dispatch => {
  return {
    onChangeEmail: value => dispatch(signUp( 'email', value )),
    onChangePassword: value => dispatch(signUp( 'password', value )),
    onChangeFullName: value => dispatch(signUp( 'fullName', value )),
    onChangeUsername: value => dispatch(signUp( 'username', value ))
  }
};

export default connect(mapStateToProps, mapDistpatchToProps)(RegistrationForm);