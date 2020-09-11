import React from 'react';
import Foods from '../foods/Foods';

const MealCard = (props) => {
  return (
    <div>
      <h3>{props.meal.attributes.category}</h3>
      <p>Calories: {props.meal.attributes.calories}</p>
      <Foods foods={props.foods} />
    </div>

  )
}

export default MealCard
