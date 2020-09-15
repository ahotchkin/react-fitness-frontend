import React from 'react';
import MealFoodCard from './MealFoodCard.js';

const MealFoods = (props) => {

  // Need to use mealFood.id as the key since it unique
  // Need to get all other information from food
  // zippedMealFoods combines the two arrays (mealFoods and foods) that are passed as props so all information can be accessed for the MealFoodCard
  const zippedMealFoods = props.foods.map((food, i) => [food, props.mealFoods[i]])

  const mealFoodCards = zippedMealFoods.map(zippedMealFood => <MealFoodCard key={zippedMealFood[1].id} food={zippedMealFood[0]}/>)

  console.log(mealFoodCards)
  return (
    <div>
      <h2>Foods for this meal</h2>
      {/* props.foods is an empty array on page refresh, but is populated on login...... what is happening here*/}

      { mealFoodCards.length > 0 ? mealFoodCards : null }



    </div>
  )
}

export default MealFoods
