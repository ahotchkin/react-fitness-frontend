import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
    submitted: false
  }


  calculateDailyCalorieGoal = () => {
    let bmr = 0
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

    return parseInt(bmr)

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

  calculateDailyNutrientGoals = () => {
    const dailyCalorieGoal = this.calculateDailyCalorieGoal()
    const nutrientGoals = {}
    nutrientGoals.fat = parseInt((dailyCalorieGoal * .30) / 9)
    nutrientGoals.saturatedFat = parseInt((dailyCalorieGoal * .07) / 9)
    nutrientGoals.polyunsaturatedFat = parseInt((dailyCalorieGoal * .10) / 9)
    nutrientGoals.monounsaturatedFat = parseInt((dailyCalorieGoal * .20) / 9)
    nutrientGoals.carbohydrate = parseInt((dailyCalorieGoal * .50) / 4)

    if (this.state.gender === "male") {
      nutrientGoals.sugar = 38
    } else if (this.state.gender === "female") {
      nutrientGoals.sugar = 25
    }

    nutrientGoals.protein = parseInt((dailyCalorieGoal * .20) / 4)

    if (this.state.gender === "male") {
      nutrientGoals.vitaminA = 900
    } else if (this.state.gender === "female") {
      nutrientGoals.vitaminA = 700
    }

    if (this.state.gender === "male") {
      nutrientGoals.vitaminC = 90
    } else if (this.state.gender === "female") {
      nutrientGoals.vitaminC = 75
    }

    if (parseInt(this.state.age) <= 70) {
      nutrientGoals.vitaminD = 15
    } else if (parseInt(this.state.age) >= 71) {
      nutrientGoals.vitaminD = 20
    }

    if ((parseInt(this.state.age) <= 50) || (parseInt(this.state.age) >= 51 && parseInt(this.state.age) <= 70 && this.state.gender === "male")) {
      nutrientGoals.calcium = 1000
    } else if ((parseInt(this.state.age)) >= 71 || (parseInt(this.state.age) >= 51 && parseInt(this.state.age) <= 70 && this.state.gender === "female")) {
      nutrientGoals.calcium = 1200
    }

    if ((parseInt(this.state.age) <= 50 && this.state.gender === "male") || (parseInt(this.state.age) >= 51)) {
      nutrientGoals.iron = 8
    } else if (parseInt(this.state.age) <= 50 && this.state.gender === "female") {
      nutrientGoals.iron = 18
    }

    return nutrientGoals
  }

  handleOnChange = event => {
    // what does this do????
    event.persist()

    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleOnClick = event => {
    this.setState({
      submitted: true,
    })
  }

  handleOnSubmit = event => {
    event.preventDefault()
    const dailyCalorieGoal = this.calculateDailyCalorieGoal()
    const dailyNutrientGoals = this.calculateDailyNutrientGoals()
    this.props.signUp(this.state, dailyCalorieGoal, dailyNutrientGoals, this.props.history)
  }

  render() {
    return (
      <div>
        <h1 className="header">Create an Account</h1>
        <br />
        <div className="form user-form">
          <form onSubmit={this.handleOnSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                className={`form-control ${!!this.state.submitted && this.state.username === "" ? "is-invalid" : null}`}
                name="username"
                id="username"
                value={this.state.username}
                onChange={this.handleOnChange}
              />
              <div className="invalid-feedback">
                Username required
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                className={`form-control ${!!this.state.submitted && this.state.password === "" ? "is-invalid" : null}`}
                name="password"
                id="password"
                value={this.state.password}
                onChange={this.handleOnChange}
              />
              <div className="invalid-feedback">
                Password required
              </div>
            </div>
            <div className="form-group">
              <label>Gender: </label>
              <div className="form-check">
                <input
                  type="radio"
                  className={`form-check-input ${!!this.state.submitted && this.state.gender === "" ? "is-invalid" : null}`}
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
                  className={`form-check-input ${!!this.state.submitted && this.state.gender === "" ? "is-invalid" : null}`}
                  name="gender"
                  id="female"
                  value="female"
                  onChange={this.handleOnChange}
                  />
                <label className="form-check-label" htmlFor="female">Female</label><br />
                <div className="invalid-feedback">
                  Gender required
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="age">Age: </label>
              <input
                type="number"
                className={`form-control ${!!this.state.submitted && (this.state.age === "" || parseInt(this.state.age) < 18 || this.state.age.includes("."))? "is-invalid" : null}`}
                name="age"
                id="age"
                value={this.state.age}
                onChange={this.handleOnChange}
              />
              <div className="invalid-feedback">
                Must be 18 or older to sign up
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="height_feet">Height: </label>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input
                    type="number"
                    className={`form-control ${!!this.state.submitted && (this.state.height_feet === "" || this.state.height_feet.includes(".")) ? "is-invalid" : null}`}
                    name="height_feet"
                    id="height_feet"
                    placeholder="Feet"
                    value={this.state.height_feet}
                    onChange={this.handleOnChange}
                  />
                  <div className="invalid-feedback">
                    Height required
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="number"
                    className={`form-control ${!!this.state.submitted && this.state.height_inches === "" ? "is-invalid" : null}`}
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
                className={`form-control ${!!this.state.submitted && this.state.weight === "" ? "is-invalid" : null}`}
                name="weight"
                id="weight"
                value={this.state.weight}
                onChange={this.handleOnChange}
              />
              <div className="invalid-feedback">
                Weight required
              </div>
            </div>
            <div className="form-group">
              <label>Lifestyle (exercise will be tracked separately): </label>
              <div className="form-check">
                <input
                  type="radio"
                  className={`form-check-input ${!!this.state.submitted && this.state.lifestyle === "" ? "is-invalid" : null}`}
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
                  className={`form-check-input ${!!this.state.submitted && this.state.lifestyle === "" ? "is-invalid" : null}`}
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
                  className={`form-check-input ${!!this.state.submitted && this.state.lifestyle === "" ? "is-invalid" : null}`}
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
                  className={`form-check-input ${!!this.state.submitted && this.state.lifestyle === "" ? "is-invalid" : null}`}
                  name="lifestyle"
                  id="veryActive"
                  value="veryActive"
                  onChange={this.handleOnChange}
                  />
                <label className="form-check-label" htmlFor="veryActive">Very Active: Job that requires heavy manual labor (i.e. construction, dancer, athlete)</label>
                <div className="invalid-feedback">
                  Lifestyle required
                </div>
              </div>
            </div>
            <input type="submit" className="btn btn-primary-fill" value="Sign Up" onClick={this.handleOnClick} />
          </form>
        </div>
        <div className="note">
          <p>Already have an account? Log in <Link to="/login">here</Link>.</p>
        </div>
      </div>

    )
  }

}

export default connect(null, { signUp })(SignUp);
