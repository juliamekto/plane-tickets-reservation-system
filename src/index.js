import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import combineReducers from './store/reducers/index'
import App from './App';
import './index.css';


const store = createStore(combineReducers);

ReactDOM.render(<Provider store={store}>< App /> </Provider>, document.getElementById('root'));

