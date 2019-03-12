import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Button from '../Button.jsx';
import FormInput from '../FormInput.jsx';
import InlineError from '../InlineError.jsx';
import './Authorization.css';

class AuthorizationForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleInput = (e) => {
    const name = e.target.name,
          value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    
    const userData = this.state;
    console.log('form was submitted',userData);
  
    //clear form state
    this.setState({
      email: '',
      password: '',
      errors: ''
    });

  }

  handleFormValidation = () => {
    let { email, password } = this.state;
    let emailInput = email,
        passwordInput = password,
        errors = {},
        formIsValid = true;
    
    //email
    if(emailInput === ''){
      formIsValid = false;
      errors = 'email field cannot be empty';
    }
   
    //password
    if(passwordInput === ''){
      formIsValid = false;
      errors = 'password field cannot be empty';
    }

    this.setState({errors});
    return formIsValid;
  }

  render() {
    const { email, password } = this.state;
   return (
     <div className="authorization-form-wrapper">
       <h2 className="authorization-form-wrapper__title"> Sign in </h2>
       <InlineError  formErrors={this.state.errors}/>
       <form className="authorization-form" onSubmit={this.handleFormSubmit}>
           <FormInput id="email"
                      name="email"
                      type="email" 
                      value={email}
                      placeholder="email" 
                      action={this.handleFormValidation}
            />
           <FormInput id="password" 
                      name="password" 
                      type="password" 
                      placeholder="password"
                      value={password}
                      action={this.handleInput}  
            /> 
           <Button type="submit" 
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
