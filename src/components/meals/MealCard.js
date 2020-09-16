import React from 'react';
import { Link } from 'react-router-dom';

import MealFoods from '../mealFoods/MealFoods';

const MealCard = (props) => {

  const mealCalories = props.mealFoods.reduce((a, b) => ({calories: a.calories + b.calories}))


  return (
    <div>
    {console.log(props)}
      <h3>{props.meal.attributes.category}</h3>
      <p>Calories: {mealCalories.calories}</p>
      <MealFoods mealFoods={props.mealFoods} foods={props.foods} />

      {/* is there a better way to provide the meal id so the food added can be associated? */}
      <Link to={{
        pathname: "/foods",
        state: {
          mealId: props.meal.id
        }
      }}>
        <button type="button">
          Add Food
        </button>
      </Link>
    </div>

  )
}

export default MealCard
