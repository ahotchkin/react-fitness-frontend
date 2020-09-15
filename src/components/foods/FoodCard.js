import React from 'react';

const FoodCard = props => {

  // right now I'm getting the individual foods from the meals in the database. I have a foods serializer set up so when I want to be able to search through my entire list of foods I can. I shouldn't need my foods action or reducer right now since this information is all coming from meals....
  // ************************************************************************************************

  console.log(props)

  const handleOnClick = () => {
    props.createMealFood(props.mealId, props.food, props.history)
  }


  // const handleDeleteClick = () => {
  //   props.deleteExercise(props.exercise.id, props.history)
  // }




  return (
    <div>
     <p>{props.food.attributes.brand_name} {props.food.attributes.description} - {props.food.attributes.calories} calories</p>
     <button onClick={handleOnClick}>Add</button>
    </div>

  )
}

export default FoodCard
