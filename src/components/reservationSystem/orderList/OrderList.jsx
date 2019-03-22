import React  from 'react';
import { Link } from "react-router-dom";
import Button from '../../Button.jsx';
import './OrderList.css';

const OrderList = () => {
        return (
            <React.Fragment className="user-account">
                <header className="user-account__header">
                <span className="user-account__title">My account</span>
                <div className="user-account__header-btn-wrapper">
                    <Link to="/flight-search">
                        <Button className="button button--user-account-header-btn user-account-header-btn--search-btn"
                                caption="find tickets" />
                    </Link>
                    <Link to="/">
                        <Button caption="log out"
                                className="button button--user-account-header-btn"/>
                    </Link>
                </div>
                </header>
                <div className="user-account__orders">
                    <span className="orders__title">My orders</span>
                    <div className="orders__main">
                        <div className="orders__filters">
                            <Button className="button orders-filters-btn--past" caption="Past orders" />
                            <Button className="button orders-filters-btn--current" caption="Current orders" />
                        </div>
                        <ul className="orders__order-list">
                            <li className="order-list__item">
                                <span className="order-list__item-route">Minsk - London</span>
                                <span className="order-list__item-date">12/03/19</span>
                                <span className="order-list__item-price">230$</span>
                            </li>
                            <li className="order-list__item">
                                <span className="order-list__item-route">Minsk - London</span>
                                <span className="order-list__item-date">12/03/19</span>
                                <span className="order-list__item-price">230$</span>
                            </li>
                            <li className="order-list__item">
                                <span className="order-list__item-route">Minsk - London</span>
                                <span className="order-list__item-date">12/03/19</span>
                                <span className="order-list__item-price">230$</span>
                            </li>
                            <li className="order-list__item">
                                <span className="order-list__item-route">Minsk - London</span>
                                <span className="order-list__item-date">12/03/19</span>
                                <span className="order-list__item-price">230$</span>
                            </li>
                            <li className="order-list__item">
                                <span className="order-list__item-route">Minsk - London</span>
                                <span className="order-list__item-date">12/03/19</span>
                                <span className="order-list__item-price">230$</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
}

export default OrderList;