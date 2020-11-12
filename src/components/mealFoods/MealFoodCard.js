import React from 'react';
import { Link } from 'react-router-dom';

import pencil from '../../icons/pencil.svg';
import trash from '../../icons/trash.svg';

const MealFoodCard = props => {

  const handleDeleteClick = () => {
    props.deleteMealFood(props.mealFood, props.meal, props.history)
  };

  return (
    <tr key={props.mealFood.id}>
      <td className="food-column">{props.mealFood.attributes.food.brand_name} {props.mealFood.attributes.food.description}</td>
      <td className="right-align">{props.mealFood.attributes.number_of_servings}</td>
      <td className="right-align">{props.mealFood.attributes.calories}</td>
      <td className="right-align">
        <Link to={`/meal_foods/${props.mealFood.id}/edit`}>
          <img src={pencil} alt="Edit" />
        </Link>

        <button className="no-background" onClick={handleDeleteClick}>
          <img src={trash} alt="Delete" />
        </button>
      </td>
    </tr>
  );
};

export default MealFoodCard;
