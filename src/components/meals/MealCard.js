import React from 'react';
import { Link } from 'react-router-dom';

// import MealFoods from '../mealFoods/MealFoods';

// *******************************************************************************************************
import MealFoodsContainer from '../../containers/MealFoodsContainer'
// *******************************************************************************************************

const MealCard = (props) => {

  // let mealCalories = {
  //   calories: 0
  // }
  // // // MAKE SURE I UNDERSTAND HOW REDUCE IS WORKING
  // // update this to be handled on the backend and display meal.calories
  // if (props.mealFoods.length > 0) {
  //   mealCalories = props.mealFoods.reduce((a, b) => ({calories: a.calories + b.calories}))
  // }

  return (
    <div>
      <h3>{props.meal.attributes.category}</h3>
      <p>Calories: {props.meal.attributes.calories}</p>
      {/*<MealFoods mealFoods={props.mealFoods} foods={props.foods} /> */}

      {/* ******************************************************************************** */}
      <MealFoodsContainer meal={props.meal} />
      {/* ******************************************************************************** */}

      <Link to={{
        pathname: `/meals/${props.meal.id}/foods`,
        state: {
          // diaryId: props.diaryId,
          diaryDate: props.diaryDate
        }
      }}>
        <button type="button">
          Add Food
        </button>
      </Link>
    </div>

  )
}

export default MealCard
