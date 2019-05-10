import { combineReducers } from 'redux';
import authForm from '../../components/authorizationForm/reducers/authForm';
import registrationForm from '../../components/registrationForm/reducers/RegistrationForm'
import searchForm from "../../components/reservationSystem/searchForm/reducers/SearchForm.js";

export default combineReducers({
    authForm: authForm,
    registrationForm: registrationForm,
    searchForm: searchForm
})