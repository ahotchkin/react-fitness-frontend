import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getExercises } from '../actions/exercises'

class DashboardContainer extends Component {

  componentDidMount() {
    this.props.getExercises()
  }

  // Used in several places, refactor somehow?
  getDate = () => {
    const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    const date = (new Date(new Date() - tzoffset)).toISOString().split("T")[0];
    return date
  }

  // Only updates on page refresh...need to getExercises rather than pull from this.props.currentUser.attributes.exercises
  getTodaysDate = () => {
    const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    const date = (new Date(new Date() - tzoffset)).toISOString().split("T")[0];
    return date
  }


  caloriesBurned = () => {
    let data = {}

    if (!!this.props.exercises) {
      const todaysExercises = this.props.exercises.filter(exercise => exercise.attributes.date === this.getTodaysDate())
      if (todaysExercises.length === 1) {
        data = {calories_burned: todaysExercises[0].attributes.calories_burned}
      } else if (todaysExercises.length > 1) {
        data = todaysExercises.reduce((a, b) => ({calories_burned: a.attributes.calories_burned + b.attributes.calories_burned}))
      }
    } else {
      data = {calories_burned: 0}
    }

    return data.calories_burned
  }

  render() {
    return (
      <div className="DashboardContainer">
        {console.log(this.props)}
        <h2>Hello, {this.props.currentUser.attributes.username}! Welcome to the Dashboard Container of React Fitness!</h2>

        <p>*************************************************************************************************</p>

        <h3>Profile</h3>

        <p>Age: {this.props.currentUser.attributes.age}</p>
        {/* User should have ability to update weight */}
        <p>Current Weight: {this.props.currentUser.attributes.weight}</p>
        {/* Should take the user's daily calorie goal, subtract any calories user has already eaten, and add any calories user has gained from exercise */}
        <p>Calories Remaining: {this.props.currentUser.attributes.daily_calorie_goal}</p>

        <p>*************************************************************************************************</p>

        <h3>Today's Exercise</h3>
        <p>Total Calories Burned: {this.caloriesBurned()}</p>

        <p>*************************************************************************************************</p>

        <h3>Today's Meals</h3>

        <p>*************************************************************************************************</p>

      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    exercises: state.exercises
  }
}

const mapDispatchToProps = {
  getExercises
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
