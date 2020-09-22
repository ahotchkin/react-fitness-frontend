import React from 'react';
import { Link } from 'react-router-dom';
import FoodCard from './FoodCard';
import SearchInput from '../SearchInput'

const Foods = props => {

  const foodCards = props.foods.map(food => <FoodCard key={food.id} food={food} meal={props.meal} createMealFood={props.createMealFood} history={props.history}/>)

  return (
    <div>
      <h2>Foods</h2>
      {/* props.foods is an empty array on page refresh, but is populated on login...... what is happening here*/}

      { foodCards.length > 0 ? foodCards : null }

      <p>Search the database for a food or add a new food</p>

      <SearchInput />

      <Link to="/foods/new">
        <button type="button">
          Add New Food
        </button>
      </Link>

    </div>
  )
}

export default Foods;
