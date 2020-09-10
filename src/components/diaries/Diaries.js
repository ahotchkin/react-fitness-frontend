import React from 'react';
import DiaryCard from './DiaryCard.js';

const Diaries = props => {

  const today = new Date();
  const day = today.getDate();
  const dd = () => { return (day < 10 ? '0' : '') + day }
  const month = today.getMonth() + 1
  const mm = () => { return (month < 10 ? '0' : '') + month }
  const yyyy = today.getFullYear();


  // filter desired diary before mapping to avoid a situation where nothing would be returned at the end of map - necessary to avoid warning: Expected to return a value at the end of arrow function array-callback-return
  const diaryCard = props.diaries.filter(diary => diary.attributes.date === `${yyyy}-${mm()}-${dd()}`).map(filteredDiary => <DiaryCard diary={filteredDiary} key={filteredDiary.id} />)

  return (
    <div>
      <h2>Diaries</h2>
      {/* props.diaries is an empty array on page refresh, but is populated on login...... what is happening here*/}

      // is this necessary? check on day when no diary exists
      { diaryCard.length > 0 ? diaryCard : null }
    </div>
  )
}

export default Diaries;
