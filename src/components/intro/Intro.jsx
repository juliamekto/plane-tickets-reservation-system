import React, { Component } from 'react';
import Button from '../Button.jsx';
import firebaseConfig from '../firebase/firebase.js';
import './Intro.css';

class Intro extends Component {
  state = { 
      authenticated: false
  };

  UNSAFE_componentWillMount() {
      firebaseConfig.auth().onAuthStateChanged(user => {
          if (user) {
              this.setState({
                  authenticated: true,
                  currentUser: user
              });
          } else {
              this.setState({
                  authenticated: false,
                  currentUser: null
              });
          }
      });
  }

  handleClickButton = () => {
      const { authenticated } = this.state;
      (authenticated ) ? this.props.history.push('/flight-search') : this.props.history.push('/authorization');
  }

  render () {
    return  (
      <section className="intro-page">
          <h1 className="intro-page__title">Welcome to a plane ticket reservation system</h1>
            <Button className='button button--intro-btn'
                    type='button' 
                    caption="search flights"
                    action={this.handleClickButton}
            /> 
      </section>
    );
  }
}

export default Intro;