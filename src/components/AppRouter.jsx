import React from "react";
import { BrowserRouter, Route } from 'react-router-dom'
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
                <Route path="/authorization" component={Authorization} />
                <Route path="/registration" component={Registration} />
                <Route path="/flight-search" component={Search} />
                <Route path="/flight-booking" component={Book} />
                <Route path="/success" component={SuccessBooking} />
                <Route path="/user-account" component={OrderList} />
            </div>
    </BrowserRouter>
); 

export default AppRouter;