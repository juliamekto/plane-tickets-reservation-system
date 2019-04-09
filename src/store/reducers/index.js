import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import authForm from '../../components/authorizationForm/reducers/authForm';
import registrationForm from '../../components/registrationForm/reducers/RegistrationForm'
import searchForm from "../../components/reservationSystem/searchForm/reducers/SearchForm.js";

export default combineReducers({
    routing: routerReducer,
    authForm: authForm,
    registrationForm: registrationForm,
    searchForm: searchForm
})