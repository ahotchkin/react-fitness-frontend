import React from 'react';
import { connect } from 'react-redux'

const ExerciseCard = ({ exercise }) => {
  return (
    <div>
      <h3>{exercise.attributes.name}</h3>
      <p>Calories Burned: {exercise.attributes.calories_burned}</p>
    </div>

  )
}

export default ExerciseCard
