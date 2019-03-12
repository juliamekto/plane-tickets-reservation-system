import React from 'react';
import { Link } from "react-router-dom";
import Button from '../Button.jsx';
import './Intro.css';

const Intro = () => {
    return (
      <section className="intro-wrapper">
          <h1 className="intro-wrapper__title">Welcome to a plane ticket resevation system!</h1>
          <Link to="/authorization"> 
                <Button type='button' 
                        caption="Let's start"
                /> 
          </Link>
      </section>
    );
}

export default Intro;