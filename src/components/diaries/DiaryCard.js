import React from 'react';

// CAN'T GET THE RELATIVE PATH TO WORK....
import MealsContainer from '/Users/allysonhotchkin/Development/code/react-fitness-app/react-fitness-frontend/src/containers/MealsContainer';

const DiaryCard = props => {
  console.log(props)
  return (
    <div>
      <h3>Meal Diary for {props.diary.attributes.date}</h3>
      <h4>Calories: {props.currentUser.attributes.daily_calorie_goal} (Daily) - {props.caloriesConsumed} (Consumed) + {props.caloriesBurned} (Burned) = {props.currentUser.attributes.daily_calorie_goal - props.caloriesConsumed + props.caloriesBurned} (Remaining)</h4>
      {console.log("diary: ", props.diary)}
      {/* DOES DIARYID NEED TO BE PASSED DOWN THROUGH ALL OF THESE COMPONENTS? AM I EVER USING IT? */}
      <MealsContainer diaryId={props.diary.id} diaryDate={props.diary.attributes.date} />
    </div>

  )
}

export default DiaryCard;
