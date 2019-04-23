import React, { Component }  from 'react';
import { Link } from "react-router-dom";
import firebaseConfig from './firebase/firebase.js';
import Button from './Button.jsx';
import './reservationSystem/orderList/OrderList.css';

 class OrderList extends Component{
    logOut = () => {
        firebaseConfig.auth().signOut()
            .then(() => {
            this.setState({
                user: null
            });

            window.location.href = '/'
        });
    }

    redirectToUserAccount = () => {
        window.location.href = '/user-account'
    }

     render () {
         return (
            <header className="account-header">
                <span className="account-header__title" onClick={this.redirectToUserAccount}>My account</span>
                <div className="account-header__btn-wrapper">
                    <Link to="/flight-search">
                        <Button className="button button--account-header-btn account-header-btn--search-btn"
                                caption="find tickets" />
                    </Link>
                    <Button caption="log out"
                            className="button button--account-header-btn"
                            action={this.logOut}/>
                </div>
            </header>
         )
     }
 } 
    
export default OrderList;