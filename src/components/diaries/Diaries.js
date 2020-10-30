// ******************ATTEMPT #1************************************
// import React from 'react';
// import DiaryCard from './DiaryCard';
//
// const Diaries = props => {
//
//
//   const today = new Date();
//   const day = today.getDate();
//   const dd = () => { return (day < 10 ? '0' : '') + day }
//   const month = today.getMonth() + 1
//   const mm = () => { return (month < 10 ? '0' : '') + month }
//   const yyyy = today.getFullYear();
//   const todaysDate = `${yyyy}-${mm()}-${dd()}`
//
//   // filter desired diary before mapping to avoid a situation where nothing would be returned at the end of map - necessary to avoid warning: Expected to return a value at the end of arrow function array-callback-return
//   const diaryCard = props.diaries.filter(diary => diary.attributes.date === todaysDate).map(filteredDiary => <DiaryCard diary={filteredDiary} key={filteredDiary.id} />)
//
//   return (
//     <div>
//       <h2>Diaries</h2>
//       {/* props.diaries is an empty array on page refresh, but is populated on login...... what is happening here*/}
//       {/* move createDiary to separate function? */}
//       { diaryCard.length > 0 ? diaryCard : <button onClick={() => props.createDiary(todaysDate, props.currentUser, props.history)}>Start Today's Meal Diary</button> }
//     </div>
//   )
// }
//
// export default Diaries;



// **************************************************************************************************************
// *************************ATTEMPT #2*************************************

// import React, { Component } from 'react';
// import DiaryCard from './DiaryCard';
// import SearchByDate from '../SearchByDate';
//
// class Diaries extends Component {
//
//   state = {
//     // startDate: new Date()
//     startDate: ""
//   };
//
//   componentDidMount = () => {
//
//     if (!!this.props.location.state) {
//       // const currentDate = new Date()
//       // console.log(currentDate)
//       // const gmtTime = currentDate.toISOString().split("T")[1]
//       // console.log(gmtTime)
//       const diaryDate = this.props.location.state.date
//       // console.log(diaryDate)
//       // console.log(new Date(diaryDate + "T" + gmtTime).toString())
//       // console.log(new Date(diaryDate + "T" + gmtTime).toString().length)
//       // console.log(new Date(diaryDate + "T" + gmtTime).toUTCString())
//
//       // Below code is getting digits of timezone difference to be used when creating startDate.
//       // Necessary so day always shows as day the user came from, not the day before (due to time difference).
//       const a = new Date(diaryDate).toString().split("")[29]
//       const b = new Date(diaryDate).toString().split("")[30]
//       const c = new Date(diaryDate).toString().split("")[31]
//       const d = new Date(diaryDate).toString().split("")[32]
//
//       const hh = a + b
//       const mm = c + d
//
//       // date is showing up as day before. I think because when I create the date as above it is a day earlier in EST. it's taking the GMT time zone and thinking it's EST.
//       // what if i get the time differrence from currentDate and add it to the gmtTime?
//
//       this.setState({
//         startDate: new Date(diaryDate + ` ${hh}:${mm}:00 GMT`)
//       })
//     } else {
//       this.setState({
//         startDate: new Date()
//       })
//     }
//
//   }
//
//   handleOnChange = date => {
//     this.setState({
//       startDate: date,
//     });
//   };
//
//   // Below method accounts for time zone difference, ensures date is correct based on location
//   getDate = () => {
//     const tzoffset = this.state.startDate.getTimezoneOffset() * 60000; //offset in milliseconds
//     const date = (new Date(this.state.startDate - tzoffset)).toISOString().split("T")[0];
//     return date
//   }
//
//   createDiaryCards = () => {
//
//     // BELOW CODE IS CAUSING BUG AND CREATING SEVERAL DIARIES FOR ANY GIVEN DAY. TRIED TO SOLVE THIS WITH VALIDATIONS ON BACKEND, BUT KEPT GETTING ERRORS. WORKAROUND IS TO KEEP "START DIARY" BUTTON AND ADD VALIDATION ON BACKEND TO ENSURE USER CAN'T CREATE MORE THAN ONE DIARY WITH THE SAME DATE
//     // const foundDiary = this.props.diaries.find(diary => diary.attributes.date === this.getDate())
//     // // console.log(foundDiary.length)
//     //
//     // if (!foundDiary) {
//     //   const newDiary = this.props.createDiary(this.getDate(), this.props.currentUser, this.props.history)
//     // }
//
//     // filter desired diary before mapping to avoid a situation where nothing would be returned at the end of map - necessary to avoid warning: Expected to return a value at the end of arrow function array-callback-return
//     return this.props.diaries.filter(diary => diary.attributes.date === this.getDate()).map(filteredDiary => <DiaryCard diary={filteredDiary} key={filteredDiary.id} />)
//   }
//
//   renderDiaryCards = () => {
//     if (this.createDiaryCards().length > 0) {
//       return this.createDiaryCards()
//     } else {
//       return <button onClick={() => this.props.createDiary(this.getDate(), this.props.currentUser, this.props.history)}>Start Meal Diary for {this.getDate()}</button>
//     }
//   }
//
//
//
//   render() {
//     return (
//       <div>
//         <h2>Diaries</h2>
//           <h4>Search for Meal Diary by Date:</h4>
//             <SearchByDate startDate={this.state.startDate} handleOnChange={this.handleOnChange}/>
//             {console.log(this.props)}
//             {console.log(this.state.startDate)}
//
//             {/* props.diaries is an empty array on page refresh, but is populated on login...... what is happening here*/}
//
//             {/* move createDiary to separate function? */}
//             { this.state.startDate != "" ?
//               this.renderDiaryCards()
//             :
//               null
//             }
//             {/*
//             { this.renderDiaryCards().length > 0 ? this.renderDiaryCards() : <button onClick={() => this.props.createDiary(this.getDate(), this.props.currentUser, this.props.history)}>Start Meal Diary for {this.getDate()}</button> }
//             */}
//
//
//       </div>
//     )
//   }
// }
//
// export default Diaries;

// **************************************************************************************************************
// *************************ATTEMPT #3*************************************

import React from 'react';
import DiaryCard from './DiaryCard';

const Diaries = props => {

  const createDiaryCards = props.diaries.filter(diary => diary.attributes.date === props.date).map(filteredDiary => <DiaryCard diary={filteredDiary} key={filteredDiary.id} currentUser={props.currentUser} caloriesConsumed={props.caloriesConsumed} caloriesBurned={props.caloriesBurned} />)

  const displayDate = () => {
    const date = props.date.match(/\d+/g)
    const year = date[0]
    const month = date[1]
    const day = date[2]

    return `${month}/${day}/${year}`
  }

  const renderDiaryCards = () => {
    if (createDiaryCards.length > 0) {
      return createDiaryCards
    } else {
      // move createDiary to separate function?
      return <button className="btn btn-primary-fill auto-width" onClick={() => props.createDiary(props.date, props.currentUser, props.history)}>Start Meal Diary for {displayDate()}</button>
    }
  }

  return (
    <div className="dashboard-container">
      <div className="row">
        {renderDiaryCards()}
      </div>
    </div>
  )
}

export default Diaries;
