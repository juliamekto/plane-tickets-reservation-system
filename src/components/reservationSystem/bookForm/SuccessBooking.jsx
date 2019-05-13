import React, { Component } from 'react';
import {  withRouter } from "react-router-dom";
import ReactLoading from 'react-loading';
import firebaseConfig from '../../firebase/firebase.js';
import Button from '../../Button.jsx';
import UserNotification from '../../userNotification/UserNotification.jsx';
import MainHeader from '../../MainHeader.jsx';
import './SuccessBooking.css';

class SuccessBooking extends Component {  
    state = {
        isLoading: true,
        ticketPrice: 0,
        isTicketAvailable: true
    }

    componentDidMount = () => {  
        if(this.getTicketId() === 'success') {
            this.setState({ isTicketAvailable: false})
            this.fetchUserId()
        } else {
            this.fetchData()
        }
    }

    fetchData = async () => {
        let userId;
        let price = 0;
      
        await firebaseConfig.auth().onAuthStateChanged(user => {
            (user) ? userId = user.uid : console.log('cannot get user ID');
        });
    
        const ticketId = this.getTicketId();
        const chosenSeats =  firebaseConfig.database().ref(`/users/${userId}/data/ticket/${ticketId}/chosenSeats`);
        const luggageNum =  firebaseConfig.database().ref(`/users/${userId}/data/ticket/${ticketId}/luggageNum`);

        luggageNum.on('value', (snapshot) => {
            const data = snapshot.val();
            this.setState ({ luggageNum: +data })
        });

        chosenSeats.on('value', (snapshot) => {
            const data = snapshot.val();
            data.forEach( item => {
                price += item.price;
            });

           this.getTotalPrice(this.state.luggageNum, price)
           this.setState({ userId, ticketId })
        });
    }

    fetchUserId = async () => {
        let userId;
      
        await firebaseConfig.auth().onAuthStateChanged(user => {
            (user) ? userId = user.uid : console.log('cannot get user ID');
        });
    
       this.setState({ userId })
    }

    getTotalPrice = (luggageNum, ticketPrice) => { 
        let totalPrice = 0;
       
        (luggageNum === 0 ) ? totalPrice = ticketPrice : totalPrice = ticketPrice * luggageNum;
        this.setState ({ totalPrice, isLoading: false });
    }

    getTicketId = () => {
        let ticketId = this.props.location.pathname,
            ticketIdPart = ticketId.lastIndexOf('/') + 1;
        
        ticketId = ticketId.substr(ticketIdPart)
        
        return ticketId;
    }
    
    handleConfirmBtn = e => {
        e.preventDefault();
        const { ticketId, userId, totalPrice } = this.state; 
        firebaseConfig.database().ref(`/users/${userId}/data/ticket/${ticketId}`).update({
            totalPrice,
            confirmed: true
        }); 
        this.props.history.push('/user-account');
    }

    handleBackBtn = e => {
        e.preventDefault();
        const { ticketId, userId } = this.state; 
     
        this.props.history.push(`/flight-booking/${userId}/${ticketId}`);
    }

    handleNotificationBtn = () => {
        const { userId } = this.state;
        this.props.history.push(`/flight-search/${userId}`);
    }

    render() {
    const { totalPrice, isLoading } = this.state;
    
    if (isLoading) {
        if(this.state.isTicketAvailable === false ) {
            return <UserNotification mainText="You should give us all the neccesary information to get the total ticket price. Please, back to the search flight form" 
                                     btnCaption="search flight"
                                     btnAction={this.handleNotificationBtn}/>
        } else {
            return <ReactLoading className="loading-spinner" type="spin" color='#fff' height={50} width={50} />;
        }
    } else {
            return (
                <React.Fragment>
                    <MainHeader />
                    <div className="success-page">
                        <div className="success__form">
                            <h2 className="success__form-title">Your booking is done</h2>
                            <span className="success__text">
                                The price is <span className="success__price">{totalPrice} $</span>  
                            </span>
                            <div className="success__buttons">
                                <Button caption="go back"
                                        action={this.handleBackBtn}
                                        className="button button--success-back-btn" />
                                <Button caption="confirm"
                                        action={this.handleConfirmBtn} />
                            </div>
                        </div> 
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default(withRouter(SuccessBooking));