import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseCard from './ExerciseCard';

const Exercises = props => {

  const exerciseCards = props.exercises.filter(exercise => exercise.attributes.date === props.date).map(filteredExercise => <ExerciseCard exercise={filteredExercise} key={filteredExercise.id} deleteExercise={props.deleteExercise} history={props.history}/>)

  // in return, going more than one level deep, so need to make sure exerciseCards are there before rendering anything. instead of just saying exerciseCards, need to say: { exerciseCards.length > 0 ? exerciseCards : null }
  return (
    <div className="row">
      <div className="col-lg info-container">
        <h2>Exercises for {props.date}</h2>
        <h3>Total calories burned on {props.date}: {props.caloriesBurned}</h3>

        <Link to="/exercises/new">
          <button className="btn btn-primary-outline btn-sm" type="button">
            Add Exercise
          </button>
        </Link>

        <hr className="solid-thick" />

        { exerciseCards.length > 0 ?
          <table className="table table-borderless table-sm" id="exercises">
            <thead>
              <tr>
                <th>Exercise</th>
                <th className="right-align">Minutes</th>
                <th className="right-align">Calories</th>
                <th className="right-align"></th>
              </tr>
            </thead>
            <tbody>
              {exerciseCards}
            </tbody>
          </table>
        :
          null
        }

      </div>
    </div>
  )
}

export default Exercises;
