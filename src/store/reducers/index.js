import { combineReducers } from 'redux';
import authForm from '../../components/authorizationForm/reducers/authForm';
import registrationForm from '../../components/registrationForm/reducers/RegistrationForm'
import searchForm from "../../components/reservationSystem/searchForm/reducers/SearchForm.js";
import bookForm from '../../components/reservationSystem/bookForm/reducers/BookForm.js';
import orderList from '../../components/reservationSystem/orderList/reducers/OrderList.js';

export default combineReducers({
    authForm: authForm,
    registrationForm: registrationForm,
    searchForm: searchForm,
    bookForm: bookForm,
    orderList: orderList
})