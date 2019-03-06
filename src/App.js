import React, { Component } from 'react';
import { Route } from "react-router-dom";
import './index.css';
import Intro from './components/intro/Intro';
import AuthorizationForm from './components/authorizationForm/AuthorizationForm'

class App extends Component {
  render() {
    return (
       <div>
         <Route path="/" exact component={Intro} />
         <Route path="/AuthorizationForm" exact component={AuthorizationForm} />
       </div>
    );
  }
}

export default App;
