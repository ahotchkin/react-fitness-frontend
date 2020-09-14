import React from 'react';
import MealFoodCard from './MealFoodCard.js';

const MealFoods = (props) => {

  console.log(props)
  const mealFoodCards = props.mealFoods.map(mealFood => <MealFoodCard key={mealFood.id} mealFood={mealFood} />)


  // in return, going more than one level deep, so need to make sure exerciseCards are there before rendering anything. instead of just saying exerciseCards, need to say: { exerciseCards.length > 0 ? exerciseCards : null }
  // <Link to="/exercises/new">
  //   <button type="button">
  //     Add Exercise
  //   </button>
  // </Link>
  return (
    <div>
      <h2>Foods for this meal</h2>
      {/* props.foods is an empty array on page refresh, but is populated on login...... what is happening here*/}

      { mealFoodCards.length > 0 ? mealFoodCards : null }



    </div>
  )
}

export default MealFoods