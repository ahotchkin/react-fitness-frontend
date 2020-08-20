import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DiaryCard from './DiaryCard.js';
// import Meals from './Meals';

const Diaries = props => {

  const today = new Date();
  const day = today.getDate();
  const dd = () => { return (day < 10 ? '0' : '') + day }
  const month = today.getMonth() + 1
  const mm = () => { return (month < 10 ? '0' : '') + month }
  const yyyy = today.getFullYear();
  const date = yyyy+'-'+mm+'-'+dd


  const diaryCards = props.diaries.map(diary => {
    if (diary.attributes.date === `${yyyy}-${mm()}-${dd()}`) {
      {console.log(diary.attributes.date === `${yyyy}-${mm()}-${dd()}`)}

      return <DiaryCard diary={diary} key={diary.id} />
    }
  })



  // in return, going more than one level deep, so need to make sure exerciseCards are there before rendering anything. instead of just saying exerciseCards, need to say: { exerciseCards.length > 0 ? exerciseCards : null }
  // <Link to="/exercises/new">
  //   <button type="button">
  //     Add Exercise
  //   </button>
  // </Link>
  return (
    <div>
      <h2>Diaries</h2>
      {/* props.diaries is an empty array on page refresh, but is populated on login...... what is happening here*/}

      { diaryCards.length > 0 ? diaryCards : null }



    </div>
  )
}

// receives the state of the Redux store as an argument
const mapStateToProps = state => {
  return {
    diaries: state.diaries
  }
}

// the function returned from invoking connect taht will now supply Exercises with props included state as descriped in MSTP and actions as described in MDTP takes Exercises as an argument - the whole expression is a connected Exercises component with state and actions
// not just exporting the const from above, but exporting a bulked up version with state and actions
export default connect(mapStateToProps)(Diaries)
