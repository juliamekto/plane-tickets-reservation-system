import React from 'react';
import { Link } from "react-router-dom";
import Button from '../Button.jsx';
import './Intro.css';

const Intro = () => (
  <section className="intro-page">
      <h1 className="intro-page__title">Welcome to a plane ticket reservation system</h1>
      <Link to="/authorization"> 
            <Button className='button button--intro-btn'
                    type='button' 
                    caption="search flights"
            /> 
      </Link>
  </section>
);

export default Intro;