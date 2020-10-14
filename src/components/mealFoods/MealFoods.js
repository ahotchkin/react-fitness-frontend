import React from 'react';
import MealFoodCard from './MealFoodCard.js';

const MealFoods = props => {
  const mealFoodCards = props.mealFoods.map(mealFood => <MealFoodCard key={mealFood.id} mealFood={mealFood} meal={props.meal}  deleteMealFood={props.deleteMealFood} history={props.history} />)

  return (
    <div>
      { mealFoodCards.length > 0 ?
        <table className="table table-borderless table-sm" id="mealFoods">
          <thead>
            <tr>
              <th>Food</th>
              <th>Servings</th>
              <th>Calories</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mealFoodCards}
          </tbody>
        </table>
      :
        null
      }
    </div>
  );
};

export default MealFoods;
