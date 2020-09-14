import React from 'react';

const FoodCard = ({ food }) => {

  // right now I'm getting the individual foods from the meals in the database. I have a foods serializer set up so when I want to be able to search through my entire list of foods I can. I shouldn't need my foods action or reducer right now since this information is all coming from meals....
  // ************************************************************************************************

  const handleSubmit = () => {
    
  }





  return (
    <div>
     <p>{food.attributes.brand_name} {food.attributes.description} - {food.attributes.calories} calories</p>
     <button>Add</button>
    </div>

  )
}

export default FoodCard
