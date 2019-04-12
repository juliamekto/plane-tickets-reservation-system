import React, { Component } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import firebaseConfig from './firebase/firebase.js';
import Intro from './intro/Intro.jsx';
import Authorization from './authorizationForm/Authorization.jsx';
import Registration from './registrationForm/Registration.jsx';
import Search from './reservationSystem/searchForm/Search.jsx';
import Book from './reservationSystem/bookForm/Book.jsx';
import SuccessBooking from './reservationSystem/bookForm/SuccessBooking.jsx';
import OrderList from './reservationSystem/orderList/OrderList.jsx';
import PrivateRoute from "./PrivateRoute.jsx";

class AppRouter  extends Component  {
    state = { 
        loading: true, 
        authenticated: false, 
        user: null 
    };

    componentWillMount() {
        firebaseConfig.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    authenticated: true,
                    currentUser: user,
                    loading: false
                });
            } else {
                this.setState({
                    authenticated: false,
                    currentUser: null,
                    loading: false
                });
            }
        });
    }

    render() {
        const { authenticated, loading } = this.state;

        if (loading) {
          return <p>Loading..</p>;
        }
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" exact component={Intro} />
                    <Route path="/authorization" component={Authorization} />
                    <Route path="/registration" component={Registration} />
                    <PrivateRoute path="/flight-search" component={Search} authenticated={authenticated}/>
                    <PrivateRoute path="/flight-booking" component={Book} authenticated={authenticated}/>
                    <PrivateRoute path="/success" component={SuccessBooking} authenticated={authenticated}/>
                    <PrivateRoute path="/user-account" component={OrderList} authenticated={authenticated}/>
                </div>
            </BrowserRouter>
        )
    }
}; 

export default AppRouter;