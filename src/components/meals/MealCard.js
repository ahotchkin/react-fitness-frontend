import React from 'react';
import MealFoods from '../mealFoods/MealFoods';

const MealCard = (props) => {
  return (
    <div>
    {console.log(props)}
      <h3>{props.meal.attributes.category}</h3>
      <p>Calories: {props.meal.attributes.calories}</p>
      <MealFoods mealFoods={props.mealFoods} />
    </div>

  )
}

export default MealCard
