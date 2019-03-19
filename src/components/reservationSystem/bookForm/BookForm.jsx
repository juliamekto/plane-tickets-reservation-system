import React, { Component } from 'react';
import { Link } from "react-router-dom";
import classNames from 'classnames/bind';
import FormInput from '../../FormInput.jsx';
import Modal from '../../modal/Modal.jsx';
import Button from '../../Button.jsx';

class SearchForm extends Component {
     state = {
        isModalShown: true,
     }
   
    showModal = (e) => {
        e.preventDefault();
        this.setState ({ isModalShown: true});
    }
    
    hideModal = () => this.setState({isModalShown : false});

  render() {
    const {isModalShown} = this.state;

    return (
      <div className="book-form-wrapper">
        <h2 className="book-form-wrapper__title">Book the flight</h2>
        <div className="book-form__flights">
            <span className="flights__title">recommended flights</span>
            <div className="flights__info">
                <span className="flights__airline-name">Lufthansa</span>
                <div className="flights__time">
                    <span className="flights__depart-time">6:40 AM </span> -
                    <span className="flights__return-time"> 9:40 AM</span>
                </div>
                <Button className="flights__btn button"
                        caption='view'
                        action={this.showModal}/>
            </div>
            <div className="flights__info">
                <span className="flights__airline-name">Ryanair</span>
                <div className="flights__time">
                    <span className="flights__depart-time">6:40 AM </span> -
                    <span className="flights__return-time"> 9:40 AM</span>
                </div>
                <Button className="flights__btn button"
                        caption='view'
                        action={this.showModal}/>
            </div>
            <div className="flights__info">
                <span className="flights__airline-name">Alitalia</span>
                <div className="flights__time">
                    <span className="flights__depart-time">6:40 AM </span> -
                    <span className="flights__return-time"> 9:40 AM</span>
                </div>
                <Button className="flights__btn button" 
                        caption='view'
                        action={this.showModal}/>
            </div>
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
                   <div className="modal-booking__seats-scheme">
                        <span className="seats-scheme__title">Choose a seat</span>
                        <div className="seats-scheme__wrapper">
                        </div>
                   </div>
                   <div className="modal-booking__luggage">
                        <div className="luggage-availability">
                            <span className="luggage-availability__question">Do you have luggage?</span>
                            <div className="luggage-availability__answer">
                                <label className="">Yes</label>
                                <FormInput type="checkbox"/>
                            </div>
                            <span className="luggage-availability__question">How many pieces of luggage do you have?</span>
                            <div className="luggage-availability__answer">
                                <label className="">piece</label>
                                <FormInput/>
                            </div>
                        </div>
                   </div>
              </div>
              <Link to="/flight-search" className="modal__route-link" onClick={this.hideModal}>
                    <Button caption="calculate" />
              </Link>
        </Modal>
      </div> 
    );
  }
}

export default SearchForm;