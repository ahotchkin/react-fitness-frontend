import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseCard from './ExerciseCard';

const Exercises = props => {

  const exerciseCards = props.exercises.filter(exercise => exercise.attributes.date === props.date).map(filteredExercise => <ExerciseCard exercise={filteredExercise} key={filteredExercise.id} deleteExercise={props.deleteExercise} history={props.history}/>)

  // in return, going more than one level deep, so need to make sure exerciseCards are there before rendering anything. instead of just saying exerciseCards, need to say: { exerciseCards.length > 0 ? exerciseCards : null }
  return (
    <div>
      <h2>Exercises for {props.date}</h2>
      <h3>Total calories burned on {props.date}: {props.caloriesBurned}</h3>
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

export default Exercises;
