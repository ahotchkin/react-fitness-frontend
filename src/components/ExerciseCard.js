import React from 'react';
import { connect } from 'react-redux';
import { deleteExercise } from '../actions/exercises';
import { Link } from 'react-router-dom'

const ExerciseCard = (props) => {

  // const handleUpdateClick = () => {
  //   console.log("updating exercise here")
  // }
  // <form onSubmit={handleUpdateClick}>
  //   <input type="submit" value="Update" />
  // </form>

  const handleDeleteClick = () => {
    props.deleteExercise(props.exercise.id)
  }

  return (
    <div>
      <h3>{props.exercise.attributes.name}</h3>
      <p>Calories Burned: {props.exercise.attributes.calories_burned}</p>

      <Link to={`/exercises/${props.exercise.id}/edit`}>
        <button type="button">
          Update Exercise
        </button>
      </Link>

      <form onSubmit={handleDeleteClick}>
        <input type="submit" value="Delete" />
      </form>
    </div>

  )
}

export default connect(null, { deleteExercise })(ExerciseCard);
