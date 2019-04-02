import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { Route } from "react-router-dom";
import Intro from './intro/Intro.jsx';
import Authorization from './authorizationForm/Authorization.jsx';
import Registration from './registrationForm/Registration.jsx';
import Search from './reservationSystem/searchForm/Search.jsx';
import Book from './reservationSystem/bookForm/Book.jsx';
import SuccessBooking from './reservationSystem/bookForm/SuccessBooking.jsx';
import OrderList from './reservationSystem/orderList/OrderList.jsx';

const AppRouter = () => (
    <BrowserRouter>
            <div>
                <Route path="/" exact component={Intro} />
                <Route path="/authorization" exact component={Authorization} />
                <Route path="/registration" exact component={Registration} />
                <Route path="/flight-search" exact component={Search} />
                <Route path="/flight-booking" exact component={Book} />
                <Route path="/success" exact component={SuccessBooking} />
                <Route path="/user-account" exact component={OrderList} />
            </div>
    </BrowserRouter>
);

export default AppRouter;