import React from 'react';

// CAN'T GET THE RELATIVE PATH TO WORK....
import MealsContainer from '/Users/allysonhotchkin/Development/code/react-fitness-app/react-fitness-frontend/src/containers/MealsContainer';

const DiaryCard = ({ diary, caloriesBurned }) => {
  return (
    <div>
      <h3>Meal Diary for {diary.attributes.date}</h3>
      <h4>Remaining Calories = Daily Calories - Consumed Calories + Burned Calories</h4>
      <h4>XXX (Remaining) = XXX (Daily) - XXX (Consumed) + {caloriesBurned} (Burned)</h4>
      {console.log("diary: ", diary)}
      {/* DOES DIARYID NEED TO BE PASSED DOWN THROUGH ALL OF THESE COMPONENTS? AM I EVER USING IT? */}
      <MealsContainer diaryId={diary.id} diaryDate={diary.attributes.date} />
    </div>

  )
}

export default DiaryCard;
