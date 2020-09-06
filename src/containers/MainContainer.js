import React from 'react';
import Logout from '../components/Logout'
import { Link } from 'react-router-dom';

const MainContainer = () => {
  return (
    <div className="MainContainer">
      In the main container now!
      <br />
      <Link to="/exercises">
        <button type="button">
          Exercises
        </button>
      </Link>
      <Logout />
    </div>
  )
}

export default MainContainer
