import React from 'react';
import DiaryCard from './DiaryCard';

const Diaries = props => {

  const createDiaryCards = props.diaries.filter(diary => diary.attributes.date === props.date).map(filteredDiary => <DiaryCard diary={filteredDiary} key={filteredDiary.id} currentUser={props.currentUser} caloriesRemaining={props.caloriesRemaining} caloriesConsumed={props.caloriesConsumed} caloriesBurned={props.caloriesBurned} />);

  const displayDate = () => {
    const date = props.date.match(/\d+/g)
    const year = date[0]
    const month = date[1]
    const day = date[2]

    return `${month}/${day}/${year}`
  };

  const renderDiaryCards = () => {
    if (createDiaryCards.length > 0) {
      return createDiaryCards
    } else {
      return <button className="btn btn-primary-fill auto-width" onClick={() => props.createDiary(props.date, props.currentUser, props.history)}>Start Meal Diary for {displayDate()}</button>
    }
  };

  return (
    <div className="dashboard-container">
      <div className="row">
        {renderDiaryCards()}
      </div>
    </div>
  );
};

export default Diaries;
