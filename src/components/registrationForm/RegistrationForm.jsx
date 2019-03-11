import React, { Component } from 'react';
import { Link } from "react-router-dom";
import FormInput from '../FormInput.jsx';
import Button from '../Button.jsx';
import './RegistrationForm.css';


class RegistrationForm extends Component {
 render() {
  
   return (
     <div className="registration-form-wrapper">
       <h2 className="registration-form-wrapper__title">Sign Up</h2>
       <form className="registration-form">
           <FormInput id="password" 
                      name="password" 
                      type="password" 
                      placeholder="full name"/> 
           <FormInput id="password" 
                      name="password" 
                      type="password"
                      placeholder="username"/> 
           <FormInput id="email" 
                      name="email" 
                      type="email" 
                      placeholder="email" />
           <FormInput id="password" 
                      name="password" 
                      type="password" 
                      placeholder="password"/> 
           <FormInput id="password" 
                      name="password" 
                      type="password" 
                      placeholder="repeat password"/> 
           <Button type="submit" 
                   caption="sign up"/>
       </form>
       <div>
       <FormInput type="checkbox"/> 
       <span>I agree to the terms and conditions</span>
       </div>
       <Link to="/authorization" className="form-link"> or sign in </Link>
     </div>
   );
 }
}

export default RegistrationForm;
