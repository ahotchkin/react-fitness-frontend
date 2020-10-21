import React from 'react'
// import Login from './Login'
// import SignUp from './SignUp'
import { Link } from 'react-router-dom'

import HealthyFood from './icons/HealthyFood';
import Barbell from './icons/Barbell';

const Home = ({}) => (
  <div className="welcome-container center-align">
    <h2>React Fitness</h2>
    <br />
    <span><HealthyFood />   </span>
    <span><Barbell />   </span>
    <br />
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
