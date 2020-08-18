import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ExerciseCard from './ExerciseCard';

const Exercises = props => {
  const exerciseCards = props.exercises.map(exercise => <ExerciseCard exercise={exercise} key={exercise.id} />)
  // in return, going more than one level deep, so need to make sure exerciseCards are there before rendering anything. instead of just saying exerciseCards, need to say:
  return (
    <div>
      <h2>Exercises</h2>
      { exerciseCards.length > 0 ? exerciseCards : null }

      <Link to="/exercises/new">
        <button type="button">
          Add Exercise
        </button>
      </Link>

    </div>
  )
}

// receives the state of the Redux store as an argument
const mapStateToProps = state => {
  return {
    exercises: state.exercises
  }
}

// the function returned from invoking connect taht will now supply Exercises with props included state as descriped in MSTP and actions as described in MDTP takes Exercises as an argument - the whole expression is a connected Exercises component with state and actions
// not just exporting the const from above, but exporting a bulked up version with state and actions
export default connect(mapStateToProps)(Exercises)
