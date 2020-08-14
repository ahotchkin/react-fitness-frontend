import React from 'react';
import { connect } from 'react-redux';
import Login from './Login'
import Logout from './Logout'

const NavBar = ({ currentUser }) => {

  return (
    <div className="NavBar">
      { currentUser ? <h2>Welcome, {currentUser.attributes.username}!</h2> : "" }
      <button>Log In</button>
      OR
      <button>Sign Up</button>
      {/* { currentUser ? <Logout /> : <Login /> } */}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(NavBar);
