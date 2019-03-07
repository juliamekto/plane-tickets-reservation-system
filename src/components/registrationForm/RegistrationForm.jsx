import React, { Component } from 'react';
import './RegistrationForm.css';
import FormInput from '../FormInput.jsx';
import { Link } from "react-router-dom";
import Button from '../Button.jsx';


class RegistrationForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
    
    }
  }
  
 render() {
  
   return (
     <div className="authorization-form-wrapper">
       <h2>Sign Up</h2>
       <form className="authorization-form">
           <FormInput id="password" name="password" type="password" placeholder="full name"/> 
           <FormInput id="password" name="password" type="password" placeholder="username"/> 
           <FormInput id="email" name="email" type="email" placeholder="email" />
           <FormInput id="password" name="password" type="password" placeholder="password"/> 
           <FormInput id="password" name="password" type="password" placeholder="repeat password"/> 
           <Button type="submit" caption="sign up"/>
       </form>
       <div>
       <FormInput type="checkbox"/> 
       <span>I agree to the terms and conditions</span>
       </div>
       <Link to="/AuthorizationForm"> or sign in </Link>
     </div>
   );
 }
}

export default RegistrationForm;
