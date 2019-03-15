import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import FormInput from '../../FormInput.jsx';
import Button from '../../Button.jsx';
import './SearchForm.css';

class SearchForm extends Component {
  state = {
    isModalShown: false,
    isCheckboxHovered: false,
    isCheckboxChecked: false
  }

  render() {

    return (
      <div className="search-form-wrapper">
        <h2 className="search-form-wrapper__title">Find the flight</h2>
        <form className="search-form">
            <div className="search-form__header">
                <button className="search-form__btn" type="button">one way</button>
                <button className="search-form__btn" type="button">round ticket</button>
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
                     <FormInput name="classType"  placeholder="economy"/>
                </div>
                <div className="search-form__input search-form__input_adult search-form__input_pass-type">
                     <label className="search-form__label">Adult(12+)</label>
                     <FormInput name="adultNum"  placeholder="0"/>
                </div>
                <div className="search-form__input search-form__input_child search-form__input_pass-type">
                     <label className="search-form__label">Child(2-11 yrs)</label>
                     <FormInput name="childrenNum"  placeholder="0"/>
                </div>
                <Button className="search-form__send-btn" caption='show flights'/>
            </div>
        </form>
      </div> 
    );
  }
}

export default SearchForm;