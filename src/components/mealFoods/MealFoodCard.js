import React from 'react';

const MealFoodCard = props => {

  return (
    <div>
      {console.log(props.food)}
      {console.log(props.mealFood)}
      <h6>{props.food.brand_name} {props.food.description}, {props.mealFood.number_of_servings} servings - {props.mealFood.calories} calories</h6>
    </div>

  )
}

export default MealFoodCard
