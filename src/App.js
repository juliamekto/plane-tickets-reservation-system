import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import combineReducers from './store/reducers/index'
import { BrowserRouter, browserHistory  } from 'react-router-dom';
import AppRouter from './components/AppRouter.jsx';
import './index.css';

const store = createStore(combineReducers);
const history = syncHistoryWithStore(browserHistory,store);

const App = () => (
    <Provider store={store}>
        <BrowserRouter history={history}>
            <AppRouter />
        </BrowserRouter>
    </Provider>
)

export default App;
