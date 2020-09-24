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


import React, { Component } from 'react';
import DiaryCard from './DiaryCard';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class Diaries extends Component {

  state = {
    startDate: new Date()

  };

  handleChange = date => {
    this.setState({
      startDate: date,
    });
  };




  getDate = () => {
    const today = new Date();
    const day = today.getDate();
    const dd = () => { return (day < 10 ? '0' : '') + day }
    const month = today.getMonth() + 1
    const mm = () => { return (month < 10 ? '0' : '') + month }
    const yyyy = today.getFullYear();
    const todaysDate = `${yyyy}-${mm()}-${dd()}`
    return todaysDate
  }

  renderDiaryCards = () => {
    // filter desired diary before mapping to avoid a situation where nothing would be returned at the end of map - necessary to avoid warning: Expected to return a value at the end of arrow function array-callback-return
    // return this.props.diaries.filter(diary => diary.attributes.date === this.getDate()).map(filteredDiary => <DiaryCard diary={filteredDiary} key={filteredDiary.id} />)


    return this.props.diaries.filter(diary => diary.attributes.date === this.state.startDate.toISOString().split('T')[0]).map(filteredDiary => <DiaryCard diary={filteredDiary} key={filteredDiary.id} />)
  }



  render() {
    return (
      <div>
        <h2>Diaries</h2>
        {console.log(this.state.startDate)}
        {console.log(this.state.startDate.toISOString().split('T')[0])}
          <h4>Search for Meal Diary by Date:</h4>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
            />
            {console.log(this.state.startDate)}

            {/* props.diaries is an empty array on page refresh, but is populated on login...... what is happening here*/}
            {/* move createDiary to separate function? */}
            { this.renderDiaryCards().length > 0 ? this.renderDiaryCards() : <button onClick={() => this.props.createDiary(this.getDate(), this.props.currentUser, this.props.history)}>Start Today's Meal Diary</button> }
      </div>
    )
  }
}

export default Diaries;

// import React from "react";
// import DatePicker from "react-datepicker";
//
// import "react-datepicker/dist/react-datepicker.css";
//
// // CSS Modules, react-datepicker-cssmodules.css
// // import 'react-datepicker/dist/react-datepicker-cssmodules.css';
//
// class Example extends React.Component {
//   state = {
//     startDate: new Date()
//   };
//
//   handleChange = date => {
//     this.setState({
//       startDate: date
//     });
//   };
//
//   render() {
//     return (
//       <DatePicker
//         selected={this.state.startDate}
//         onChange={this.handleChange}
//       />
//     );
//   }
// }
