import React from 'react';

// CAN'T GET THE RELATIVE PATH TO WORK....
import MealsContainer from '/Users/allysonhotchkin/Development/code/react-fitness-app/react-fitness-frontend/src/containers/MealsContainer';

const DiaryCard = ({ diary }) => {
  return (
    <div>
      <h3>Meal Diary for {diary.attributes.date}</h3>
      {console.log("diary: ", diary)}
      {/* DOES DIARYID NEED TO BE PASSED DOWN THROUGH ALL OF THESE COMPONENTS? AM I EVER USING IT? */}
      <MealsContainer diaryId={diary.id} diaryDate={diary.attributes.date} />
    </div>

  )
}

export default DiaryCard;
