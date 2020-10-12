import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../actions/currentUser';

const NavBar = ({ logout }) => {

  return (
    <div className="navbar navbar-dark">
      <NavLink className="nav-link" exact activeclass="true" to ="/">
        Home
      </NavLink>
      <NavLink className="nav-link" exact activeclass="true" to="/diaries">
        Meal Diary
      </NavLink>
      <NavLink className="nav-link" activeclass="true" to="/exercises">
        Exercise
      </NavLink>
      <NavLink className="nav-link" activeclass="true" to="/foods">
        Food Database
      </NavLink>
      <NavLink className="nav-link" exact to="/logout" onClick={logout}>
        Log Out
      </NavLink>
    </div>
  )
}

export default connect(null, { logout })(NavBar);
