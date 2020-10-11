import React from 'react';
import { Link } from 'react-router-dom';

const ExerciseCard = props => {

  const handleDeleteClick = () => {
    props.deleteExercise(props.exercise.id, props.history)
  };

  return (
    <div>
      <h3>{props.exercise.attributes.name}</h3>
      <p>Calories Burned: {props.exercise.attributes.calories_burned}</p>

      <Link to={`/exercises/${props.exercise.id}/edit`}>
        <button type="button">
          Update Exercise
        </button>
      </Link>

      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};

export default ExerciseCard;
