import React from 'react';
import { createStore} from 'redux';
import { Provider } from 'react-redux';
import combineReducers from './store/reducers/index'
import AppRouter from './components/AppRouter.jsx';
import './index.css';

const store = createStore(combineReducers);

const App = () => (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

export default App;
