import React, { Component }  from 'react';
import { Link } from "react-router-dom";
import firebaseConfig from '../../firebase/firebase.js';
import Button from '../../Button.jsx';
import OrderListItem from '../orderList/OrderListItem.jsx';
import './OrderList.css';

class OrderList extends Component {

logout = () => {
    firebaseConfig.auth().signOut()
        .then(() => {
        this.setState({
            user: null
        });
        this.props.history.push("/");
    });
}

render () {
    return(
        <div className="user-account">
            <header className="user-account__header">
                <span className="user-account__title">My account</span>
                <div className="user-account__header-btn-wrapper">
                    <Link to="/flight-search">
                        <Button className="button button--user-account-header-btn user-account-header-btn--search-btn"
                                caption="find tickets" />
                    </Link>
              
                    <Button caption="log out"
                            className="button button--user-account-header-btn"
                            action={this.logout}/>
                </div>
            </header>
            <div className="user-orders">
                <span className="user-orders__title">My orders</span>
                <div className="user-orders__main">
                    <div className="user-orders__filters">
                        <Button className="button orders-filters-btn--past" caption="Past orders" />
                        <Button className="button orders-filters-btn--current" caption="Current orders" />
                    </div>
                    <ul className="user-orders__list">
                        <OrderListItem route="Minsk - Moscow"
                                        date='15/03/19'
                                        price='100$'  />
                        <OrderListItem route="Minsk - London"
                                        date='12/03/19'
                                        price='230$'  />
                    </ul>
                </div>
            </div>
        </div>
    )
}
} 

    
export default OrderList;