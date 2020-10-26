import React from 'react'
// import Login from './Login'
// import SignUp from './SignUp'
import { Link } from 'react-router-dom'

import Fruit from './icons/Fruit';
import Dumbbell from './icons/Dumbbell';
import WeightScale from './icons/WeightScale';
import FoodDiary from './icons/FoodDiary';

const Home = ({}) => (
  <div className="welcome-container center-align">
    <h2>React Fitness</h2>
    <div className="icon-container">
      <div className="row">
        <div className="col-sm">
          <Fruit />
        </div>
        <div className="col-sm">
          <FoodDiary />
        </div>
        <div className="col-sm">
          <Dumbbell />
        </div>
        <div className="col-sm">
          <WeightScale />
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
);

export default Home;
