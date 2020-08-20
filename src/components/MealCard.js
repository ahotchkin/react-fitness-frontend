import React from 'react';

const MealCard = ({ meal }) => {
  return (
    <div>
      <h3>{meal.attributes.category}</h3>
      <p>Calories: {meal.attributes.calories}</p>
      {console.log("meal will go here")}
    </div>

  )
}

export default MealCard
