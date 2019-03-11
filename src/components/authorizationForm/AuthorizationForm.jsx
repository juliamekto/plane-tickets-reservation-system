import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Button from '../Button.jsx';
import FormInput from '../FormInput.jsx';
// import InlineErrors from '../InlineError.jsx';
import './Authorization.css';

class AuthorizationForm extends Component {
  // constructor (props) {
  //   super(props);
  //   this.state = {
  //     email: "",
  //     password: '',
  //     formErrors: {email: '', password: ''},
  //     emailValid: false,
  //     passwordValid: false,
  //     formValid: false
  //   }
  // }

  // handleUserInput = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   this.setState({
  //     [name]: value
  //   },
  //     () => { this.validateField(name, value) });
  // }


  // validateField(fieldName, value) {
  //   let fieldValidationErrors = this.state.formErrors;
  //   let emailValid = this.state.emailValid;
  //   let passwordValid = this.state.passwordValid;

  //   switch(fieldName) {
  //     case 'email':
  //       emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  //       fieldValidationErrors.email = emailValid ? '' : ' is invalid';
  //       break;
  //     case 'password':
  //       passwordValid = value.length >= 6;
  //       fieldValidationErrors.password = passwordValid ? '': ' is too short';
  //       break;
  //     default:
  //       break;
  //   }
  //   this.setState(
  //     {
  //       formErrors: fieldValidationErrors,
  //       emailValid: emailValid,
  //       passwordValid: passwordValid
  //     }, 
  //     this.validateForm);
  // }

  // validateForm() {
  //   this.setState({
  //     formValid: this.state.emailValid && this.state.passwordValid});
  // }

  // errorClass(error) {
  //   return(error.length === 0 ? '' : 'has-error');
  // }

  onLog () {
    console.log('объект:', this);
  }
  render() {
   return (
     <div className="authorization-form-wrapper">
       <h2 className="authorization-form-wrapper__title"> Sign in </h2>
       <form className="authorization-form">
           <FormInput id="email"
                      name="email"
                      type="email" 
                      placeholder="email"  
                      
            />
           <FormInput id="password" 
                      name="password" 
                      type="password" 
                      placeholder="password"
                      
            /> 
           <Button type="submit" 
                   caption="sign in" 
                   onClick={(e) => this.onLog(e)}   
            />
       </form>
       <Link to="/registration" 
             className="form-link">
              or sign up
        </Link>
        <Button   type='button'
                   caption="sign in" 
                   onClick={(e) => this.onLog(e)}   
            />
     </div>
   );
 }
}

export default AuthorizationForm;
