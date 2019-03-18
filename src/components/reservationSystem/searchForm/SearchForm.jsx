import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import classNames from 'classnames/bind';
import FormInput from '../../FormInput.jsx';
import FormSelect from '../../FormSelect.jsx';
import Button from '../../Button.jsx';
import './SearchForm.css';

class SearchForm extends Component {
     state = {
          isOneWayTicketChosen: false
     }


  handleTicketBtn = () => this.setState(({ isOneWayTicketChosen }) => ( { isOneWayTicketChosen: !isOneWayTicketChosen }));

  render() {
     
     const ticketTypeClass = classNames('search-form__btn',{
          'search-form__btn--active': this.state.isOneWayTicketChosen 
     });

    return (
      <div className="search-form-wrapper">
        <h2 className="search-form-wrapper__title">Find the flight</h2>
        <form className="search-form">
            <div className="search-form__header" onClick={this.handleTicketBtn}>
                <button className={ticketTypeClass} type="button">one way</button>
                <button className={ticketTypeClass} type="button">round ticket</button>
            </div>
            <div className="search-form__content">
                <div className="search-form__input search-form__input_departure-city">
                     <label className="search-form__label">From</label>
                     <FormInput name="depatureCity" placeholder="city or airport"/>
                </div>
                <div className="search-form__input search-form__input_destination-city">
                     <label className="search-form__label">To</label>
                     <FormInput name="destinationCity"  placeholder="city or airport"/>
                </div>
                <div className="search-form__input search-form__input_departure-date">
                     <label className="search-form__label">Depart</label>
                     <FormInput name="depatureDate"  placeholder="mm/dd/yyyy"/>
                </div>
                <div className="search-form__input search-form__input_destination-date">
                     <label className="search-form__label">Return</label>
                     <FormInput name="destinationDate"  placeholder="mm/dd/yyyy"/>
                </div>
                <div className="search-form__input search-form__input_class-type">
                     <label className="search-form__label">Class</label>
                     <FormSelect name="classType"/>
                </div>
                <div className="search-form__input search-form__input_adult search-form__input_pass-type">
                     <label className="search-form__label">Adult(12+)</label>
                     <FormInput name="adultNum"  placeholder="0"/>
                </div>
                <div className="search-form__input search-form__input_child search-form__input_pass-type">
                     <label className="search-form__label">Child(2-11 yrs)</label>
                     <FormInput name="childrenNum"  placeholder="0"/>
                </div>
                <Button className="search-form__send-btn button" caption='show flights'/>
            </div>
        </form>
      </div> 
    );
  }
}

export default SearchForm;