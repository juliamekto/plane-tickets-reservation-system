import React, { Component }  from 'react';
import firebaseConfig from './firebase/firebase.js';
import Button from './Button.jsx';
import './reservationSystem/orderList/OrderList.css';

 class OrderList extends Component{
    componentDidMount = () => {
        this.getUserId();
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
        window.location.href = '/user-account'
    }

    redirectToSearchForm = () => {
        const { userId } = this.state;
        window.location.href = `/flight-search/${userId}`
    }

    getUserId = async () => {
        let userId;
        await firebaseConfig.auth().onAuthStateChanged(user => {
            (user) ? userId = user.uid : console.log('cannot get user ID');
        });
        this.setState({ userId })
    }

     render () {
         return (
            <header className="account-header">
                <span className="account-header__title" onClick={this.redirectToUserAccount}>My account</span>
                <div className="account-header__btn-wrapper">
                    <Button className="button button--account-header-btn account-header-btn--search-btn"
                            caption="find tickets"
                            action={this.redirectToSearchForm} />
                    <Button caption="log out"
                            className="button button--account-header-btn"
                            action={this.logOut}/>
                </div>
            </header>
         )
     }
 } 
    
export default OrderList;