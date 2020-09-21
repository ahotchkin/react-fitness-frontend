import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import { updateSignUpForm } from '../actions/signUpForm';
import { signUp } from '../actions/currentUser';

class SignUp extends Component {
  state = {
    username: "",
    password: "",
    gender: "",
    age: "",
    height_feet: "",
    height_inches: "",
    weight: "",
  }

  handleOnChange = event => {
    // what does this do????
    event.persist()

    this.setState({
      [event.target.name]: event.target.value
    }, console.log(`${[event.target.name]}: ${event.target.value}`))
  }

  handleOnSubmit = event => {
    event.preventDefault()

    this.props.signUp(this.state, this.props.history)
    this.setState({
      username: "",
      password: "",
      gender: "",
      age: "",
      height_feet: "",
      height_inches: "",
      weight: "",
    })

  }

  render() {
    return (
      <div>
        <h1>Create an Account</h1>
        <form onSubmit={this.handleOnSubmit}>
          <label>Username: </label>
          <input
            placeholder="Username"
            value={this.state.username}
            name="username"
            type="text"
            onChange={this.handleOnChange}
          />

          <br />

          <label>Password: </label>
          <input
            placeholder="Password"
            value={this.state.password}
            name="password"
            type="text"
            onChange={this.handleOnChange}
          />

          <br />

          <label>Gender: </label>
          <select name="gender" defaultValue="DEFAULT" onChange={this.handleOnChange}>
            <option value="DEFAULT" disabled hidden>Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <br />

          <label>Age: </label>
          <input
            placeholder="Age"
            value={this.state.age}
            name="age"
            type="text"
            onChange={this.handleOnChange}
          />

          <br />

          <label>Height: </label>
          <input
            placeholder="Feet"
            value={this.state.height_feet}
            name="height_feet"
            type="text"
            onChange={this.handleOnChange}
          />
          <input
            placeholder="Inches"
            value={this.state.height_inches}
            name="height_inches"
            type="text"
            onChange={this.handleOnChange}
          />

          <br />

          <label>Weight:</label>
          <input
            placeholder="Weight"
            value={this.state.weight}
            name="weight"
            type="text"
            onChange={this.handleOnChange}
          />

          <br />
          
          <input type="submit" value="Sign Up" />
        </form>

        <p>Already have an account? Log in <Link to="/login">here</Link>.</p>
      </div>
    )
  }

}
// Written in Redux - change to React? Make sure I understand what's going on here...

// const SignUp = ({ signUpFormData, updateSignUpForm, signUp, history }) => {
//
//   const handleInputChange = event => {
//     const { name, value } = event.target
//     const updatedFormInfo = {
//       ...signUpFormData,
//       [name]: value
//     }
//     updateSignUpForm(updatedFormInfo)
//   }
//
//   const handleSubmit = event => {
//     event.preventDefault();
//     signUp(signUpFormData, history)
//   }
//
//   return (
//     <form onSubmit={handleSubmit}>
//       <label>Username: </label>
//       <input
//         placeholder="Username"
//         value={signUpFormData.username}
//         name="username"
//         type="text"
//         onChange={handleInputChange}
//       />
//
//       <label>Password: </label>
//       <input
//         placeholder="Password"
//         value={signUpFormData.password}
//         name="password"
//         type="text"
//         onChange={handleInputChange}
//       />
//
//       <label>Gender: </label>
//       <select name="gender" defaultValue="DEFAULT" onChange={handleInputChange}>
//         <option value="DEFAULT" disabled hidden>Select</option>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//       </select>
//
//       <label>Age: </label>
//       <input
//         placeholder="Age"
//         value={signUpFormData.age}
//         name="age"
//         type="text"
//         onChange={handleInputChange}
//       />
//
//       <label>Height: </label>
//       <input
//         placeholder="Feet"
//         value={signUpFormData.height_feet}
//         name="height_feet"
//         type="text"
//         onChange={handleInputChange}
//       />
//       <input
//         placeholder="Inches"
//         value={signUpFormData.height_inches}
//         name="height_inches"
//         type="text"
//         onChange={handleInputChange}
//       />
//
//       <label>Weight:</label>
//       <input
//         placeholder="Weight"
//         value={signUpFormData.weight}
//         name="weight"
//         type="text"
//         onChange={handleInputChange}
//       />
//
//       <input type="submit" value="Sign Up" />
//     </form>
//   )
// }
//
// const mapStateToProps = state => {
//   return {
//     signUpFormData: state.signUpForm
//   }
// }
//
// const mapDispatchToProps = dispatch => {
//   return {
//     updateLoginForm: formData => dispatch({type: "UPDATE_LOGIN_FORM", formData})
//   }
// }

// export default connect(mapStateToProps, { updateSignUpForm, signUp })(SignUp);
export default connect(null, { signUp })(SignUp);
