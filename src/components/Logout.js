import React from 'react';
import { connect } from 'react-redux';
// importing logout, an action creator
import { logout } from '../actions/currentUser';


// Written in Redux - change to React? Make sure I understand what's going on here...

// have logout as props, destructuring and using as a callback
const Logout = ({ logout }) => {

  return (
    <form onSubmit={logout}>
      <input type="submit" value="Log Out" />
    </form>
  )
}

// const mapDispatchToProps = dispatch => {
//   return {
//     updateLoginForm: formData => dispatch({type: "UPDATE_LOGIN_FORM", formData})
//   }
// }

// using logout in mapDispatchToProps object
export default connect(null, { logout })(Logout );
