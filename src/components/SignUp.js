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

  calculateDailyFatGoal = () => {
    const dailyCalorieGoal = this.calculateDailyCalorieGoal()
    const fat = parseInt((dailyCalorieGoal * .30) / 9)
    return fat

    //     {/* Goal is 30% of DV */}
    //     <li>Total fat: {props.dailyNutrition.total_fat}g</li>

    //   Fats:
    //   9 calories per gram
    //   30% of 2,000 calories = 600 calories of protein per day
    //   Total grams of fat allowed per day = 600/9 = 67 grams


  }

  calculateDailySaturatedFatGoal = () => {
    const dailyCalorieGoal = this.calculateDailyCalorieGoal()
    const saturatedFat = parseInt((dailyCalorieGoal * .07) / 9)
    return saturatedFat
    //     {/* Goal is <7% of DV */}
    //     <li>Saturated fat: {props.dailyNutrition.saturated_fat}g</li>

    //   Fats:
    //   9 calories per gram
    //   30% of 2,000 calories = 600 calories of protein per day
    //   Total grams of fat allowed per day = 600/9 = 67 grams

  }

  calculateDailyPolyunsaturatedFatGoal = () => {
    const dailyCalorieGoal = this.calculateDailyCalorieGoal()
    const polyunsaturatedFat = parseInt((dailyCalorieGoal * .10) / 9)
    return polyunsaturatedFat
    //     {/* Goal is up to 10% of DV */}
    //     <li>Polyunsaturated fat: {props.dailyNutrition.polyunsaturated_fat}g</li>

    //   Fats:
    //   9 calories per gram
    //   30% of 2,000 calories = 600 calories of protein per day
    //   Total grams of fat allowed per day = 600/9 = 67 grams

  }

  calculateDailyMonounsaturatedFatGoal = () => {
    const dailyCalorieGoal = this.calculateDailyCalorieGoal()
    const monounsaturatedFat = parseInt((dailyCalorieGoal * .20) / 9)
    return monounsaturatedFat
    //     {/* Goal is up to 20% of DV */}
    //     <li>Monounsaturated fat: {props.dailyNutrition.monounsaturated_fat}g</li>

    //   Fats:
    //   9 calories per gram
    //   30% of 2,000 calories = 600 calories of protein per day
    //   Total grams of fat allowed per day = 600/9 = 67 grams

  }

  calculateDailyTransFatGoal = () => {
    const transFat = 0
    return transFat
    //     {/* Goal is 0% of DV */}
    //     <li>Trans fat: {props.dailyNutrition.trans_fat}g</li>

  }

  calculateDailyCholesterolGoal = () => {
    const cholesterol = 300
    return cholesterol

    //     {/* Goal is <300mg */}
    //     <li>Cholesterol: {props.dailyNutrition.cholesterol}mg</li>

  }

  calculateDailySodiumGoal = () => {
    const sodium = 2300
    return sodium

    //     {/* Goal is 2,300mg */}
    //     <li>Sodium: {props.dailyNutrition.sodium}mg</li>

  }

  calculateDailyCarbohydrateGoal = () => {
    const dailyCalorieGoal = this.calculateDailyCalorieGoal()
    const carbohydrate = parseInt((dailyCalorieGoal * .50) / 4)
    return carbohydrate

    //     {/* Goal is 50% of DV */}
    //     <li>Total carbohydrates: {props.dailyNutrition.total_carbohydrate}g</li>

    //   Carbs:
    //   4 calories per gram
    //   40% of 2,000 calories = 800 calories of carbs per day
    //   Total grams of carbs allowed per day = 800/4 = 200 grams

  }

  calculateDailyFiberGoal = () => {
    const fiber = 25
    return fiber

    //     {/* Goal is 25g a day */}
    //     <li>Dietary fiber: {props.dailyNutrition.dietary_fiber}g</li>

  }

  calculateDailySugarGoal = () => {
    let sugar = 0
    if (this.state.gender === "male") {
      sugar = 38
    } else if (this.state.gender === "female") {
      sugar = 25
    }

    return sugar

    //     {/* Goal is MALE: 38g, FEMALE: 25g */}
    //     <li>Total sugars: {props.dailyNutrition.total_sugars}g</li>

  }

  calculateDailyProteinGoal = () => {
    const dailyCalorieGoal = this.calculateDailyCalorieGoal()
    const protein = parseInt((dailyCalorieGoal * .20) / 4)
    return protein

    //     {/* Goal is 20% of DV */}
    //     <li>Protein: {props.dailyNutrition.protein}g</li>

    //   Proteins:
    //   4 calories per gram
    //   30% of 2,000 calories = 600 calories of protein per day
    //   Total grams of protein allowed per day = 600/4 = 150 grams

  }

  calculateDailyVitaminAGoal = () => {
    let vitaminA = 0
    if (this.state.gender === "male") {
      vitaminA = 900
    } else if (this.state.gender === "female") {
      vitaminA = 700
    }

    return vitaminA

    //     {/* Goal is MALE: 900 mcg RAE, FEMALE: 700 mcg RAE */}
    //     <li>Vitamin A: {props.dailyNutrition.vitamin_a}%</li>

  }

  calculateDailyVitaminCGoal = () => {
    let vitaminC = 0
    if (this.state.gender === "male") {
      vitaminC = 90
    } else if (this.state.gender === "female") {
      vitaminC = 75
    }

    return vitaminC

    //     {/* Goal is MALE: 90mg, FEMALE: 75mg */}
    //     <li>Vitamin C: {props.dailyNutrition.vitamin_c}%</li>

  }

  calculateDailyVitaminDGoal = () => {
    let vitaminD = 0
    if (parseInt(this.state.age) <= 70) {
      vitaminD = 15
    } else if (parseInt(this.state.age) >= 71) {
      vitaminD = 20
    }

    return vitaminD

    // {/* Goal is AGE 19-70: 15 mcg (600 IU), AGE 71+: 20 mcg (800 IU) */}
    // <li>Vitamin D: {props.dailyNutrition.vitamin_d}%</li>

  }



  calculateDailyCalciumGoal = () => {
    let calcium = 0
    if ((parseInt(this.state.age) <= 50) || (parseInt(this.state.age) >= 51 && parseInt(this.state.age) <= 70 && this.state.gender === "male")) {
      calcium = 1000
    } else if ((parseInt(this.state.age)) >= 71 || (parseInt(this.state.age) >= 51 && parseInt(this.state.age) <= 70 && this.state.gender === "female")) {
      calcium = 1200
    }
    return calcium

    // {/* Goal is AGE 19-50: 1,000 mg, MALE AGE 51-70: 1,000 mg, FEMALE AGE 51-70: 1,200 mg, AGE 71+: 1,200 mg */}
    // <li>Calcium: {props.dailyNutrition.calcium}%</li>

  }

  calculateDailyIronGoal = () => {
    let iron = 0
    if ((parseInt(this.state.age) <= 50 && this.state.gender === "male") || (parseInt(this.state.age) >= 51)) {
      iron = 8
    } else if (parseInt(this.state.age) <= 50 && this.state.gender === "female") {
      iron = 18
    }

    return iron

    // {/* Goal is MALE AGE 19-50: 8mg, FEMALE AGE 19-50: 18mg, AGE 51+: 8mg */}
    // <li>Iron: {props.dailyNutrition.iron}%</li>

  }

  calculateDailyPotassiumGoal = () => {
    const potassium = 4700
    return potassium

    // {/* Goal is 4700mg */}
    // <li>Potassium: {props.dailyNutrition.potassium}mg</li>

  }


  calculateDailyNutrientGoals = () => {
    const dailyCalorieGoal = this.calculateDailyCalorieGoal()
    const nutrientGoals = {}
    nutrientGoals.fat = parseInt((dailyCalorieGoal * .30) / 9)
    nutrientGoals.saturatedFat = parseInt((dailyCalorieGoal * .07) / 9)
    nutrientGoals.polyunsaturatedFat = parseInt((dailyCalorieGoal * .10) / 9)
    nutrientGoals.monounsaturatedFat = parseInt((dailyCalorieGoal * .20) / 9)
    nutrientGoals.transFat = 0
    nutrientGoals.cholesterol = 300
    nutrientGoals.sodium = 2300
    nutrientGoals.carbohydrate = parseInt((dailyCalorieGoal * .50) / 4)
    nutrientGoals.fiber = 25

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

    nutrientGoals.potassium = 4700

    return nutrientGoals
  }

  handleOnChange = event => {
    // what does this do????
    event.persist()

    console.log(this.state)
    this.setState({
      [event.target.name]: event.target.value
    }, console.log(`${[event.target.name]}: ${event.target.value}`))
  }

  handleOnSubmit = event => {
    event.preventDefault()
    const dailyCalorieGoal = this.calculateDailyCalorieGoal()
    const dailyNutrientGoals = this.calculateDailyNutrientGoals()
    {console.log(dailyCalorieGoal)}
    console.log(dailyNutrientGoals)

    this.props.signUp(this.state, dailyCalorieGoal, dailyNutrientGoals, this.props.history)
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
            <input type="submit" className="btn btn-primary-fill" value="Sign Up" />
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
