import React from 'react';
import { Link } from 'react-router-dom';
import MealFoodsContainer from '../../containers/MealFoodsContainer';

const MealCard = (props) => {

  return (
    <div>
      <h3>{props.meal.attributes.category}</h3>
      <p>Calories: {props.meal.attributes.calories}</p>

      <MealFoodsContainer meal={props.meal} />

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
  );
};

export default MealCard;
