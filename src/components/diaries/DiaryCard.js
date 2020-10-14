import React from 'react';

import MealsContainer from '../../containers/MealsContainer';

const DiaryCard = props => {
  return (
    <div className="col-lg info-container">
      <h3>Meal Diary for {props.diary.attributes.date}</h3>
      <h4>Calories: {props.currentUser.attributes.daily_calorie_goal} (Daily) - {props.caloriesConsumed} (Consumed) + {props.caloriesBurned} (Burned) = {props.currentUser.attributes.daily_calorie_goal - props.caloriesConsumed + props.caloriesBurned} (Remaining)</h4>

      <hr className="solid-thick" />
      
      <MealsContainer diaryId={props.diary.id} diaryDate={props.diary.attributes.date} />
    </div>

  )
}

export default DiaryCard;
