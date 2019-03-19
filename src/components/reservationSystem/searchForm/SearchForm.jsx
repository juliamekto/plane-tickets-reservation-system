import React, { Component } from 'react';
import classNames from 'classnames/bind';
import FormInput from '../../FormInput.jsx';
import FormSelect from '../../FormSelect.jsx';
import Button from '../../Button.jsx';
import './SearchForm.css';

class SearchForm extends Component {
     state = {
          isOneWayTicketChosen: false,
          isRoundTicketChosen: false
     }

  handleOneTicketBtn = () => this.setState(({ isOneWayTicketChosen, isRoundTicketChosen }) => ( { isOneWayTicketChosen: !isOneWayTicketChosen, isRoundTicketChosen: false }));

  handleRoundTicketBtn = () => this.setState(({ isRoundTicketChosen, isOneWayTicketChosen }) => ( { isRoundTicketChosen: !isRoundTicketChosen, isOneWayTicketChosen: false }));
  
  render() {
     const oneWayTicketClass = classNames('search-form__btn',{
          'search-form__btn--active': this.state.isOneWayTicketChosen
     });

     const roundTicketClass = classNames('search-form__btn',{
          'search-form__btn--active': this.state.isRoundTicketChosen
     });

     const oneWayContent = classNames('search-form__content',{
          'search-form__content--one-way': this.state.isOneWayTicketChosen
     });

    return (
      <div className="search-form-wrapper">
        <h2 className="search-form-wrapper__title">Find the flight</h2>
        <form className="search-form">
            <div className="search-form__header">
                <button className={oneWayTicketClass} type="button" onClick={this.handleOneTicketBtn}>one way</button>
                <button className={roundTicketClass} type="button" onClick={this.handleRoundTicketBtn}>round ticket</button>
            </div>
            <div className={oneWayContent}>
                <div className="search-form__input search-form__input--departure-city">
                     <label className="search-form__label">From</label>
                     <FormInput name="depatureCity" placeholder="city or airport"/>
                </div>
                <div className="search-form__input search-form__input--destination-city">
                     <label className="search-form__label">To</label>
                     <FormInput name="destinationCity"  placeholder="city or airport"/>
                </div>
                <div className="search-form__input search-form__input--departure-date">
                     <label className="search-form__label">Depart</label>
                     <FormInput name="depatureDate"  placeholder="mm/dd/yyyy"/>
                </div>
               <div className="search-form__input search-form__input--destination-date">
                     <label className="search-form__label">Return</label>
                     <FormInput name="destinationDate"  placeholder="mm/dd/yyyy"/>
                </div>
                <div className="search-form__input search-form__input--class-type">
                     <label className="search-form__label">Class</label>
                     <FormSelect name="classType"/>
                </div>
                <div className="search-form__input search-form__input--adult">
                     <label className="search-form__label">Adult(12+)</label>
                     <FormInput name="adultNum"  placeholder="0"/>
                </div>
                <div className="search-form__input search-form__input--child">
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