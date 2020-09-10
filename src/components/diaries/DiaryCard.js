import React from 'react';
import Meals from '../Meals';

const DiaryCard = ({ diary }) => {
  return (
    <div>
      <h3>Meal Diary for {diary.attributes.date}</h3>
      <Meals />
    </div>

  )
}

export default DiaryCard;
