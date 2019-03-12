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

    this.handleInput = this.handleInput.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormValidation = this.handleFormValidation.bind(this);
  }

  handleInput(e) {
    const name = e.target.name,
          value = e.target.value;
    this.setState({
      [name]: value
    });
    console.log('changed')
    console.log(this.state)
  }

  handleFormSubmit(e) {
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

  handleFormValidation() {
    let emailInput = this.state.email;
    let passwordInput = this.state.password;
    let errors = {};
    let formIsValid = true;
    
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


    // if(typeof fields["email"] !== "undefined"){
    //   let lastAtPos = fields["email"].lastIndexOf('@');
    //   let lastDotPos = fields["email"].lastIndexOf('.');

    //   if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
    //       formIsValid = false;
    //       errors["email"] = "Email is not valid";
    //     }
    // }  

    this.setState({errors: errors});
    return formIsValid;
  }

  render() {
   return (
     <div className="authorization-form-wrapper">
       <h2 className="authorization-form-wrapper__title"> Sign in </h2>
       <InlineError  formErrors={this.state.errors}/>
       <form className="authorization-form" onSubmit={this.handleFormSubmit}>
           <FormInput id="email"
                      name="email"
                      type="email" 
                      value={this.state.email}
                      placeholder="email" 
                      // action={this.handleInput}
                      action={this.handleFormValidation}
            />
           <FormInput id="password" 
                      name="password" 
                      type="password" 
                      placeholder="password"
                      value={this.state.password}
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
