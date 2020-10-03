import React from 'react';
import { connect } from 'react-redux';



const MainContainer = ({ currentUser }) => {

  // Used in several places, refactor somehow?
  const getDate = () => {
    const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    const date = (new Date(new Date() - tzoffset)).toISOString().split("T")[0];
    return date
  }

  // Only updates on page refresh...need to getExercises rather than pull from currentUser.attributes.exercises
  const caloriesBurned = () => {
    const data = currentUser.attributes.exercises.filter(exercise => exercise.date === getDate()).reduce((a, b) => ({calories_burned: a.calories_burned + b.calories_burned}))
    return data.calories_burned
  }

  return (
    <div className="MainContainer">

      <h2>Hello, {currentUser.attributes.username}! Welcome to the Main Container of React Fitness!</h2>

      <p>*************************************************************************************************</p>

      <h3>Profile</h3>

      <p>Age: {currentUser.attributes.age}</p>
      {/* User should have ability to update weight */}
      <p>Current Weight: {currentUser.attributes.weight}</p>
      {/* Should take the user's daily calorie goal, subtract any calories user has already eaten, and add any calories user has gained from exercise */}
      <p>Calories Remaining: {currentUser.attributes.daily_calorie_goal}</p>

      <p>*************************************************************************************************</p>

      <h3>Today's Exercise</h3>
      <p>Total Calories Burned: {caloriesBurned()}</p>

      <p>*************************************************************************************************</p>

      <h3>Today's Meals</h3>

      <p>*************************************************************************************************</p>

    </div>
  )
}


const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(MainContainer);
