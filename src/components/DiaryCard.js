import React from 'react';

const DiaryCard = ({ diary }) => {
  return (
    <div>
      <h3>Meal Diary for {diary.attributes.date}</h3>
    </div>

  )
}

export default DiaryCard
