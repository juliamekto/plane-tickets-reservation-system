import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OrderListItem extends Component {
    state = {
        departCity: this.props.item.departCity,
        destinationCity: this.props.item.destinationCity,
        classType: this.props.item.classType,
        isRoundTicketChosen: this.props.item.isRoundTicketChosen,
        departDate: this.props.item.departDate,
        destinationDate: this.props.item.destinationDate,
        adultNum: this.props.item.adultNum,
        childNum: this.props.item.childNum
    }

    componentDidMount =  () => {
        this.getTicketData();
    }

    getTicketData = () => {
        const { departCity, destinationCity, classType, isRoundTicketChosen, departDate, destinationDate, adultNum, childNum } = this.state;
    
        const route = `${departCity} - ${destinationCity}`,
              passNumTotal = Number(adultNum) + Number(childNum),
              passNum =  (passNumTotal >= 1) ? `${passNumTotal} travelers` : `${passNumTotal} traveler`,
              ticketType = classType.replace(/Class/g,''),
              tripType = (isRoundTicketChosen) ? 'Round trip' : 'One way',
              date = (isRoundTicketChosen) ? `${departDate} - ${destinationDate}` : `${departDate}`;
        
        this.setState ({ route, passNum, date, ticketType, tripType });
    }

    render() {
        const { route, passNum, date, ticketType, tripType } = this.state
       
        return(
            <li className="order-list__item">
                <span className="order-list__item-route">{route}</span>
                <span className="order-list__item-date">{date}</span>
                <span className="order-list__item-price">230$</span>
                <span className="order-list__item-ticketType">{ticketType}</span>
                <span className="order-list__item-tripType">{tripType}</span>
                <span className="order-list__item-passNum">{passNum}</span>
            </li>
        )
    }
} 

OrderListItem.propTypes  = {
    route: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired
}

export default OrderListItem;