import React from 'react';

const FoodCard = ({ food }) => {

  // right now I'm getting the individual foods from the meals in the database. I have a foods serializer set up so when I want to be able to search through my entire list of foods I can. I shouldn't need my foods action or reducer right now since this information is all coming from meals....
  // ************************************************************************************************







  return (
    <div>
     <h6>{food.brand_name} {food.description} - {food.calories} calories</h6>
    </div>

  )
}

export default FoodCard
