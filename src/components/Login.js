import React from 'react';
import { connect } from 'react-redux';
import { updateLoginForm } from '../actions/loginForm';
import { login } from '../actions/currentUser';


// Written in Redux - change to React? Make sure I understand what's going on here...

const Login = ({ loginFormData, updateLoginForm, login }) => {

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
    login(loginFormData)
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
