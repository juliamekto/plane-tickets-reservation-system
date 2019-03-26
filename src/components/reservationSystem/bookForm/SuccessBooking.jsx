import React from 'react';
import { Link } from "react-router-dom";
import Button from '../../Button.jsx';
import './SuccessBooking.css';

const SuccessBooking = () => {
        return (
            <div className="success-page">
                <div className="success__form">
                    <h2 className="success__form-title">Your booking is done</h2>
                    <span className="success__text">
                         The price is <span className="success__price">230$</span>  
                    </span>
                    <Link to="/user-account">
                        <Button caption="confirm" />
                    </Link>
                </div> 
            </div>
        )
}

export default SuccessBooking;