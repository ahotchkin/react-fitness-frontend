import React from 'react';
import MealCard from './MealCard.js';

const Meals = props => {
  // const mealCards = props.meals.map(meal => <MealCard meal={meal} key={meal.id} mealFoods={meal.attributes.meal_foods} foods={meal.attributes.foods} />)
  const mealCards = props.meals.map(meal => <MealCard meal={meal} key={meal.id} foods={meal.attributes.foods} />)

  // in return, going more than one level deep, so need to make sure exerciseCards are there before rendering anything. instead of just saying exerciseCards, need to say: { exerciseCards.length > 0 ? exerciseCards : null }
  // <Link to="/exercises/new">
  //   <button type="button">
  //     Add Exercise
  //   </button>
  // </Link>
  return (
    <div>
      <h2>Today's Meals</h2>
      {/* props.diaries is an empty array on page refresh, but is populated on login...... what is happening here*/}
      { mealCards.length > 0 ? mealCards : null }
    </div>
  )
}

export default Meals;
