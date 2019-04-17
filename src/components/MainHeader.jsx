import React, { Component }  from 'react';
import { Link } from "react-router-dom";
import firebaseConfig from './firebase/firebase.js';
import Button from './Button.jsx';
import './reservationSystem/orderList/OrderList.css';

 class OrderList extends Component{
        state= {
            
        }
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
        window.location.href = 'user-account'
    }

     render () {
         return (
            <div className="user-account">
                <header className="user-account__header">
                    <span className="user-account__title" onClick={this.redirectToUserAccount}>My account</span>
                    <div className="user-account__header-btn-wrapper">
                        <Link to="/flight-search">
                            <Button className="button button--user-account-header-btn user-account-header-btn--search-btn"
                                    caption="find tickets" />
                        </Link>
                    
                        <Button caption="log out"
                                className="button button--user-account-header-btn"
                                action={this.logOut}/>
                    </div>
                </header>
            </div>
         )
     }
 } 
    
export default OrderList;