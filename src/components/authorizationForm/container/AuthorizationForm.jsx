import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import firebase from 'firebase';
import config from '../../firebase/firebase.js';
import classNames from 'classnames/bind';
import Button from '../../Button.jsx';
import FormInput from '../../FormInput.jsx';
import InlineError from '../../InlineError.jsx';
import { signIn } from '../actions/AuthFormActions.js'

const REG_EXP_EMAIL_VALIDATION = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const REG_EXP_PASSWORD_VALIDATION = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

class AuthorizationForm extends Component {
  constructor(props){
    super(props);
    firebase.initializeApp(config);
    
    this.state = {
      isFormValid: false,
      isEmailValid: true,
      isPasswordValid: true,
      error: '',
      sss: ''
    }
  }

  handleInput = ({ target: { name, value } }) => {
    if (name === 'email') {
      this.validateEmail(value);
    } else {
      this.validatePassword(value);
    }
  }

  validateEmail = (value) => {
    (REG_EXP_EMAIL_VALIDATION.test(value)) ? this.setState({ isEmailValid: true}) : this.setState({ isEmailValid: false});
    this.props.onChangeEmail(value);
  }

  validatePassword = (value) => {
    //Minimum eight characters, at least one letter and one number:
    let { error } = this.state;
    
    if(!REG_EXP_PASSWORD_VALIDATION.test(value)) {
      error = "password must be longer than 6 characters and contain at least 1 letter and 1 number";
      this.setState ({ isPasswordValid: false, error });
      return;
    }
    this.props.onChangePassword(value)
    this.setState ({ isPasswordValid: true, password: value, error: '' }); 
  }

  isFormValid = () => {
    let { error, isPasswordValid, isEmailValid, isFormValid } = this.state;
    let { email, password } = this.props.authForm;
    
    if (!isPasswordValid || !isEmailValid) {
      error = 'incorrect email or password';
      this.setState ({ isFormValid: false, error });
    } else if (password !== undefined && email === undefined) {
      error = 'email field cannot be empty';
      this.setState ({ isFormValid: false, error });
    } else if (password === undefined && email !== undefined) {
      error = 'password field cannot be empty';
      this.setState ({ isFormValid: false, error });
    } else if (email === undefined && password === undefined) {
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
    const { email, password } = this.props.authForm;
  
  
    
    if (this.isFormValid()) {
       
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            console.log(error.message);
          // window.location.href = 'flight-search';
        });
       
    }

  }

  render() {
    const { email, password, error, isEmailValid, isPasswordValid } = this.state;

    const errorClass = classNames('inline-error',{
      'inline-error--show': error
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


const mapStateToProps = state => ({ authForm: state.authForm });

const mapDistpatchToProps = dispatch => {
  return {
    onChangeEmail: value => dispatch(signIn( 'email', value )),
    onChangePassword: value => dispatch(signIn( 'password', value ))
  }
};

export default connect(mapStateToProps, mapDistpatchToProps)(AuthorizationForm);