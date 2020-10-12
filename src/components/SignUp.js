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

    if (bmr < 1200) {
      bmr = 1200
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
        <h1 className="header">Create an Account</h1>
        <div className="form">
          <form onSubmit={this.handleOnSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                className="form-control"
                name="username"
                id="username"
                value={this.state.username}
                onChange={this.handleOnChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                value={this.state.password}
                onChange={this.handleOnChange}
              />
            </div>
            <div className="form-group">
              <label>Gender: </label>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="gender"
                  id="male"
                  value="male"
                  onChange={this.handleOnChange}
                />
                <label className="form-check-label" htmlFor="male">Male</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="gender"
                  id="female"
                  value="female"
                  onChange={this.handleOnChange}
                />
                <label className="form-check-label" htmlFor="female">Female</label><br />
              </div>
              {/*
              <input type="radio" id="other" name="gender" value="other">
              <label for="other">Other</label>
              */}
            </div>
            <div className="form-group">
              <label htmlFor="age">Age: </label>
              <input
                type="number"
                className="form-control"
                name="age"
                id="age"
                value={this.state.age}
                onChange={this.handleOnChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="height_feet">Height: </label>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    name="height_feet"
                    id="height_feet"
                    placeholder="Feet"
                    value={this.state.height_feet}
                    onChange={this.handleOnChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    name="height_inches"
                    id="height_inches"
                    placeholder="Inches"
                    value={this.state.height_inches}
                    onChange={this.handleOnChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="weight">Weight:</label>
              <input
                type="number"
                className="form-control"
                name="weight"
                id="weight"
                value={this.state.weight}
                onChange={this.handleOnChange}
              />
            </div>
            <div className="form-group">
              <label>Lifestyle (exercise will be tracked separately): </label>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="lifestyle"
                  id="notActive"
                  value="notActive"
                  onChange={this.handleOnChange}
                />
                <label className="form-check-label" htmlFor="notActive">Not Very Active: Typical office job, sitting at a desk for most of the day</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="lifestyle"
                  id="lightlyActive"
                  value="lightlyActive"
                  onChange={this.handleOnChange}
                />
                <label className="form-check-label" htmlFor="lightlyActive">Lightly Active: On your feet all day (i.e. teacher, restaurant server)</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="lifestyle"
                  id="moderatelyActive"
                  value="moderatelyActive"
                  onChange={this.handleOnChange}
                />
                <label className="form-check-label" htmlFor="moderatelyActive">Moderately Active: Job that requires physical activity (i.e. landscaping, cleaning, maintenance)</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="lifestyle"
                  id="veryActive"
                  value="veryActive"
                  onChange={this.handleOnChange}
                />
                <label className="form-check-label" htmlFor="veryActive">Very Active: Job that requires heavy manual labor (i.e. construction, dancer, athlete)</label>
              </div>
            </div>
            <input type="submit" className="btn btn-primary submit" value="Sign Up" />
          </form>
        </div>
        <div className="note">
          <p>Already have an account? Log in <Link to="/login">here</Link>.</p>
        </div>

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
