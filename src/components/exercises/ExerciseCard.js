import React from 'react';
import { Link } from 'react-router-dom';

import pencil from '../../icons/pencil.svg';
import trash from '../../icons/trash.svg';

const ExerciseCard = props => {

  const handleDeleteClick = () => {
    props.deleteExercise(props.exercise.id, props.history)
  };

  return (
    <tr key={props.exercise.id}>
      <td>{props.exercise.attributes.name}</td>
      <td className="right-align">{props.exercise.attributes.duration_in_minutes}</td>
      <td className="right-align">{props.exercise.attributes.calories_burned}</td>
      <td className="right-align">
        <Link to={`/exercises/${props.exercise.id}/edit`}>
          <img src={pencil} alt="Edit" />
        </Link>

        <button className="no-background" onClick={handleDeleteClick}>
          <img src={trash} alt="Delete" />
        </button>
      </td>
    </tr>
  );
};

export default ExerciseCard;
