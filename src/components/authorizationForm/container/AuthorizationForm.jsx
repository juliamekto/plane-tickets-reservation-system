import React, { Component } from 'react';
import { Link, withRouter  } from "react-router-dom";
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import firebaseConfig from '../../firebase/firebase.js';
import classNames from 'classnames/bind';
import Button from '../../Button.jsx';
import FormInput from '../../FormInput.jsx';
import InlineError from '../../InlineError.jsx';
import UserNotification from '../../userNotification/UserNotification.jsx';
import { signIn } from '../actions/AuthFormActions.js'

const REG_EXP_EMAIL_VALIDATION = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const REG_EXP_PASSWORD_VALIDATION = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

class AuthorizationForm extends Component {
  state = {
      isFormValid: false,
      isEmailValid: true,
      isPasswordValid: true,
      error: '',
      isLoading: false
    }

componentDidMount() {
    firebaseConfig.auth().onAuthStateChanged(user => {
      if (user) {
         const userId = user.uid;
          this.setState({
              authenticated: true,
              userId
          });
      } else {
          this.setState({
              authenticated: false
          });
      }
    });
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

  handleNotificationBtn = () => {
    const { userId } = this.state;
    this.props.history.push(`/flight-search/${userId}`);
  }

  isFormValid = () => {
    let { error, isPasswordValid, isEmailValid, isFormValid } = this.state;
    const { email, password } = this.props.authForm;
    
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

  handleFormSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.props.authForm;
    
    if (this.isFormValid()) {
        try {
          const user = await firebaseConfig.auth().signInWithEmailAndPassword(email, password);
          const userId =  user.user.uid;
            
          firebaseConfig.database().ref(`/users/${userId}/data`).update({
              "id": userId
          });
          this.setState ({ isLoading: true });
          setTimeout(() => {
             this.props.history.push(`/flight-search/${userId}`)
          }, 2000);
          
        } catch (error) {
          this.setState ({ error: error.message });
        }
    }
  }

  render() {
    const { email, password, error, isEmailValid, isPasswordValid, authenticated, isLoading } = this.state;

    const errorClass = classNames('inline-error',{
      'inline-error--show': error
    }); 

    const inputClassEmail = classNames('default-input default-input--email',{
      'default-input--invalid': !isEmailValid
    }); 

    const inputClassPassword = classNames('default-input default-input--password',{
      'default-input--invalid': !isPasswordValid
    }); 

    if (authenticated) {    
      if(isLoading) {
        return <ReactLoading className="loading-spinner" type="spin" color='#fff' height={50} width={50} />;
      } 
      return <UserNotification mainText='You have already been authorized :)' btnCaption="search the flights" btnAction={this.handleNotificationBtn}/>
    } else {
      if(isLoading) {
        return <ReactLoading className="loading-spinner" type="spin" color='#fff' height={50} width={50} />;
      } else {
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
            <Link to="registration" 
                  className="form-link">
                  or sign up
            </Link>
          </div>
        );
      }
    }
 }
}


const mapStateToProps = state => ({ authForm: state.authForm });

const mapDistpatchToProps = dispatch => {
  return {
    onChangeEmail: value => dispatch(signIn( 'email', value )),
    onChangePassword: value => dispatch(signIn( 'password', value ))
  }
};

export default connect(mapStateToProps, mapDistpatchToProps)(withRouter(AuthorizationForm));