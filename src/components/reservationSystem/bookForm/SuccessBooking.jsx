import React, { Component } from 'react';
import {  withRouter } from "react-router-dom";
import Button from '../../Button.jsx';
import './SuccessBooking.css';

class SuccessBooking extends Component {  
    
  getTicketId = () => {
    let ticketId = this.props.location.pathname,
        ticketIdPart = ticketId.lastIndexOf('/') + 1;
    
    ticketId = ticketId.substr(ticketIdPart)
   
    return ticketId;
  }

  handleConfirmBtn = e => {
    e.preventDefault();
    const ticketId = this.getTicketId();
    this.props.history.push(`/user-account/${ticketId}`);
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