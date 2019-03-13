import React, { Component } from 'react';
import { Link } from "react-router-dom";
import FormInput from '../FormInput.jsx';
import Button from '../Button.jsx';
import Modal from '../modal/Modal.jsx';
import './RegistrationForm.css';


class RegistrationForm extends Component {
    constructor (props) {
      super(props);
      this.state = {
        modal: {
          show: false
        }
      }
    }

  showModal = (e) => {
      e.preventDefault();
      this.setState ({ modal : {show: true}});
  }

  hideModal = () => {
      this.setState ({modal : {show: false}});
  }

  render() {
    return (
      <React.Fragment>
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
                       caption="sign up"
                       action={this.showModal}/>
           </form>
           <div className="privacy-policy-wrapper">
               <label className="container">
                 <FormInput type="checkbox" /> 
                 <span className="checkmark"></span>
               </label>
               <span className="caption">I agree to the terms and conditions</span>
           </div>
           <Link to="/authorization" className="form-link"> i already have an account </Link>
         </div>
         <Modal show={this.state.modal.show} handleClose={this.hideModal}>
          <div className="greeting">
              <span className="greeting__title">Great!</span>
              <span className="greeting__text">You've been successfully registered!</span>
          </div>
          <div className="img-wrapper"></div>
          <Link to="/" className="route_link"><Button action={this.hideModal} caption="start"/></Link>
        </Modal>
      </React.Fragment>
    );
  }
}

export default RegistrationForm;
