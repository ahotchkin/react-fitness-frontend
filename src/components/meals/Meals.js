import React from 'react';
import MealCard from './MealCard.js';

const Meals = props => {
  // filter desired meals before mapping to avoid a situation where nothing would be returned at the end of map - necessary to avoid warning: Expected to return a value at the end of arrow function array-callback-return
  const mealCards = props.meals.filter(meal => props.diaryId === meal.relationships.diary.data.id).map(filteredMeal => <MealCard meal={filteredMeal} key={filteredMeal.id} diaryDate={props.diaryDate} foods={filteredMeal.attributes.foods} />)

  return (
    <div>
      <h2>Today's Meals</h2>
      { mealCards.length > 0 ? mealCards : null }
    </div>
  );
};

export default Meals;
