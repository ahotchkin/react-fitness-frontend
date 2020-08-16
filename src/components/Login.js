import React from 'react';
import { connect } from 'react-redux';
import { updateLoginForm } from '../actions/loginForm';
import { login } from '../actions/currentUser';


// Written in Redux - change to React? Make sure I understand what's going on here...
// *********** LOOK INTO HISTORY PROP TO UNDERSTAND WHAT THAT IS
  // 3 ROUTER PROPS: MATCH, HISTORY, LOCATION
      // match has params and will hold an object just like params hash in rails - keys and values will match the dynamic pieces of your url
      // history - where are we at any given time? Can "push" and change where you are; is special because it is a mutable object, you can mutate it on the fly
      // location

// take the history prop that you get from using route and pass it in to login - have access to history because Login is rendered directly as the result of a route
const Login = ({ loginFormData, updateLoginForm, login, history }) => {

  const handleInputChange = event => {
    const { name, value } = event.target
    const updatedFormInfo = {
      ...loginFormData,
      [name]: value
    }
    updateLoginForm(updatedFormInfo)
  }

  const handleSubmit = event => {
    event.preventDefault();
    login(loginFormData, history)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Username"
        value={loginFormData.username}
        name="username"
        type="text"
        onChange={handleInputChange}
      />
      <input
        placeholder="Password"
        value={loginFormData.password}
        name="password"
        type="text"
        onChange={handleInputChange}
      />
      <input type="submit" value="Log In" />
    </form>
  )
}

const mapStateToProps = state => {
  return {
    loginFormData: state.loginForm
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     updateLoginForm: formData => dispatch({type: "UPDATE_LOGIN_FORM", formData})
//   }
// }

export default connect(mapStateToProps, { updateLoginForm, login })(Login);
