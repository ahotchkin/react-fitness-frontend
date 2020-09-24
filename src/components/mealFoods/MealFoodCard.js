import React from 'react';
import { Link } from 'react-router-dom'


const MealFoodCard = props => {

  const handleDeleteClick = () => {
    props.deleteMealFood(props.mealFood, props.meal, props.history)
  }

  // previous <p>:       <p>{props.food.brand_name} {props.food.description}, {props.mealFood.number_of_servings} servings - {props.mealFood.calories} calories - ...


  return (
    <div>
      {/*
      {console.log(props)}
      */}
      <p>{props.mealFood.attributes.food.brand_name} {props.mealFood.attributes.food.description}, {props.mealFood.attributes.number_of_servings} servings - {props.mealFood.attributes.calories} calories -
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
