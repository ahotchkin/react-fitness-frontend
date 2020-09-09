import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseCard from './ExerciseCard';

import UpdateExercise from './UpdateExercise'

const Exercises = props => {
  const exerciseCards = props.exercises.map(exercise => <ExerciseCard exercise={exercise} key={exercise.id} deleteExercise={props.deleteExercise} history={props.history} />)
  
  // in return, going more than one level deep, so need to make sure exerciseCards are there before rendering anything. instead of just saying exerciseCards, need to say: { exerciseCards.length > 0 ? exerciseCards : null }
  return (
    <div>
      <h2>Exercises</h2>
      {console.log(props)}
      { exerciseCards.length > 0 ? exerciseCards : null }

      <Link to="/exercises/new">
        <button type="button">
          Add Exercise
        </button>
      </Link>

    </div>
  )
}

export default Exercises
