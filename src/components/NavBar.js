import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../actions/currentUser';


const NavBar = ({ logout }) => {

  return (
    <div className="NavBar">
      <NavLink exact activeclass="true" to ="/">
        Home
      </NavLink>
       |
      <NavLink exact activeclass="true" to="/diaries">
        Diaries
      </NavLink>
       |
      <NavLink exact activeclass="true" to="/exercises">
        Exercises
      </NavLink>
       |
      <NavLink exact to="/logout" onClick={logout}>
        Log Out
      </NavLink>
    </div>
  )
}

export default connect(null, { logout })(NavBar);
