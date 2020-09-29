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

import React, { Component } from 'react';
import DiaryCard from './DiaryCard';
import SearchByDate from '../SearchByDate';

class Diaries extends Component {

  state = {
    // if this.props.location.state.date is empty, startDate: new Date(). Otherwise, startDate: this.props.location.state.date


    // startDate: new Date()
    startDate: ""
  };

  componentDidMount = () => {
    // if (!!this.props.location.state) {
    //   console.log(new Date(this.props.location.state.date))
    //
    //
    // }
    if (!!this.props.location.state) {
      this.setState({
        startDate: new Date(this.props.location.state.date)
      })
    } else {
      this.setState({
        startDate: new Date()
      })
    }

  }

  handleOnChange = date => {
    this.setState({
      startDate: date,
    });
  };

  // Below method accounts for time zone difference, ensures date is correct based on location
  getDate = () => {
    const tzoffset = this.state.startDate.getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = (new Date(this.state.startDate - tzoffset)).toISOString().split("T")[0];
    return localISOTime
  }

  createDiaryCards = () => {

    // BELOW CODE IS CAUSING BUG AND CREATING SEVERAL DIARIES FOR ANY GIVEN DAY. TRIED TO SOLVE THIS WITH VALIDATIONS ON BACKEND, BUT KEPT GETTING ERRORS. WORKAROUND IS TO KEEP "START DIARY" BUTTON AND ADD VALIDATION ON BACKEND TO ENSURE USER CAN'T CREATE MORE THAN ONE DIARY WITH THE SAME DATE
    // const foundDiary = this.props.diaries.find(diary => diary.attributes.date === this.getDate())
    // // console.log(foundDiary.length)
    //
    // if (!foundDiary) {
    //   const newDiary = this.props.createDiary(this.getDate(), this.props.currentUser, this.props.history)
    // }

    // filter desired diary before mapping to avoid a situation where nothing would be returned at the end of map - necessary to avoid warning: Expected to return a value at the end of arrow function array-callback-return
    return this.props.diaries.filter(diary => diary.attributes.date === this.getDate()).map(filteredDiary => <DiaryCard diary={filteredDiary} key={filteredDiary.id} />)
  }

  renderDiaryCards = () => {
    if (this.createDiaryCards().length > 0) {
      return this.createDiaryCards()
    } else {
      return <button onClick={() => this.props.createDiary(this.getDate(), this.props.currentUser, this.props.history)}>Start Meal Diary for {this.getDate()}</button>
    }
  }



  render() {
    return (
      <div>
        <h2>Diaries</h2>
          <h4>Search for Meal Diary by Date:</h4>
            <SearchByDate startDate={this.state.startDate} handleOnChange={this.handleOnChange}/>
            {console.log(this.props)}
            {console.log(this.state.startDate)}

            {/* props.diaries is an empty array on page refresh, but is populated on login...... what is happening here*/}

            {/* move createDiary to separate function? */}
            { this.state.startDate != "" ?
              this.renderDiaryCards()
            :
              <p>We don't have a date yet</p>
            }
            {/*
            { this.renderDiaryCards().length > 0 ? this.renderDiaryCards() : <button onClick={() => this.props.createDiary(this.getDate(), this.props.currentUser, this.props.history)}>Start Meal Diary for {this.getDate()}</button> }
            */}


      </div>
    )
  }
}

export default Diaries;
