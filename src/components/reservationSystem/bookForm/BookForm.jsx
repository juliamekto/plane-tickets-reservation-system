import React, { Component } from 'react';
import { Link } from "react-router-dom";
import classNames from 'classnames/bind';
import FormInput from '../../FormInput.jsx';
import Modal from '../../modal/Modal.jsx';
import Button from '../../Button.jsx';
import Seat from '../bookForm/Seat.jsx';
import seatData from '../bookForm/SeatsData';
import FlightInfo from '../bookForm/FlightInfo.jsx';

class SearchForm extends Component {
     state = {
        isModalShown: false,
        isCheckboxChecked: false
     }
   
    showModal = (e) => {
        e.preventDefault();
        this.setState ({ isModalShown: true });
    }
    
    hideModal = () => this.setState({ isModalShown : false });

    handleCheckboxClick= () => this.setState(({ isCheckboxChecked }) => ( { isCheckboxChecked: !isCheckboxChecked }));

  render() {
    const { isModalShown, isCheckboxChecked } = this.state;

    const checkBoxClass = classNames('checkmark checkmark--modal',{
        'checkmark--checked': isCheckboxChecked
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

    const seatsRowA = seatDataItemRowA.map( item => <Seat item={item} key={item.id} row={item.row}/> )
    const seatsRowB = seatDataItemRowB.map( item => <Seat item={item} key={item.id}/> )

    return (
      <div className="book-form">
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
                   </div>
                   <div className="modal-booking__luggage">
                        <div className="luggage-availability">
                            <span className="luggage-availability__question">Do you have luggage?</span>
                            <div className="luggage-availability__answer"
                                onClick={this.handleCheckboxClick}>
                                <label className="luggage-availability__answer-text">Yes</label>
                                <span className={checkBoxClass}
                                      tabIndex="0" 
                                      role="checkbox" 
                                      aria-checked="true">
                                 </span>
                            </div>
                        </div>
                        <div className="luggage-availability">
                            <span className="luggage-availability__question">How many pieces of luggage do you have?</span>
                            <div className="luggage-availability__answer">
                                <label className="luggage-availability__answer-text">piece</label>
                                <FormInput customClassName="luggage-availability__answer-input"/>
                            </div>
                        </div>
                   </div>
              </div>
              <Link to="/success" className="modal__route-link--booking">
                    <Button caption="calculate" />
              </Link>
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