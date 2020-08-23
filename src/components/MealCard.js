import React from 'react';

const MealCard = (props) => {
  return (
    <div>
      <h3>{props.meal.attributes.category}</h3>
      <p>Calories: {props.meal.attributes.calories}</p>
      {console.log("meal will go here")}
      {console.log(props.foods)}
      {console.log(props)}
      <p>Here's what you ate today</p>
      <Foods foods={props.foods} />
    </div>

  )
}

export default MealCard
