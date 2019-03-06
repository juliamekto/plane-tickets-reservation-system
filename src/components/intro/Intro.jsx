import React, { Component } from 'react';
import './Intro.css';
import { Link } from "react-router-dom";
import Button from '../Button.jsx';


class Intro extends Component {
  render() {
    return (
      <section className="intro-wrapper">
      <h1>Welcome to a plane ticket resevation system!</h1>
      <Link to="/AuthorizationForm"> <Button type="button" caption="Let's start"/> </Link>
      </section>
    );
  }
}

export default Intro;