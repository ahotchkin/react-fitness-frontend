import React from 'react';
import Logout from '../components/Logout'
import { Link } from 'react-router-dom';

const MainContainer = () => {
  return (
    <div className="MainContainer">
      In the main container now!
      <br />
      <Link to="/diaries">
        <button>Diaries</button>
      </Link>
      <br />
      <Link to="/exercises">
        <button>Exercises</button>
      </Link>
      <br /><br />
      <Logout />
    </div>
  )
}

export default MainContainer
