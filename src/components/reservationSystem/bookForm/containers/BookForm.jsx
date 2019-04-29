import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { withRouter, Link  } from "react-router-dom";
import { connect } from 'react-redux';
import { showModal, isTicketInfoAvailable } from '../actions/BookFormActions.js';
import FlightInfo from '../FlightInfo.jsx';
import UserNotification from '../../../userNotification/UserNotification.jsx';
import MainHeader from '../../../MainHeader.jsx';
import ModalBooking from './ModalBooking.jsx';

class BookForm extends Component {
  componentDidMount = async () => {
     const ticketId = this.getTicketId();
 
     (ticketId === 'flight-booking') ? this.props.checkTicketInfo(false) : this.props.checkTicketInfo(true);
  }
   
  showModal = () =>  this.props.showModal();

  getTicketId = () => {
    let ticketId = this.props.location.pathname,
        ticketIdPart = ticketId.lastIndexOf('/') + 1;
    
    ticketId = ticketId.substr(ticketIdPart)
   
    return ticketId;
  }

  handleNotificationBtn = () => {
    const { userId } = this.props.bookForm;
    this.props.history.push(`/flight-search/${userId}`);
  }
 
  render() {
    const { isOneWayTicketChosen, isRoundTicketChosen, isTicketInfoAvailable } = this.props.bookForm;

    const bookFormClass = classNames('book-form',{
        'book-form--oneway': isOneWayTicketChosen,
        'book-form--round-ticket': isRoundTicketChosen
    });
    
    if (isTicketInfoAvailable === false) {
      return (
        <UserNotification mainText="Oops.. It seems like you haven't given us any information about your preference in flight. If you want to book the flight,  please, back to the flight search form"
                          btnCaption="back to the search form" 
                          btnAction={this.handleNotificationBtn}/>)
      } else {
        return (
          <React.Fragment>
            <MainHeader />
            <div className={bookFormClass}>
            <h2 className="book-form__title">Book the flight</h2>
            <div className="book-form__flights">
                <span className="flights__title">recommended flights</span>
                <div className="flights__wrapper">
                    <FlightInfo companyName='s7'
                                departTime='5:50 AM'
                                returnTime="8:30 AM"
                                action={this.showModal} />
                    <FlightInfo companyName='Lufthansa'
                                departTime='5:50 AM'
                                returnTime="8:30 AM"
                                action={this.showModal} />
                </div>
            </div>
          </div> 
          <ModalBooking />
          </React.Fragment>
        );
      } 
    }
  }

  const mapStateToProps = state => ({ bookForm: state.bookForm });

  const mapDistpatchToProps = dispatch => {
    return {
      showModal: () => dispatch(showModal()),
      checkTicketInfo: value => dispatch(isTicketInfoAvailable( value ))
    }
  };
  
  export default connect(mapStateToProps, mapDistpatchToProps)(withRouter(BookForm));