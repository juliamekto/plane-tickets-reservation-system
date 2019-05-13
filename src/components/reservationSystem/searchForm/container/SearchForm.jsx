import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { withRouter  } from "react-router-dom";
import firebaseConfig from '../../../firebase/firebase.js';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import { getSearchFormData } from '../actions/SearchFormActions.js'
import FormInput from '../../../FormInput.jsx';
import FormInputDate from '../../../FormInputDate.jsx';
import FormSelect from '../../../FormSelect.jsx';
import Button from '../../../Button.jsx';
import InlineError from '../../../InlineError.jsx';
import MainHeader from '../../../MainHeader.jsx';
import PeopleCounter from '../../../PeopleCounter.jsx';

const REG_EXP_CITY_VALIDATION = /^[a-zA-Z]+$/;

class SearchForm extends Component {
     state = {
          isOneWayTicketChosen: false,
          isRoundTicketChosen: true,
          isDepartureCityValid: true,
          isDestinationCityValid: true,
          isDepartureDateValid: true,
          isDestinationDateValid: true,
          isClassTypeValid: true,
          isFormValid: false,
          error: '',
          isLoading: true
     }

     componentDidMount() {
          this.setState({ isLoading: false });
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

               this.props.onChangeDepartCity(value);
               this.setState ({ isDepartureCityValid: true, departureCity: value, error: '' }); 
          } else {
               if(!REG_EXP_CITY_VALIDATION.test(value)) {
                    error = "only letters are allowed";
                    this.setState ({ isDestinationCityValid: false, error });
                    return;
               }

               this.props.onChangeDestinationCity(value);
               this.setState ({ isDestinationCityValid: true, destinationCity: value, error: '' }); 
          }
     }

     validateDate = (value,fieldName) => {
          if (fieldName === 'depatureDate'){
          this.setState ({ departureDate: value });
          this.props.onChangeDepartDate(value);
          } else {
          this.setState ({ destinationDate: value }); 
          this.props.onChangeDestinationDate(value);
          }
     }

     validateClassType = value => {
          let { error } = this.state;

          if(value === 'default') {
               error = "please, choose class seat";
               this.setState ({ isClassTypeValid: false, error }); 
               return; 
          }

          this.props.onChangeClassType(value);
          this.setState ({ isClassTypeValid: true, classType: value, error: '' }); 
     }

     isFormValid = () => {
          let { isOneWayTicketChosen, isRoundTicketChosen, isDepartureCityValid, isDestinationCityValid, 
               isDepartureDateValid, isDestinationDateValid, error, isClassTypeValid, isFormValid } = this.state;

          const { departCity, destinationCity, departDate, destinationDate,
                    classType, adultNum, childNum } = this.props.searchForm;

          if(!isDepartureCityValid || !isDestinationCityValid || !isDepartureDateValid || !isDestinationDateValid || !isClassTypeValid) {
               error = 'Invalid form. Please, check the information once again';
               this.setState ({ isFormValid: false, error });
          } else if ( departCity === undefined && destinationCity === undefined && departDate === undefined && destinationDate === undefined && classType === undefined && adultNum === undefined && childNum === undefined) {
               error = 'Invalid form. Fields cannot be empty';
               this.setState ({ isFormValid: false, error });
          } else if (adultNum === 0 && childNum === 0) {
               error = 'Invalid form. Choose the number of travelers';
               this.setState ({ isFormValid: false, error });
          } else if (!isOneWayTicketChosen && !isRoundTicketChosen) {
               error = 'Choose one way or round ticket option';
               this.setState ({ isFormValid: false, error });
          } else if (classType === undefined) {
               error = "please, choose class seat";
               this.setState ({ isClassTypeValid: false, error, isFormValid: false }); 
          } else {
               isFormValid = true;
               error = '';
               this.setState ({ isFormValid, error});
          }

          return isFormValid;
     }

     handleFormSubmit = async e => {
          e.preventDefault();
          const { departCity, destinationCity, departDate, destinationDate,
                    classType, adultNum, childNum } = this.props.searchForm ;

          const { isRoundTicketChosen, isOneWayTicketChosen } = this.state;

          const ticketId = '_' + Math.random().toString(36).substr(2, 9); 

          let userId;
               
          if (this.isFormValid()) {
               try {
                    await firebaseConfig.auth().onAuthStateChanged((user) => {
                         (user) ? userId = user.uid : console.log('cannot get user id');
                    });

                    firebaseConfig.database().ref(`/users/${userId}/data/ticket/${ticketId}`).update({
                         ticketId,
                         departCity,
                         destinationCity,
                         departDate,
                         destinationDate: destinationDate || null,
                         classType,
                         adultNum,
                         childNum,
                         isRoundTicketChosen,
                         isOneWayTicketChosen,
                         confirmed: false
                    });

                    this.props.history.push(`/flight-booking/${userId}/${ticketId}`);
               
               } catch (error) {
                    this.setState ({ error: error.message });
               }
          }
     }

     increment = (value,method)  =>  method(value + 1)

     decrement = (value, method) => method(value - 1)

     incrementAdult = () => {
          const { adultNum } = this.props.searchForm;
          this.increment(adultNum,this.props.onChangeAdultNum)
     }

     decrementAdult = () => {
          const { adultNum } = this.props.searchForm;
          if (adultNum === 0) {
               return false
          }
          this.decrement(adultNum,this.props.onChangeAdultNum)
}

     incrementChild = () => {
          const { childNum } = this.props.searchForm;
          this.increment(childNum,this.props.onChangeChildNum)
     }

     decrementChild = () => {
          const { childNum } = this.props.searchForm;
          if (childNum === 0) {
               return false
          }
          this.decrement(childNum,this.props.onChangeChildNum)
     }

     render() {
          const { isOneWayTicketChosen, isRoundTicketChosen, isDepartureCityValid, isDestinationCityValid, 
               isDepartureDateValid, isDestinationDateValid, error, isClassTypeValid, isLoading } = this.state;
          
          const { adultNum, childNum } = this.props.searchForm;
          
          const errorClass = classNames('inline-error',{
               'inline-error--show': error 
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

          const selectClassType = classNames('default-input default-input--class-type',{
               'default-input--invalid': !isClassTypeValid
          });

          if (isLoading) {
               return <ReactLoading className="loading-spinner" type="spin" color='#fff' height={50} width={50} />;
          } else {
               return (
                    <React.Fragment>
                         <MainHeader />
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
                                        <PeopleCounter value={adultNum} increment={this.incrementAdult} decrement={this.decrementAdult}/>
                                   </div>
                                   <div className="search-form__input search-form__input--child">
                                        <label className="search-form__label">Child(2-11 yrs)</label>
                                        <PeopleCounter value={childNum} increment={this.incrementChild} decrement={this.decrementChild}/>
                                   </div>
                                   <Button className="search-form__send-btn button button--search-form-send" 
                                             caption='show flights'
                                             action={this.handleFormSubmit}/>
                              </div>
                         </form>
                         <InlineError className={errorClass} formErrors={error}/>
                         </div> 
                    </React.Fragment> 
               );
          }
     }
}

const mapStateToProps = state => ({ searchForm: state.searchForm });

const mapDistpatchToProps = dispatch => {
  return {
    onChangeDepartCity: value => dispatch(getSearchFormData( 'departCity', value )),
    onChangeDestinationCity: value => dispatch(getSearchFormData( 'destinationCity', value )),
    onChangeDepartDate: value => dispatch(getSearchFormData( 'departDate', value )),
    onChangeDestinationDate: value => dispatch(getSearchFormData( 'destinationDate', value )),
    onChangeAdultNum: value => dispatch(getSearchFormData( 'adultNum', value )),
    onChangeChildNum: value => dispatch(getSearchFormData( 'childNum', value )),
    onChangeClassType: value => dispatch(getSearchFormData( 'classType', value ))
  }
};

export default connect(mapStateToProps, mapDistpatchToProps)(withRouter(SearchForm)); 