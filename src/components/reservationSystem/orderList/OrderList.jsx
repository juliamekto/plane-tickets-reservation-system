import React, { Component }  from 'react';
import firebaseConfig from '../../firebase/firebase.js';
import _ from 'lodash';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { fetchOrders, isOrdersDataLoading } from './actions/OrderListActions.js';
import ReactLoading from 'react-loading';
import Button from '../../Button.jsx';
import OrderListItem from '../orderList/OrderListItem.jsx';
import MainHeader from '../../MainHeader.jsx';
import './OrderList.css';

class OrderList extends Component {
    state = {
        isPastOrdersShown: false,
        isCurrentOrdersShown: false
    }

componentDidMount = async () => {
    let userId;
    await firebaseConfig.auth().onAuthStateChanged(user => {
        (user) ? userId = user.uid : console.log('cannot get user ID');
    });

    let ticketData = firebaseConfig.database().ref(`/users/${userId}/data/ticket`);
   
    ticketData.on('value', (snapshot) => {
        let data = snapshot.val();
        let fetched_data = {};
            for ( let key in data) {
            fetched_data[key] = data[key];
        }
    
        const ticketDataKeys = _(fetched_data).map().uniq().value();
        
        let ticketConfirmed = []
        ticketDataKeys.forEach( item => {
           if(item.confirmed) {
               ticketConfirmed.push(item) 
           }
        })

        this.props.fetchOrders(ticketConfirmed);
        this.props.isOrdersDataLoading(false);
    });
}

componentDidUpdate = (prevProps) => {
    const { fetchedOrders } = this.props.orderList;
    if(fetchedOrders !== prevProps.orderList.fetchedOrders) {
        this.filterOrders()
    }
}

filterOrders = () => {
    const allOrders = this.props.orderList.fetchedOrders; 
    const currentData = new Date().getTime();
    
    allOrders.map( item  => this.compareTwoDates(item, currentData, new Date(item.departDate).getTime())); 
}

compareTwoDates = (item, date1, date2) => {
    (date1 > date2) ? item.pastOrder = true : item.currentOrder = true;
}

showPastOrders = () => this.setState({ isPastOrdersShown: !this.state.isPastOrdersShown });

showCurrentOrders = () => this.setState({ isCurrentOrdersShown: !this.state.isCurrentOrdersShown });

render () {
    const { isPastOrdersShown, isCurrentOrdersShown } = this.state;
   
    const orderListClass = classNames('user-orders__list',{
        'user-orders__list--past': isPastOrdersShown,
        'user-orders__list--current': isCurrentOrdersShown
    });

    const { fetchedOrders, isOrdersDataLoading } = this.props.orderList;
   
    const allUserOrders = fetchedOrders.map( item => <OrderListItem item={item} key={item.ticketId} />); 
 
    if (isOrdersDataLoading) {
        return <ReactLoading className="loading-spinner" type="spin" color='#fff' height={50} width={50} />;
    } else {
        return (
            <React.Fragment>
                 <MainHeader />
                    <div className="user-account">
                        <div className="user-orders">
                            <span className="user-orders__title">My orders</span>
                            <div className="user-orders__main">
                                <div className="user-orders__filters">
                                    <Button className="button orders-filters-btn--past" caption="Past orders" action={this.showPastOrders}/>
                                    <Button className="button orders-filters-btn--current" caption="Current orders"  action={this.showCurrentOrders}/>
                                </div>
                                <ul className={orderListClass}>
                                <li className='order-list__item order-list__item--title'>
                                    <span className="order-item-title--route">route</span>
                                    <span className="order-item-title--date">date</span>
                                    <span className="order-item-title--price">price</span>
                                    <span className="order-item-title--ticketType">ticket Type</span>
                                    <span className="order-item-title--tripType">trip Type</span>
                                    <span className="order-item-title--passNum">Passengers</span>
                                </li>
                                    {(allUserOrders.length === 0) ? <span className="user-orders__notification">You don't have any orders</span> : allUserOrders}
                                </ul>
                            </div>
                        </div>
                    </div>
            </React.Fragment>
        )
      }
    } 
}
   
const mapStateToProps = state => ({ orderList: state.orderList });

const mapDistpatchToProps = dispatch => {
  return {
    fetchOrders: value => dispatch(fetchOrders(value)),
    isOrdersDataLoading: value => dispatch(isOrdersDataLoading(value))
  }
};

export default connect(mapStateToProps, mapDistpatchToProps)(OrderList);