import React from 'react'
import Login from './Login'
import SignUp from './SignUp'
import { Link } from 'react-router-dom'

const Home = ({}) => (
  <div>
    <h2>Welcome to React Fitness!</h2>
    <Link to="/signup">
      <button type="button">
        Sign Up
      </button>
    </Link>
    <Link to="/login">
      <button type="button">
        Log In
      </button>
    </Link>
  </div>
);

export default Home;
