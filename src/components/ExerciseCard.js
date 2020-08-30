import React from 'react';
import { connect } from 'react-redux';
import { deleteExercise } from '../actions/exercises';


      // <button onClick={handleClick}>Delete</button>
const ExerciseCard = (props) => {

  const handleClick = () => {
    props.deleteExercise(props.exercise.id)
  }

  return (
    <div>
      <h3>{props.exercise.attributes.name}</h3>
      <p>Calories Burned: {props.exercise.attributes.calories_burned}</p>
      <form onSubmit={handleClick}>
        <input type="submit" value="Delete" />
      </form>

    </div>

  )
}

export default connect(null, { deleteExercise })(ExerciseCard);
