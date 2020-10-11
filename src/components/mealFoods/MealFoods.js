import React from 'react';
import MealFoodCard from './MealFoodCard.js';

const MealFoods = props => {
  const mealFoodCards = props.mealFoods.map(mealFood => <MealFoodCard key={mealFood.id} mealFood={mealFood} meal={props.meal}  deleteMealFood={props.deleteMealFood} history={props.history} />)

  return (
    <div>
      <h4>Foods for this meal:</h4>
      { mealFoodCards.length > 0 ? mealFoodCards : null }
    </div>
  );
};

export default MealFoods;
