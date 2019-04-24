import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { withRouter, Link  } from "react-router-dom";
import { connect } from 'react-redux';
import { showModal } from '../actions/BookFormActions.js';
import FlightInfo from '../FlightInfo.jsx';
import MainHeader from '../../../MainHeader.jsx';
import ModalBooking from './ModalBooking.jsx';

class BookForm extends Component {
  showModal = () => {
    this.props.showModal();
  }
 
  render() {
      const { isOneWayTicketChosen, isRoundTicketChosen, isTicketInfoAvailable } = this.props.bookForm;

      const bookFormClass = classNames('book-form',{
          'book-form--oneway': isOneWayTicketChosen,
          'book-form--round-ticket': isRoundTicketChosen
      });
      
      if (isTicketInfoAvailable === false) {
        return (
          <div className="notification">
              <span className="notification__text">Oops.. It seems like you haven't given us any information about your preference in flight. If you want to book the flight,  please, back to the flight search form</span>
              <Link className="button button--notification-link" to="/flight-search">back to the search form</Link>
          </div>)
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
      showModal: () => dispatch(showModal())
    }
  };
  
  export default connect(mapStateToProps, mapDistpatchToProps)(withRouter(BookForm));