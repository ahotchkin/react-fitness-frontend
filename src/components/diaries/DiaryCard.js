import React from 'react';

// CAN'T GET THE RELATIVE PATH TO WORK....
import MealsContainer from '/Users/allysonhotchkin/Development/code/react-fitness-app/react-fitness-frontend/src/containers/MealsContainer';

const DiaryCard = ({ diary }) => {
  return (
    <div>
      <h3>Meal Diary for {diary.attributes.date}</h3>
      <MealsContainer />
    </div>

  )
}

export default DiaryCard;
