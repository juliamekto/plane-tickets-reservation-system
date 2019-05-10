import React, { Component }  from 'react';
import firebaseConfig from '../../firebase/firebase.js';
import _ from 'lodash';
import ReactLoading from 'react-loading';
import Button from '../../Button.jsx';
import OrderListItem from '../orderList/OrderListItem.jsx';
import MainHeader from '../../MainHeader.jsx';
import './OrderList.css';

class OrderList extends Component {
    state = {
        isLoading: true,
        fetchedData: [ { id: 1, default: 'default'}]
    }

    componentDidMount =  async () => {
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
        this.setState({ fetchedData: ticketDataKeys, isLoading: false });
      });
    }

render () {
    const { fetchedData, isLoading } = this.state;
   
    const userOrders =  fetchedData.map( item => <OrderListItem  item={item} key={item.ticketId} /> ); 
 
    if (isLoading) {
        return <ReactLoading className="loading-spinner" type="spin" color='#fff' height={50} width={50} />;
    } else {
        return (
            <div className="user-account">
                <MainHeader />
                <div className="user-orders">
                    <span className="user-orders__title">My orders</span>
                    <div className="user-orders__main">
                        <div className="user-orders__filters">
                            <Button className="button orders-filters-btn--past" caption="Past orders" />
                            <Button className="button orders-filters-btn--current" caption="Current orders" />
                        </div>
                        <ul className="user-orders__list">
                            {userOrders}
                        </ul>
                    </div>
                </div>
            </div>
        )
      }
    } 
}
    
export default OrderList;