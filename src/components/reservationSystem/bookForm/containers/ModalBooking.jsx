import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { withRouter  } from "react-router-dom";
import { hideModal, isRoundTicketChosen, isOneWayTicketChosen, isTicketInfoAvailable, isTimerStarted } from '../actions/BookFormActions.js';
import firebaseConfig from '../../../firebase/firebase.js';
import ReactLoading from 'react-loading';
import FormInput from '../../../FormInput.jsx';
import Modal from '../../../modal/Modal.jsx';
import Button from '../../../Button.jsx';
import Seat from '../Seat.jsx';
import seatData from '../SeatsData';
import InlineError from '../../../InlineError.jsx';
import SeatRow from '../SeatRow.jsx';
import Timer from '../Timer.jsx'

const REG_EXP_LUGGAGE_NUM_VALIDATION = /^\d+$/;

class ModalBooking extends Component {
    state = {
      isCheckboxChecked: false,
      isLuggageNumShown: false,
      luggageNum: null,
      error: '',
      chosenSeats: [],
      chosenSeatsNum: 0,
      isLoading: true,
      isFormValid: false
  }
  
  componentDidMount = async () => {
   let userId;
   await firebaseConfig.auth().onAuthStateChanged(user => {
      (user) ? userId = user.uid : console.log('cannot get user ID');
    });

    const ticketId = this.getTicketId();

    if(ticketId === 'flight-booking') {
      this.props.checkTicketInfo(false);
    } else {
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
  }

  handleSeatClick= e => {
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

    this.props.startTimer(true);
  }

  increment = () =>  this.setState({ chosenSeatsNum: this.state.chosenSeatsNum + 1 });

  decrement = () => this.setState({ chosenSeatsNum: this.state.chosenSeatsNum - 1 });

  getTicketId = () => {
    let ticketId = this.props.location.pathname,
        ticketIdPart = ticketId.lastIndexOf('/') + 1;
    
    ticketId = ticketId.substr(ticketIdPart)
   
    return ticketId;
  }

  hideModal = () =>  this.props.hideModal();

  handleCheckboxClick= () => this.setState(({ isCheckboxChecked, isLuggageNumShown }) => ( { isCheckboxChecked: !isCheckboxChecked, isLuggageNumShown: !isLuggageNumShown }));

  handleLuggageInput = e => {
    let { error } = this.state;
    if(!REG_EXP_LUGGAGE_NUM_VALIDATION.test(e.target.value)) {
      error = "only numbers are allowed";
      this.setState ({ luggageNum : null, error });
      return;
    }
    this.setState({ luggageNum : e.target.value, error: '' });
  }

  isFormValid = () => {
    const { chosenSeats, isLuggageNumShown, luggageNum, passNumTotal } = this.state
    let { error, isFormValid } = this.state;

   if (chosenSeats.length === 0) {
      error = 'please, choose the seats'
      this.setState ({ error, isFormValid: false })
   } else if ( isLuggageNumShown && luggageNum === null) {
      error = 'please, enter the amount of your luggage'
      this.setState ({ error, isFormValid: false })
   } else if (chosenSeats.length < passNumTotal){
      error= 'the number of chosen seats does not match the number of travelers'
      this.setState ({ error, isFormValid: false })
   } else {
      error = ''
      isFormValid = true;
      this.setState ({ error, isFormValid })
   }

   return isFormValid;
  
  }

  handleFormSubmit = async e => {
    e.preventDefault();
    const { luggageNum, chosenSeats } = this.state;
    const ticketId =  this.getTicketId();
    let userId;
    
    if (this.isFormValid()) {
      try {
        await firebaseConfig.auth().onAuthStateChanged((user) => {
            (user) ? userId = user.uid :  console.log('cannot get user ID');
        });

        firebaseConfig.database().ref(`/users/${userId}/data/ticket/${ticketId}`).update({
            luggageNum,
            chosenSeats
        }); 

        this.props.history.push(`/success/${ticketId}`);

      } catch (error) {
        this.setState ({ error: error.message });
      }
    }
  }

  getTicketInfo = () => {
    const { departCity, destinationCity, adultNum, childNum, classType, isRoundTicketChosen, isOneWayTicketChosen,  departDate, destinationDate } = this.state.fetchedData;
    const route = `${departCity} - ${destinationCity}`,
          passNumTotal = Number(adultNum) + Number(childNum),
          passNum =  (passNumTotal < 2) ? `${passNumTotal} traveler` : `${passNumTotal} travelers`,
          ticketType = classType.replace(/Class/g,''),
          tripType = (isRoundTicketChosen) ? 'Round trip' : 'One way',
          date = (isRoundTicketChosen) ? `${departDate} - ${destinationDate}` : `${departDate}`;
    
    (isRoundTicketChosen) ? this.props.chooseRoundTicket(true) : this.props.chooseRoundTicket(false);
    (isOneWayTicketChosen) ? this.props.chooseOnewayTicket(true) : this.props.chooseOnewayTicket(false);

    this.setState ({ route, passNum, passNumTotal, ticketType, tripType, date });
  }

  render() {
    const { isCheckboxChecked, isLuggageNumShown, error, route, passNum, 
           ticketType, tripType, date, chosenSeats, chosenSeatsNum, isLoading } = this.state;
    const { isModalShown } = this.props.bookForm;

    const errorClass = classNames('inline-error',{
      'inline-error--show': error
    }); 

    const checkBoxClass = classNames('checkmark checkmark--modal',{
        'checkmark--checked': isCheckboxChecked
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
   
    if (isLoading === true) {
      return <ReactLoading className="loading-spinner" type="spin" color='#fff' height={50} width={50} />;
    } else {
      return (
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
                              <SeatRow  action={this.handleSeatClick} seatRow={seatsRowA} rowName='A'/>
                              <SeatRow  action={this.handleSeatClick} seatRow={seatsRowB} rowName='B'/>
                              <SeatRow  action={this.handleSeatClick} seatRow={seatsRowC} rowName='C'/>
                              <SeatRow  action={this.handleSeatClick} seatRow={seatsRowD} rowName='D'/>
                              <SeatRow  action={this.handleSeatClick} seatRow={seatsRowE} rowName='E'/>
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
                          <Timer />
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
      );
    }
  }
}

const mapStateToProps = state => ({ bookForm: state.bookForm });

const mapDistpatchToProps = dispatch => {
  return {
    hideModal: () => dispatch(hideModal()),
    chooseRoundTicket: value => dispatch(isRoundTicketChosen( value )),
    chooseOnewayTicket: value => dispatch(isOneWayTicketChosen( value )),
    checkTicketInfo: value => dispatch(isTicketInfoAvailable( value )),
    startTimer: value => dispatch(isTimerStarted( value ))
  }
};
export default connect(mapStateToProps, mapDistpatchToProps)(withRouter(ModalBooking));