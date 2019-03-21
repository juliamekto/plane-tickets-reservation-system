import React from 'react';
import { Link } from "react-router-dom";
import Button from '../../Button.jsx';
import './SuccessBooking.css';

const SuccessBooking = () => {
        return (
            <div className="success-wrapper">
            <div className="success-wrapper_form">
                <h2 className="success-wrapper__title">Your booking is done</h2>
                <span className="success-wrapper__text">
                The price is <span className="success-wrapper__price">230$</span>  
                </span>
                <Link to="/user-account" className="modal__route-link--booking">
                    <Button caption="confirm" />
                </Link>
            </div> 
            </div>
        )
}

export default SuccessBooking;