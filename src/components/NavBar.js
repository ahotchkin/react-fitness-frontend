import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../actions/currentUser';

const NavBar = ({ logout }) => {

  return (
    <div className="navbar navbar-dark navbar-expand-lg">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" exact activeclass="true" to ="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact activeclass="true" to="/diaries">
              Meal Diary
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeclass="true" to="/exercises">
              Exercise
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeclass="true" to="/foods">
              Food Database
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/logout" onClick={logout}>
              Log Out
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default connect(null, { logout })(NavBar);
