import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { Link } from "react-router-dom";
import FormInput from '../FormInput.jsx';
import Button from '../Button.jsx';
import Modal from '../modal/Modal.jsx';
import './RegistrationForm.css';


class RegistrationForm extends Component {
  state = {
    isModalShown: false,
    isCheckboxHovered: false,
    isCheckboxChecked: false
  }

  showModal = (e) => {
      e.preventDefault();
      this.setState ({ isModalShown: true});
  }

  hideModal = () => this.setState ({isModalShown : false});

  handleCheckboxHover = () => this.setState (({ isCheckboxHovered }) => ( { isCheckboxHovered: !isCheckboxHovered }));

  handleCheckboxClick= () => this.setState (({ isCheckboxChecked }) => ( { isCheckboxChecked: !isCheckboxChecked }));

  render() {

    const checkBoxClass = classNames('checkmark',{
      'checkmark--hovered': this.state.isCheckboxHovered ,
      'checkmark--checked': this.state.isCheckboxChecked
    });

    const {isModalShown} = this.state;
   
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
               <label className="privacy-policy-wrapper__container"  
                      onMouseEnter={this.handleCheckboxHover} 
                      onMouseLeave={this.handleCheckboxHover} 
                      onClick={this.handleCheckboxClick}>
                <span className={checkBoxClass}
                      tabIndex="0" 
                      role="checkbox" 
                      aria-checked="true">
                </span>
               </label>
               <span className="privacy-policy-wrapper__caption">I agree to the terms and conditions</span>
           </div>
           <Link to="/authorization" className="form-link"> i already have an account </Link>
         </div>
         <Modal show={isModalShown} 
                handleClose={this.hideModal}>
              <div className="greeting">
                  <span className="greeting__title">Great!</span>
                  <span className="greeting__text">You've been successfully registered!</span>
              </div>
              <div className="img-wrapper"></div>
              <Link to="/" className="route_link" onClick={this.hideModal}>
                  <Button caption="start"/>
              </Link>
        </Modal>
      </React.Fragment>
    );
  }
}

export default RegistrationForm;