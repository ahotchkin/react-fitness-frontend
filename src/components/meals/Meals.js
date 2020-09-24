import React from 'react';
import MealCard from './MealCard.js';

const Meals = props => {
  // const mealCards = props.meals.map(meal => <MealCard meal={meal} key={meal.id} foods={meal.attributes.foods} />)

  // filter desired meals before mapping to avoid a situation where nothing would be returned at the end of map - necessary to avoid warning: Expected to return a value at the end of arrow function array-callback-return
  const mealCards = props.meals.filter(meal => props.diaryId === meal.relationships.diary.data.id).map(filteredMeal => <MealCard meal={filteredMeal} key={filteredMeal.id} foods={filteredMeal.attributes.foods} />)


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
