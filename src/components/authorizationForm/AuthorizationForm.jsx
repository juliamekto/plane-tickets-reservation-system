import React, { Component } from 'react';
import './Authorization.css';
import FormInput from '../FormInput.jsx';
import Button from '../Button.jsx';


class AuthorizationForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: "",
      password: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }
 render() {
  
   return (
     <div className="authorization-form-wrapper">
       <h2>Sign in{this.state.test}</h2>
       <form className="authorization-form">
           <FormInput id="email" name="email" type="email" placeholder="email"  value={this.state.email} onChange={this.handleUserInput}/>
           <FormInput id="password" name="password" type="password" placeholder="password" value={this.state.password} onChange={this.handleUserInput}/> 
           <Button type="submit" caption="sign in"/>
       </form>
       <a href="#">or sign up</a>
     </div>
   );
 }
}

export default AuthorizationForm;
