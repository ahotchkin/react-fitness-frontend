import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MealCard from './MealCard.js';

const Meals = props => {
  // const diary = props.diaries.first
  console.log(props.meals)
  const mealCards = props.meals.map(meal => <MealCard meal={meal} key={meal.id} foods={meal.attributes.foods} />)


  // in return, going more than one level deep, so need to make sure exerciseCards are there before rendering anything. instead of just saying exerciseCards, need to say: { exerciseCards.length > 0 ? exerciseCards : null }
  // <Link to="/exercises/new">
  //   <button type="button">
  //     Add Exercise
  //   </button>
  // </Link>
  return (
    <div>
      <h2>Today's Meals</h2>
      {/* props.diaries is an empty array on page refresh, but is populated on login...... what is happening here*/}
      { mealCards.length > 0 ? mealCards : null }



    </div>
  )
}

// receives the state of the Redux store as an argument
const mapStateToProps = state => {
  return {
    meals: state.meals
  }
}

// the function returned from invoking connect taht will now supply Exercises with props included state as descriped in MSTP and actions as described in MDTP takes Exercises as an argument - the whole expression is a connected Exercises component with state and actions
// not just exporting the const from above, but exporting a bulked up version with state and actions
export default connect(mapStateToProps)(Meals)
