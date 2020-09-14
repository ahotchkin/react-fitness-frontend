import React from 'react';
import { Link } from 'react-router-dom';
import FoodCard from './FoodCard.js';

const Foods = (props) => {

  console.log(props)
  console.log("meal id is", props.location.state.mealId)

  // const foodCards = props.foods.map(food => <FoodCard key={food.id} food={food} />)


  // in return, going more than one level deep, so need to make sure exerciseCards are there before rendering anything. instead of just saying exerciseCards, need to say: { exerciseCards.length > 0 ? exerciseCards : null }
  // <Link to="/exercises/new">
  //   <button type="button">
  //     Add Exercise
  //   </button>
  // </Link>
  return (
    <div>
      <h2>Foods</h2>
      {/* props.foods is an empty array on page refresh, but is populated on login...... what is happening here*/}

      {/* { foodCards.length > 0 ? foodCards : null } */}

      <p>Search the database for a food or add a new food</p>
      <Link to="/foods/new">
        <button type="button">
          Add New Food
        </button>
      </Link>

    </div>
  )
}


// the function returned from invoking connect taht will now supply Exercises with props included state as descriped in MSTP and actions as described in MDTP takes Exercises as an argument - the whole expression is a connected Exercises component with state and actions
// not just exporting the const from above, but exporting a bulked up version with state and actions
// export default connect(mapStateToProps)(Foods)
export default Foods
