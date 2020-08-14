import React from 'react';
import { connect } from 'react-redux';
import { updateSignUpForm } from '../actions/signUpForm';
import { signUp } from '../actions/currentUser';


// Written in Redux - change to React? Make sure I understand what's going on here...

const Login = ({ signUpFormData, updateSignUpForm, signUp }) => {

  const handleInputChange = event => {
    const { name, value } = event.target
    const updatedFormInfo = {
      ...signUpFormData,
      [name]: value
    }
    updateSignUpForm(updatedFormInfo)
  }

  const handleSubmit = event => {
    event.preventDefault();
    signUp(signUpFormData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input
        placeholder="Username"
        value={signUpFormData.username}
        name="username"
        type="text"
        onChange={handleInputChange}
      />

      <label>Password:</label>
      <input
        placeholder="Password"
        value={signUpFormData.password}
        name="password"
        type="text"
        onChange={handleInputChange}
      />

      <label>Gender:</label>
      <select name="gender" defaultValue="DEFAULT" onChange={handleInputChange}>
        <option value="DEFAULT" disabled hidden>Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <label>Age:</label>
      <input
        placeholder="Age"
        value={signUpFormData.age}
        name="age"
        type="text"
        onChange={handleInputChange}
      />

      <label>Height:</label>
      <input
        placeholder="Feet"
        value={signUpFormData.height_feet}
        name="height_feet"
        type="text"
        onChange={handleInputChange}
      />
      <input
        placeholder="Inches"
        value={signUpFormData.height_inches}
        name="height_inches"
        type="text"
        onChange={handleInputChange}
      />

      <label>Weight:</label>
      <input
        placeholder="Weight"
        value={signUpFormData.weight}
        name="weight"
        type="text"
        onChange={handleInputChange}
      />

      <input type="submit" value="Sign Up" />
    </form>
  )
}

const mapStateToProps = state => {
  return {
    signUpFormData: state.signUpForm
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     updateLoginForm: formData => dispatch({type: "UPDATE_LOGIN_FORM", formData})
//   }
// }

export default connect(mapStateToProps, { updateSignUpForm, signUp })(Login);
