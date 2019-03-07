import React, { Component } from 'react';
import { Route } from "react-router-dom";
import './index.css';
import Intro from './components/intro/Intro';
import AuthorizationForm from './components/authorizationForm/AuthorizationForm'
import Registration from './components/registrationForm/Registration'

class App extends Component {
  render() {
    return (
       <div>
         <Route path="/" exact component={Intro} />
         <Route path="/AuthorizationForm" exact component={AuthorizationForm} />
         <Route path="/Registration" exact component={Registration} />
       </div>
    );
  }
}

export default App;
