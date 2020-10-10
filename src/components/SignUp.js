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
    lifestyle: "",
  }


  calculateDailyCalorieGoal = () => {
    // add conditional so this is never under 1200
    let bmr = 0
    //
    let activity = 0

    if (this.state.lifestyle === "notActive") {
      activity = 1.3
    } else if (this.state.lifestyle === "lightlyActive") {
      activity = 1.55
    } else if (this.state.lifestyle === "moderatelyActive") {
      activity = 1.65
    } else if (this.state.lifestyle === "veryActive") {
      activity = 1.8
    }


    if (this.state.gender === "male") {
      // BMR = 10W + 6.25H - 5A + 5
      bmr = ((10 * (parseFloat(this.state.weight) * 0.453592)) + (6.25 * (((parseInt(this.state.height_feet) * 12) + parseFloat(this.state.height_inches)) * 2.54)) - (5 * parseInt(this.state.age)) + 5) * activity
    } else if (this.state.gender === "female") {
      // BMR = 10W + 6.25H - 5A - 161
      bmr = (10 * ((parseFloat(this.state.weight) * 0.453592)) + (6.25 * (((parseInt(this.state.height_feet) * 12) + parseFloat(this.state.height_inches)) * 2.54)) - (5 * parseInt(this.state.age)) - 161) * activity

    }
    console.log(parseInt(bmr))
    return parseInt(bmr)
    // console.log(this.state.lifestyle)
    // console.log(activity)
    // return activity
    // Mifflin-St Jeor Equation:
    // For men:
    // BMR = 10W + 6.25H - 5A + 5
    // For women:
    // BMR = 10W + 6.25H - 5A - 161

    // W is body weight in kg
    // H is body height in cm
    // A is age

    // to get weight from lbs to kg => * by 0.453592
    // to get height from ft to cm => ((height_feet * 12) + height_inches) * 2.54

    // Lifestyle:
    // Not active: * 1.3
    // Lightly active: * 1.55
    // Moderately active: * 1.65
    // Very active: * 1.8

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
    const dailyCalorieGoal = this.calculateDailyCalorieGoal()
    {console.log(dailyCalorieGoal)}

    this.props.signUp(this.state, dailyCalorieGoal, this.props.history)
    this.setState({
      username: "",
      password: "",
      gender: "",
      age: "",
      height_feet: "",
      height_inches: "",
      weight: "",
      lifestyle: "",
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
          {/*
          <select name="gender" defaultValue="DEFAULT" onChange={this.handleOnChange}>
            <option value="DEFAULT" disabled hidden>Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          */}

          <input
            type="radio"
            name="gender"
            value="male"
            onChange={this.handleOnChange}
          />
          <label>Male</label>

          <input
            type="radio"
            name="gender"
            value="female"
            onChange={this.handleOnChange}
          />
          <label>Female</label><br />
          {/*
          <input type="radio" id="other" name="gender" value="other">
          <label for="other">Other</label>
          */}

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

          <br /><br />

          <label>Lifestyle (does not include exercise): </label>
          <br />
          <input
            type="radio"
            name="lifestyle"
            value="notActive"
            onChange={this.handleOnChange}
          />
          <label>Not Very Active: Typical office job, sitting at a desk for most of the day</label>
          <br />
          <input
            type="radio"
            name="lifestyle"
            value="lightlyActive"
            onChange={this.handleOnChange}
          />
          <label>Lightly Active: On your feet all day (i.e. teacher, restaurant server)</label>
          <br />
          <input
            type="radio"
            name="lifestyle"
            value="moderatelyActive"
            onChange={this.handleOnChange}
          />
          <label>Moderately Active: Job that requires physical activity (i.e. landscaping, cleaning, maintenance)</label>
          <br />
          <input
            type="radio"
            name="lifestyle"
            value="veryActive"
            onChange={this.handleOnChange}
          />
          <label>Very Active: Job that requires heavy manual labor (i.e. construction, dancer, athlete)</label>

          <br /><br />

          <input type="submit" value="Sign Up" />
        </form>

        <br />

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
