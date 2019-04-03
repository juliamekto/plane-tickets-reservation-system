import React, { Component } from 'react';
import classNames from 'classnames/bind';
import FormInput from '../../FormInput.jsx';
import FormInputDate from '../../FormInputDate.jsx';
import FormSelect from '../../FormSelect.jsx';
import Button from '../../Button.jsx';
import InlineError from '../../InlineError.jsx';
import './SearchForm.css';

const REG_EXP_CITY_VALIDATION = /^[a-zA-Z]+$/;
const REG_EXP_PASSENGER_NUM_VALIDATION = /^\d+$/;

class SearchForm extends Component {
     state = {
          isOneWayTicketChosen: false,
          isRoundTicketChosen: true,
          departureCity: '',
          destinationCity: '',
          departureDate: '',
          destinationDate: '',
          classType: '',
          adultNum: '',
          childNum: '',
          isDepartureCityValid: true,
          isDestinationCityValid: true,
          isDepartureDateValid: true,
          isDestinationDateValid: true,
          isClassTypeValid: true,
          isAdultNumValid: true,
          isChildNumValid: true,
          isFormValid: false,
          error: ''
     }

  handleOneTicketBtn = () => this.setState(({ isOneWayTicketChosen }) => ( { isOneWayTicketChosen: !isOneWayTicketChosen, isRoundTicketChosen: false }));

  handleRoundTicketBtn = () => this.setState(({ isRoundTicketChosen }) => ( { isRoundTicketChosen: !isRoundTicketChosen, isOneWayTicketChosen: false }));
  
  handleInput = ({ target: { name, value } }) => {
     if (name === 'depatureCity') {
       this.validateCity(value,'depatureCity');
     } else if (name === 'destinationCity') {
       this.validateCity(value,'destinationCity');
     } else if (name === 'depatureDate') {
          this.validateDate(value,'depatureDate');
     } else if (name === 'destinationDate') {
          this.validateDate(value,'destinationDate');
     } else if (name === 'adultNum') {
          this.validatePassengerNum(value,'adultNum');
     } else if (name === 'childNum') {
          this.validatePassengerNum(value,'childNum');
     } else {
          this.validateClassType(value);
     }
   }

  validateCity = (value, fieldName) => {
     let { error } = this.state;
    
     if (fieldName === 'depatureCity') {
          if(!REG_EXP_CITY_VALIDATION.test(value)) {
               error = "only letters are allowed";
               this.setState ({ isDepartureCityValid: false, error });
               return;
          }
         
          this.setState ({ isDepartureCityValid: true, departureCity: value, error: '' }); 
     } else {
          if(!REG_EXP_CITY_VALIDATION.test(value)) {
               error = "only letters are allowed";
               this.setState ({ isDestinationCityValid: false, error });
               return;
             }
             
          this.setState ({ isDestinationCityValid: true, destinationCity: value, error: '' }); 
     }
  }

  validateDate = (value,fieldName) => {
       if (fieldName === 'depatureDate'){
          this.setState ({ departureDate: value });
       } else {
          this.setState ({ destinationDate: value }); 
       }
  }

  validatePassengerNum = (value,fieldName) => {
     let { error } = this.state;
     
     if (fieldName === 'adultNum') {
          if(!REG_EXP_PASSENGER_NUM_VALIDATION.test(value)) {
               error = "only numbers are allowed";
               this.setState ({ isAdultNumValid: false, error });
               return;
          }
         
          this.setState ({ isAdultNumValid: true, adultNum: value, error: '' }); 
     } else {
          if(!REG_EXP_PASSENGER_NUM_VALIDATION.test(value)) {
               error = "only numbers are allowed";
               this.setState ({ isChildNumValid: false, error });
               return;
             }
             
          this.setState ({ isChildNumValid: true, childNum: value, error: '' }); 
     }
  }

  validateClassType = (value) => {
     let { error } = this.state;
     
     if(value === 'default') {
          error = "please, choose class seat";
          this.setState ({ isClassTypeValid: false, error }); 
          return; 
     }

     this.setState ({ isClassTypeValid: true, classType: value, error: '' }); 
  }

  isFormValid = () => {
     let { isOneWayTicketChosen, isRoundTicketChosen, isDepartureCityValid, isDestinationCityValid, 
          isDepartureDateValid, isDestinationDateValid, isAdultNumValid, isChildNumValid,
          error, isClassTypeValid, isFormValid, departureCity, destinationCity,
          departureDate, destinationDate, classType, adultNum, childNum } = this.state;
     
     if(!isDepartureCityValid || !isDestinationCityValid || !isDepartureDateValid || !isDestinationDateValid || !isAdultNumValid || !isChildNumValid || !isClassTypeValid) {
          error = 'Invalid form. Please, check the information once again';
          this.setState ({ isFormValid: false, error });
     } else if (departureCity === '' && destinationCity === '' && departureDate === '' && destinationDate === '' && classType === '' && adultNum === '' && childNum === '') {
          error = 'Invalid form. Fields cannot be empty';
          this.setState ({ isFormValid: false, error });
     } else if (isOneWayTicketChosen === false && isRoundTicketChosen === false) {
          error = 'Choose one way or round ticket option';
          this.setState ({ isFormValid: false, error });
     } else if (classType === '') {
          error = "please, choose class seat";
          this.setState ({ isClassTypeValid: false, error, isFormValid: false }); 
     } else {
          isFormValid = true;
          error = '';
          this.setState ({ isFormValid, error});
     }

     return isFormValid;
  }

  handleFormSubmit = (e) => {
     e.preventDefault();
     let { departureCity, destinationCity, departureDate, destinationDate,
           classType, adultNum, childNum } = this.state;
     let flightSearchData;
     
     if (this.isFormValid()) {
        flightSearchData = { departureCity, destinationCity, departureDate, destinationDate, classType, adultNum, childNum }
        window.location.href = 'flight-booking';
     }
 
     return flightSearchData;
   }

  render() {
     const { isOneWayTicketChosen, isRoundTicketChosen, isDepartureCityValid, isDestinationCityValid, 
             isDepartureDateValid, isDestinationDateValid, isAdultNumValid, isChildNumValid,
             error, isClassTypeValid } = this.state;
     
     const errorClass = classNames('inline-error',{
          'inline-error--show': error !== ''
     }); 

     const oneWayTicketClass = classNames('search-form__btn',{
          'search-form__btn--active': isOneWayTicketChosen
     });

     const roundTicketClass = classNames('search-form__btn',{
          'search-form__btn--active': isRoundTicketChosen
     });

     const oneWayContent = classNames('search-form__content',{
          'search-form__content--one-way': isOneWayTicketChosen
     });

     const inputClassDepartureCity = classNames('default-input default-input--departure-city',{
          'default-input--invalid': !isDepartureCityValid 
     });

     const inputClassDestinationCity = classNames('default-input default-input--destination-city',{
          'default-input--invalid': !isDestinationCityValid
     });

     const inputClassDepartureDate = classNames('default-input default-input--departure-date',{
          'default-input--invalid': !isDepartureDateValid
     });

     const inputClassDestinationDate = classNames('default-input default-input--destination-date',{
          'default-input--invalid': !isDestinationDateValid
     });

     const inputClassAdultNum = classNames('default-input default-input--adult-num',{
          'default-input--invalid': !isAdultNumValid
     });

     const inputClassChildNum = classNames('default-input default-input--destination-city',{
          'default-input--invalid': !isChildNumValid
     });
     const selectClassType = classNames('default-input default-input--class-type',{
          'default-input--invalid': !isClassTypeValid
     });

    return (
      <div className="search">
        <h2 className="search__title">Find the flight</h2>
        <form className="search__form">
            <div className="search-form__header">
                <button className={oneWayTicketClass} type="button" onClick={this.handleOneTicketBtn}>one way</button>
                <button className={roundTicketClass} type="button" onClick={this.handleRoundTicketBtn}>round ticket</button>
            </div>
            <div className={oneWayContent}>
                <div className="search-form__input search-form__input--departure-city">
                     <label className="search-form__label">From</label>
                     <FormInput customClassName={inputClassDepartureCity}
                                name="depatureCity"
                                placeholder="city or airport"
                                action={this.handleInput}/>
                </div>
                <div className="search-form__input search-form__input--destination-city">
                     <label className="search-form__label">To</label>
                     <FormInput customClassName={inputClassDestinationCity}
                                name="destinationCity" 
                                placeholder="city or airport"
                                action={this.handleInput}/>
                </div>
                <div className="search-form__input search-form__input--departure-date">
                     <label className="search-form__label">Depart</label>
                     <FormInputDate customClassName={inputClassDepartureDate}
                                    name="depatureDate"  
                                    type="date"
                                    action={this.handleInput}/>
                </div>
               <div className="search-form__input search-form__input--destination-date">
                     <label className="search-form__label">Return</label>
                     <FormInputDate customClassName={inputClassDestinationDate}
                                    name="destinationDate"  
                                    type="date"
                                    action={this.handleInput}/>
                </div>
                <div className="search-form__input search-form__input--class-type">
                     <label className="search-form__label">Class</label>
                     <FormSelect name="classType"
                                 customClassName={selectClassType}
                                 action={this.handleInput}/>
                </div>
                <div className="search-form__input search-form__input--adult">
                     <label className="search-form__label">Adult(12+)</label>
                     <FormInput name="adultNum"  
                                placeholder="0"
                                action={this.handleInput}
                                customClassName={inputClassAdultNum}/>
                </div>
                <div className="search-form__input search-form__input--child">
                     <label className="search-form__label">Child(2-11 yrs)</label>
                     <FormInput name="childNum"  
                                placeholder="0"
                                action={this.handleInput}
                                customClassName={inputClassChildNum}/>
                </div>
               <Button className="search-form__send-btn button button--search-form-send" 
                         caption='show flights'
                         action={this.handleFormSubmit}/>
            </div>
        </form>
        <InlineError className={errorClass} formErrors={error}/>
      </div> 
    );
  }
}

export default SearchForm;