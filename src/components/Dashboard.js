import React from 'react';
import { connect } from 'react-redux';

// import { getExercises } from '../actions/exercises'

const DashboardContainer = props => {

  // componentDidMount() {
  //   this.props.getExercises()
  // }

  // Used in several places, refactor somehow?
  // const getDate = () => {
  //   const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  //   const date = (new Date(new Date() - tzoffset)).toISOString().split("T")[0];
  //   return date
  // }
  //
  // // Only updates on page refresh...need to getExercises rather than pull from this.props.currentUser.attributes.exercises
  // const getTodaysDate = () => {
  //   const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  //   const date = (new Date(new Date() - tzoffset)).toISOString().split("T")[0];
  //   return date
  // }
  //
  //
  // const caloriesBurned = () => {
  //   let data = {}
  //
  //   if (!!props.exercises) {
  //     const todaysExercises = props.exercises.filter(exercise => exercise.attributes.date === getTodaysDate())
  //     console.log(todaysExercises)
  //     if (todaysExercises.length === 1) {
  //       data = {calories_burned: todaysExercises[0].attributes.calories_burned}
  //     } else if (todaysExercises.length > 1) {
  //       data = todaysExercises.reduce((a, b) => ({calories_burned: a.attributes.calories_burned + b.attributes.calories_burned}))
  //     }
  //   } else {
  //     data = {calories_burned: 0}
  //   }
  //
  //   return data.calories_burned
  // }


  return (
    <div className="DashboardContainer">
      {console.log(props)}
      <h2>Hello, {props.currentUser.attributes.username}! Welcome to your React Fitness Dashboard!</h2>

      <p>*************************************************************************************************</p>

      <h3>Profile</h3>

      <p>Age: {props.currentUser.attributes.age}</p>
      {/* User should have ability to update weight */}
      <p>Current Weight: {props.currentUser.attributes.weight}</p>
      {/* Should take the user's daily calorie goal, subtract any calories user has already eaten, and add any calories user has gained from exercise */}
      <p>Daily Calorie Goal: {props.currentUser.attributes.daily_calorie_goal}</p>
      <p>Calories Remaining: {props.currentUser.attributes.daily_calorie_goal + props.caloriesBurned}</p>

      <p>*************************************************************************************************</p>

      <h3>Today's Exercise</h3>
      <p>Total Calories Burned: {props.caloriesBurned}</p>

      <p>*************************************************************************************************</p>

      <h3>Today's Meals</h3>

      <p>*************************************************************************************************</p>

    </div>
  )

}


const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    // exercises: state.exercises
  }
}

// const mapDispatchToProps = {
//   getExercises
// }
//
export default connect(mapStateToProps)(DashboardContainer);
