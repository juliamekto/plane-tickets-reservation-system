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
        isLoading: false
    }

    componentDidMount =  async () => {
        let userId;
        
        await firebaseConfig.auth().onAuthStateChanged(user => {
            (user) ? userId = user.uid : console.log('cannot get user ID');
        });
    
       
        let ticketData =  await firebaseConfig.database().ref(`/users/${userId}/data/ticket`);
        
        ticketData.on('value', (snapshot) =>{
            let data = snapshot.val();
            let fetched_data = {};
             for ( let key in data) {
                fetched_data[key] = data[key];
            }
      
        let keys = _(fetched_data).map().uniq().value();
        console.log(keys)
        this.setState ({ fetchedData: keys, isLoading: false });

        console.log(this.state.fetchedData)
        // for (let i=0; i<keys.length; i++ ) {
        //     this.setState ({ fetchedData: keys[i], isLoading: false });
        // }
        // console.log(this.state)
        // this.setState ({ fetchedData: fetched_data, isLoading: false });
        // this.getTicketData();
      });
    }


    getTicketData = () => {
            const { departCity, destinationCity, classType, isRoundTicketChosen, departDate, destinationDate } = this.state.fetchedData;
        
            const route = `${departCity} - ${destinationCity}`,
                 date = `${departDate} - ${destinationDate}`;
            
            this.setState ({ route, date });
        }

render () {
    const { route, date, fetchedData } = this.state;

    console.log('render', fetchedData)
    // const orders = fetchedData.map( item => <OrderListItem item={item} key={item.id} row={item.row} /> )
    if (this.state.isLoading) {
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
                            {/* {orders} */}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    }
    
}
    
export default OrderList;