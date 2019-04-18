import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { withRouter  } from "react-router-dom";
import firebaseConfig from '../../firebase/firebase.js';
import ReactLoading from 'react-loading';
import FormInput from '../../FormInput.jsx';
import Modal from '../../modal/Modal.jsx';
import Button from '../../Button.jsx';
import Seat from '../bookForm/Seat.jsx';
import seatData from '../bookForm/SeatsData';
import FlightInfo from '../bookForm/FlightInfo.jsx';
import InlineError from '../../InlineError.jsx';
import MainHeader from '../../MainHeader.jsx'

const REG_EXP_LUGGAGE_NUM_VALIDATION = /^\d+$/;

class BookForm extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      isModalShown: false,
      isCheckboxChecked: false,
      isOneWayTicketChosen: false,
      isRoundTicketChosen: true,
      isLuggageNumShown: false,
      luggageNum: null,
      error: '',
      chosenSeats: [],
      chosenSeatsNum: 0,
      isLoading: true
    }
  }
  
  componentDidMount = async () => {
   let userId;
   await firebaseConfig.auth().onAuthStateChanged(user => {
      (user) ? userId = user.uid : console.log('cannot get user ID');
    });

    const ticketId = this.getTicketId();
 
    const ticketData =  firebaseConfig.database().ref(`/users/${userId}/data/ticket/${ticketId}`);
    const fetched_data = {};
      
    ticketData.on('value', (snapshot) => {
        const data = snapshot.val();
        
        for ( let key in data) {
            fetched_data[key] = data[key];
        }
        
        this.setState ({ fetchedData: fetched_data, isLoading: false });
        this.getTicketInfo();
     });
  }


  handleSeatClick= (e) => {
    let { chosenSeats, passNumTotal, chosenSeatsNum, error } = this.state; 
    const newChosenSeats = [...chosenSeats],
          seatNum = e.target.getAttribute('data-num'),
          seatRow = e.target.getAttribute('data-row'),
          chosenSeatData = seatNum + seatRow;

    if (e.target.classList.contains('seat--available')) {
      e.target.classList.toggle('seat--booked');
      
      if (newChosenSeats.indexOf(chosenSeatData) === -1) {
        newChosenSeats.push(chosenSeatData);
        this.increment();
      } else {
        newChosenSeats.pop(chosenSeatData);
        this.decrement();
      }

      if (chosenSeatsNum >= passNumTotal ) {
        error = "You cannot choose more tickets than the number of travelers"; 
      } else {
        error = '';
      }

      this.setState({  chosenSeats: newChosenSeats, error }); 
    }
  }

  increment = () => {
    this.setState({
      chosenSeatsNum: this.state.chosenSeatsNum + 1
    });
  };

  decrement = () => {
    this.setState({
      chosenSeatsNum: this.state.chosenSeatsNum - 1
    });
  };

  getTicketId = () => {
    let ticketId = this.props.location.pathname,
        ticketIdPart = ticketId.lastIndexOf('/') + 1;
    
    ticketId = ticketId.substr(ticketIdPart)
   
    return ticketId;
  }

  showModal = (e) => {
      e.preventDefault();
      this.setState ({ isModalShown: true });
  }

  hideModal = () => this.setState({ isModalShown : false });

  handleCheckboxClick= () => this.setState(({ isCheckboxChecked, isLuggageNumShown }) => ( { isCheckboxChecked: !isCheckboxChecked, isLuggageNumShown: !isLuggageNumShown }));

  handleLuggageInput = (e) => {
    let { error } = this.state;
    if(!REG_EXP_LUGGAGE_NUM_VALIDATION.test(e.target.value)) {
      error = "only numbers are allowed";
      this.setState ({ luggageNum : null, error });
      return;
    }
    this.setState({ luggageNum : e.target.value, error: '' });
  }

  handleFormSubmit = async e => {
    e.preventDefault();
    const { luggageNum, chosenSeats } = this.state;
    const ticketId =  this.getTicketId();
    let userId;
    
      try {
        await firebaseConfig.auth().onAuthStateChanged((user) => {
            (user) ? userId = user.uid :  console.log('cannot get user ID');
      });

      firebaseConfig.database().ref(`/users/${userId}/data/ticket/${ticketId}`).update({
          luggageNum,
          chosenSeats
      });
      console.log(chosenSeats)

      this.props.history.push(`/success/${ticketId}`);

      } catch (error) {
            this.setState ({ error: error.message });
      }
  
  }

  getTicketInfo = () => {
    const { departCity, destinationCity, adultNum, childNum, classType, isRoundTicketChosen, isOneWayTicketChosen, departDate, destinationDate } = this.state.fetchedData;
    const route = `${departCity} - ${destinationCity}`,
          passNumTotal = Number(adultNum) + Number(childNum),
          passNum =  (passNumTotal >= 1) ? `${passNumTotal} travelers` : `${passNumTotal} traveler`,
          ticketType = classType.replace(/Class/g,''),
          tripType = (isRoundTicketChosen) ? 'Round trip' : 'One way',
          date = (isRoundTicketChosen) ? `${departDate} - ${destinationDate}` : `${departDate}`;

    this.setState ({ route, passNum, passNumTotal, ticketType, tripType, date, isRoundTicketChosen, isOneWayTicketChosen });
  }

  render() {
    const { isModalShown, isCheckboxChecked, isOneWayTicketChosen, isRoundTicketChosen, isLuggageNumShown, error,
            route, passNum, ticketType, tripType, date, chosenSeats, chosenSeatsNum } = this.state;

    const errorClass = classNames('inline-error',{
      'inline-error--show': error
    }); 

    const checkBoxClass = classNames('checkmark checkmark--modal',{
        'checkmark--checked': isCheckboxChecked
    });

    const bookFormClass = classNames('book-form',{
        'book-form--oneway': isOneWayTicketChosen,
        'book-form--round-ticket': isRoundTicketChosen
    });

    const luggageNumClass = classNames('luggage-presence luggage-presence--num',{
      'luggage-presence--shown': isLuggageNumShown
    });

    const seatDataItemRowA = []; 
    const seatDataItemRowB = [];
    const seatDataItemRowC = []; 
    const seatDataItemRowD = []; 
    const seatDataItemRowE = []; 
    
    seatData.forEach(function(el) {
       if ( el.row === "A" ) {
        seatDataItemRowA.push(el)
       } else if ( el.row === "B" ) {
        seatDataItemRowB.push(el)
       } else if ( el.row === "C" ) {
        seatDataItemRowC.push(el)
       } else if ( el.row === "D" ) {
        seatDataItemRowD.push(el)
       } else {
        seatDataItemRowE.push(el)
       }
    });

    const seatsRowA = seatDataItemRowA.map( item => <Seat item={item} key={item.id} row={item.row} /> )
    const seatsRowB = seatDataItemRowB.map( item => <Seat item={item} key={item.id} row={item.row} /> )
    const seatsRowC = seatDataItemRowC.map( item => <Seat item={item} key={item.id} row={item.row} /> )
    const seatsRowD = seatDataItemRowD.map( item => <Seat item={item} key={item.id} row={item.row} /> )
    const seatsRowE = seatDataItemRowE.map( item => <Seat item={item} key={item.id} row={item.row} /> )
   
    if ( this.state.isLoading === true) {
      return <ReactLoading className="loading-spinner" type="spin" color='#fff' height={50} width={50} />;
    } else {
      return (
        <React.Fragment>
          <MainHeader />
          <div className={bookFormClass}>
          <h2 className="book-form__title">Book the flight</h2>
          <div className="book-form__flights">
              <span className="flights__title">recommended flights</span>
              <FlightInfo companyName='s7'
                          departTime='5:50 AM'
                          returnTime="8:30 AM"
                          action={this.showModal} />
              <FlightInfo companyName='Lufthansa'
                          departTime='5:50 AM'
                          returnTime="8:30 AM"
                          action={this.showModal} />
              <FlightInfo companyName='Ryanair'
                          departTime='5:50 AM'
                          returnTime="8:30 AM"
                          action={this.showModal} />
              <FlightInfo companyName='Alitalia'
                          departTime='5:50 AM'
                          returnTime="8:30 AM"
                          action={this.showModal} />
          </div>
          <Modal show={isModalShown} 
                  handleClose={this.hideModal}
                  modalMainClass="modal-main--booking">
                <div className="modal-booking">
                     <span className="modal-booking__destination">{route}</span>
                     <span className="modal-booking__info">
                          <span className="info__dates">{date}</span>
                          <span className="info__ticket-type">{tripType}</span>
                          <span className="info__people-num">{passNum}</span>
                          <span className="info__class-type">{ticketType}</span>
                     </span>
                     <div className="seats-scheme">
                          <span className="seats-scheme__title">Choose a seat</span>
                          <div className="seats-scheme__wrapper">
                              <div className="seats-row">
                                  <span className='row-name'>A</span>
                                  <div className="seats-wrapper"
                                       onClick={this.handleSeatClick}>{seatsRowA}</div>
                              </div>
                              <div className="seats-row">
                                  <span className='row-name'>B</span>
                                  <div className="seats-wrapper"
                                       onClick={this.handleSeatClick}>{seatsRowB}</div>
                              </div>
                              <div className="seats-row">
                                  <span className='row-name'>C</span>
                                  <div className="seats-wrapper"
                                       onClick={this.handleSeatClick}>{seatsRowC}</div>
                              </div>
                              <div className="seats-row">
                                  <span className='row-name'>D</span>
                                  <div className="seats-wrapper"
                                       onClick={this.handleSeatClick}>{seatsRowD}</div>
                              </div>
                              <div className="seats-row">
                                  <span className='row-name'>E</span>
                                  <div className="seats-wrapper"
                                       onClick={this.handleSeatClick}>{seatsRowE}</div>
                              </div>
                          </div>
                          <div className='seats-scheme__legend'>
                           <div className="legend-item">
                              <div className="legend-item__icon legend-item__icon--available"></div>
                              <span className="legend-item__caption">available</span>
                           </div>
                           <div className="legend-item">
                              <div className="legend-item__icon legend-item__icon--not-available"></div>
                              <span className="legend-item__caption">not available</span>
                           </div>
                           <div className="legend-item">
                              <div className="legend-item__icon legend-item__icon--booked"></div>
                              <span className="legend-item__caption">booking</span>
                           </div>
                          </div>
                          <p className='seats-scheme__caption'>Your seats ({chosenSeatsNum}): {chosenSeats} </p>
                     </div>
                     <div className="modal-booking__luggage">
                          <div className="luggage-presence">
                              <span className="luggage-presence__question">Do you have luggage?</span>
                              <div className="luggage-presence__answer"
                                  onClick={this.handleCheckboxClick}>
                                  <label className="luggage-presence__answer-text">Yes</label>
                                  <span className={checkBoxClass}
                                        tabIndex="0" 
                                        role="checkbox" 
                                        aria-checked="true">
                                   </span>
                              </div>
                          </div>
                          <div className={luggageNumClass}>
                              <span className="luggage-presence__question">How many pieces of luggage do you have?</span>
                              <div className="luggage-presence__answer">
                                  <label className="luggage-presence__answer-text">piece</label>
                                  <FormInput customClassName="luggage-presence__answer-input" action={this.handleLuggageInput}/>
                              </div>
                          </div>
                     </div>
                </div>
                <InlineError className={errorClass} formErrors={error}/>
                <Button caption="calculate"
                        action={this.handleFormSubmit} />
                <button className="modal__close-btn"
                        onClick={this.hideModal} >
                  <div className="close-btn__icon-wrapper"></div>
                </button>
          </Modal>
        </div> 
        </React.Fragment>
      );
    }
   
  }
}

export default (withRouter(BookForm));