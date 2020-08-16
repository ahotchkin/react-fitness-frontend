import React from 'react';
import { connect } from 'react-redux';

const NavBar = ({ currentUser }) => {

  return (
    <div className="NavBar">
      { currentUser ? <h2>Welcome, {currentUser.attributes.username}!</h2> : "" }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(NavBar);
