import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import { showModal, isTicketInfoAvailable, getAvailableFlights } from '../actions/BookFormActions.js';
import _ from 'lodash';
import firebaseConfig from '../../../firebase/firebase.js';
import FlightInfo from '../FlightInfo.jsx';
import UserNotification from '../../../userNotification/UserNotification.jsx';
import MainHeader from '../../../MainHeader.jsx';
import ModalBooking from './ModalBooking.jsx';

class BookForm extends Component {
  state = {
    isLoading: true 
  }

  componentDidMount = () => {
  const ticketId = this.getTicketId();
  (ticketId === 'flight-booking') ? this.props.checkTicketInfo(false) : this.props.checkTicketInfo(true);
  } 

  componentDidUpdate = async (prevProps, prevState) => {
    const { ticketDate } = this.props.bookForm;
    if( ticketDate !== prevProps.bookForm.ticketDate) {
      await this.getTicketDate(ticketDate)
      this.findAvailableFlights()
    }
  }

  findAvailableFlights = () => {
    const { ticketDate } = this.state;
    const flightsData =  firebaseConfig.database().ref('flights/date').orderByChild("date").equalTo(ticketDate);
   
    flightsData.on('value', (snapshot) => {
    const fetchedFlights = snapshot.val();

    const availableFlights = _(fetchedFlights).map().uniq().value();
    this.props.getAvailableFlights(availableFlights)
    this.setState({ isLoading: false })
    });
  }

  getTicketDate = date => {
    this.setState ({ ticketDate: date })
  }

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
    const { isOneWayTicketChosen, isRoundTicketChosen, isTicketInfoAvailable, availableFlights } = this.props.bookForm;
    const { isLoading } = this.state;
   
    const bookFormClass = classNames('book-form',{
        'book-form--oneway': isOneWayTicketChosen,
        'book-form--round-ticket': isRoundTicketChosen
    });

     const flightsInfo = availableFlights.map( item => <FlightInfo item={item} key={item.id} company={item.company}/> )
      
     if (isTicketInfoAvailable === false) {
        return (
          <UserNotification mainText="Oops.. It seems like you haven't given us any information about your preference in flight. If you want to book the flight,  please, back to the flight search form"
                            btnCaption="back to the search form" 
                            btnAction={this.handleNotificationBtn}/>
        )
        } else {
            return (
              <React.Fragment>
                <MainHeader />
                <div className={bookFormClass}>
                  <h2 className="book-form__title">Book the flight</h2>
                  <div className="book-form__flights">
                      {(flightsInfo.length === 0) ? (<span className="flight__notification">There aren't available flights</span>) :  (<span className="flights__title">recommended flights</span>)}
                      {(isLoading) ? (<ReactLoading className="loading-spinner" type="spin" color='#fff' height={50} width={50} />) :  ( <div className="flights__wrapper">{flightsInfo}</div>)}
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
      checkTicketInfo: value => dispatch(isTicketInfoAvailable( value )),
      getAvailableFlights: value => dispatch(getAvailableFlights( value ))
    }
  };
  
  export default connect(mapStateToProps, mapDistpatchToProps)(withRouter(BookForm));