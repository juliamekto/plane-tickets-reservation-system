import React from 'react';
import PropTypes from 'prop-types';

const OrderListItem = ({ route, date, price }) => (
    <li className="order-list__item">
        <span className="order-list__item-route">{route}</span>
        <span className="order-list__item-date">{date}</span>
        <span className="order-list__item-price">{price}</span>
    </li>
)

OrderListItem.propTypes  = {
    route: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired
}

export default OrderListItem;