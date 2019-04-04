import React, { Component } from 'react';
import { Link } from "react-router-dom";
import classNames from 'classnames/bind';
import FormInput from '../../FormInput.jsx';
import Modal from '../../modal/Modal.jsx';
import Button from '../../Button.jsx';
import Seat from '../bookForm/Seat.jsx';
import seatData from '../bookForm/SeatsData';
import FlightInfo from '../bookForm/FlightInfo.jsx';
import InlineError from '../../InlineError.jsx';

const REG_EXP_LUGGAGE_NUM_VALIDATION = /^\d+$/;

class SearchForm extends Component {
     state = {
        isModalShown: true,
        isCheckboxChecked: false,
        isOneWayTicketChosen: false,
        isRoundTicketChosen: true,
        isLuggageNumShown: false,
        luggageNum: '',
        error: ''
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
        this.setState ({ luggageNum : '', error });
        return;
      }
      this.setState({ luggageNum : e.target.value, error: '' });
    }

    handleFormSubmit = (e) => {
      e.preventDefault();
      let { luggageNum } = this.state;
      let bookFormData;
      
      if (luggageNum !== '') {
          bookFormData = { luggageNum };
          window.location.href = 'success';
      }
  
      return bookFormData;
    }

  render() {
    const { isModalShown, isCheckboxChecked, isOneWayTicketChosen, isRoundTicketChosen, isLuggageNumShown, error } = this.state;

    const errorClass = classNames('inline-error',{
      'inline-error--show': error !== ''
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
    
    seatData.forEach(function(el) {
       if ( el.row === "A" ) {
        seatDataItemRowA.push(el)
       } else {
        seatDataItemRowB.push(el)
       }
    });

    const seatsRowA = seatDataItemRowA.map( item => <Seat item={item} key={item.id} row={item.row} seatNum={item.num}/> )
    const seatsRowB = seatDataItemRowB.map( item => <Seat item={item} key={item.id} row={item.row} seatNum={item.num}/> )

    return (
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
                   <span className="modal-booking__destination">Minsk - London</span>
                   <span className="modal-booking__info">
                        <span className="info__dates">12/03/19</span>
                        <span className="info__ticket-type">Round trip</span>
                        <span className="info__people-num">1 traveler</span>
                        <span className="info__class-type">Economy</span>
                   </span>
                   <div className="seats-scheme">
                        <span className="seats-scheme__title">Choose a seat</span>
                        <div className="seats-scheme__wrapper">
                            <div className="seats-row">
                                <span className='row-name'>A</span>
                                <div className="seats-wrapper">{seatsRowA}</div>
                            </div>
                            <div className="seats-row">
                                <span className='row-name'>B</span>
                                <div className="seats-wrapper">{seatsRowB}</div>
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
    );
  }
}

export default SearchForm;