import React from 'react';
import MealFoodCard from './MealFoodCard.js';

const MealFoods = (props) => {

  // Need to use mealFood.id as the key since it unique
  // Need to get all other information from food
  // zippedMealFoods combines the two arrays (mealFoods and foods) that are passed as props so all information can be accessed for the MealFoodCard
  // const zippedMealFoods = props.mealFoods.map((mealFood, i) => [mealFood, props.foods[i]])
  //
  // const mealFoodCards = zippedMealFoods.map(zippedMealFood => <MealFoodCard key={zippedMealFood[0].id} mealFood={zippedMealFood[0]} food={zippedMealFood[1]}/>)





  // ****************************************************************************************************************************************************
  const mealFoodCards = props.mealFoods.map(mealFood => <MealFoodCard key={mealFood.id} mealFood={mealFood} meal={props.meal}  deleteMealFood={props.deleteMealFood} history={props.history} />)
  // ****************************************************************************************************************************************************

  return (
    <div>
      <h4>Foods for this meal:</h4>
      {/* props.foods is an empty array on page refresh, but is populated on login...... what is happening here*/}
      { mealFoodCards.length > 0 ? mealFoodCards : null }


    </div>
  )
}

export default MealFoods
