import React from 'react';
import { connect } from 'react-redux';
import Login from './Login'
import Logout from './Logout'

const NavBar = ({ currentUser }) => {

  return (
    <div class="NavBar">
      { currentUser ? <h2>Welcome, {currentUser.attributes.username}!</h2> : "" }
      {/* move to navBar */}
      { currentUser ? <Logout /> : <Login /> }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(NavBar);
