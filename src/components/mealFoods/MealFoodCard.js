import React from 'react';
import { Link } from 'react-router-dom'


const MealFoodCard = props => {

  // copied from ExerciseCard.js
  const handleDeleteClick = () => {
    props.deleteExercise(props.exercise.id, props.history)
  }

  return (
    <div>
      <p>{props.food.brand_name} {props.food.description}, {props.mealFood.number_of_servings} servings - {props.mealFood.calories} calories -
      <Link to={`/meal_foods/${props.mealFood.id}/edit`}>
        <button type="button">
          Update
        </button>
      </Link>
      <button onClick={handleDeleteClick}>Delete</button>
      </p>
    </div>

  )
}

export default MealFoodCard
