import React, { Component } from 'react';
import {  withRouter } from "react-router-dom";
import Button from '../../Button.jsx';
import './SuccessBooking.css';

class SuccessBooking extends Component {  
  handleConfirmBtn = e => {
    e.preventDefault();
    this.props.history.push(`/user-account`);
  }

    render() {
        return (
            <div className="success-page">
                <div className="success__form">
                    <h2 className="success__form-title">Your booking is done</h2>
                    <span className="success__text">
                        The price is <span className="success__price">230$</span>  
                    </span>
                    <Button caption="confirm"
                            action={this.handleConfirmBtn} />
                </div> 
            </div>
        )
    }
}

export default(withRouter(SuccessBooking));