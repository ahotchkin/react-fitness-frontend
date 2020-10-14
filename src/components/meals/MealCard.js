import React from 'react';
import { Link } from 'react-router-dom';
import MealFoodsContainer from '../../containers/MealFoodsContainer';

const MealCard = (props) => {

  return (
    <div>
      <h5>{props.meal.attributes.category}: {props.meal.attributes.calories} calories</h5>

      <MealFoodsContainer meal={props.meal} />

      <Link to={{
        pathname: `/meals/${props.meal.id}/foods`,
        state: {
          // diaryId: props.diaryId,
          diaryDate: props.diaryDate
        }
      }}>
        <button className="btn btn-primary-outline btn-sm" type="button">
          Add Food
        </button>
      </Link>

      <hr className="solid-thin" />
    </div>
  );
};

export default MealCard;
