import React from 'react';

const MealFoodCard = ({ mealFood }) => {

  // right now I'm getting the individual foods from the meals in the database. I have a foods serializer set up so when I want to be able to search through my entire list of foods I can. I shouldn't need my foods action or reducer right now since this information is all coming from meals....
  // ************************************************************************************************







  return (
    <div>
      {console.log(mealFood)}
      <h6>{mealFood.brand_name} {mealFood.description} - {mealFood.calories} calories</h6>
    </div>

  )
}

export default MealFoodCard
