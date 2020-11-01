import React from 'react'
import { Link } from 'react-router-dom'

import Footer from '../components/Footer';

import fruit from '../icons/fruit.svg';
import dumbbell from '../icons/dumbbell.svg';
import weightScale from '../icons/weightScale.svg';
import foodDiary from '../icons/foodDiary.svg';

const Home = () => (
  <div>
    <div className="welcome-container center-align">
      <h2>React Fitness</h2>
      {/* FIGURE OUT HOW TO MAKE THIS RESPONSIVE SO ICONS MOVE CLOSER TOGETHER RATHER THAN STACK */}
      <div className="container icon-container">
        <div className="row">
          <div className="col-sm">
            <img src={fruit} alt="Fruit" />
          </div>
          <div className="col-sm">
            <img src={foodDiary} alt="Food Diary" />
          </div>
          <div className="col-sm">
            <img src={dumbbell} alt="Dumbbell" />
          </div>
          <div className="col-sm">
            <img src={weightScale} alt="Scale" />
          </div>
        </div>
      </div>
      <Link to="/signup">
        <button className="btn btn-primary-fill btn-home" type="button">
          Sign Up
        </button>
      </Link>
      <Link to="/login">
        <button className="btn btn-primary-fill btn-home" type="button">
          Log In
        </button>
      </Link>
    </div>
    <div className="home-footer">
      <Footer />
    </div>
  </div>
);

export default Home;
