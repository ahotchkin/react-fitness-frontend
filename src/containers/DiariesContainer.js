import React, { Component } from 'react'
import { connect } from 'react-redux';

// for routing - WHAT IS SWITCH???
// removed withRouter 9/20/20 and seems to be working okay
import { Route, Switch } from 'react-router-dom';

// don't need to dispatch diaries here since it is dispatched in getCurrentUser, login, and signUp
// import { getDiaries } from '../actions/diaries';
import { createDiary } from '../actions/diaries';

// import { getExercises } from '../actions/exercises';
// import { getMeals } from '../actions/meals'

import Diaries from '../components/diaries/Diaries'

// ********************************************
import SearchByDate from '../components/SearchByDate';
// ********************************************


class DiariesContainer extends Component {

  // state = {
  //   loaded: false
  // }

  // ***************************************
  state = {
    loaded: false,
    // startDate: new Date()
    startDate: ""
  };

  // SHOULD I BE USING THE OTHER LIFECYCLE METHODS???????
  componentDidMount() {
    // this.props.loggedIn ? this.props.getExercises() : null
    // if I end up using this component - comment out all calls to dispatch(getExercises()) in currentUser.js

    if (!!this.props.location.state) {
      // const currentDate = new Date()
      // console.log(currentDate)
      // const gmtTime = currentDate.toISOString().split("T")[1]
      // console.log(gmtTime)
      console.log(this.props)
      const diaryDate = this.props.location.state.diaryDate
      console.log(diaryDate)
      console.log(new Date(diaryDate))
      // console.log(new Date(diaryDate + "T" + gmtTime).toString())
      // console.log(new Date(diaryDate + "T" + gmtTime).toString().length)
      // console.log(new Date(diaryDate + "T" + gmtTime).toUTCString())

      // Below code is getting digits of timezone difference from GMT to be used when setting startDate
      // new Date(diaryDate) creates a date that is set to midnight GMT, which will not always be the correct day based on the user's timezone
        // If user's timezone is GMT-XXXX, hh is set to first two digits and mm is set to second two digits
          // i.e. EST, which is GMT-0400, would be set to hh = 04, mm = 00
        // If user's timezone is GMT+XXXX, hh is set to 24 - first two digits and mm is set to second two digits
          // i.e. Australia WST, which is GMT+0800, would be set to hh = 16 (or 24 - 08), mm = 00
      // Uses this data to set the day to midnight of diaryDate, no matter what time of day or timezone user is in
      // Ensures user will always see the correct diaryDate, and not the day before or after depending on timezone
      const a = new Date(diaryDate).toString().split("")[29]
      const b = new Date(diaryDate).toString().split("")[30]
      const c = new Date(diaryDate).toString().split("")[31]
      const d = new Date(diaryDate).toString().split("")[32]
      const e = new Date(diaryDate).toString().split("")[28]
      console.log(e)
      let hh = ""
      let mm = ""
      if (e === "+") {
        hh = 24 - (a + b)
        mm = c + d
      } else {
        hh = a + b
        mm = c + d
      }

      // const hh = a + b
      // const mm = c + d

      console.log(new Date(diaryDate + ` ${hh}:${mm}:00 GMT`))

      this.setState({
        loaded: true,
        startDate: new Date(diaryDate + ` ${hh}:${mm}:00 GMT`)
      })
    } else {
      this.setState({
        loaded: true,
        startDate: new Date()
      })
    }

    // this.props.getDiaries()

    // this.props.getExercises()
    // this.setState({
    //   loaded: true
    // })
  }

  handleOnChange = date => {
    this.setState({
      startDate: date,
    });
  };

  // Below method accounts for time zone difference, ensures date is correct based on location
  getDate = () => {
    const tzoffset = this.state.startDate.getTimezoneOffset() * 60000; //offset in milliseconds
    const date = (new Date(this.state.startDate - tzoffset)).toISOString().split("T")[0];
    return date
  }

  // getTodaysDate = () => {
  //   const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  //   const date = (new Date(new Date() - tzoffset)).toISOString().split("T")[0];
  //   return date
  // }

  caloriesConsumed = () => {
    let data = {}

    const todaysDiary = this.props.diaries.find(diary => diary.attributes.date === this.getDate())
    // Need to get meals from Redux Store rather than from diary.attributes or else /diaries will not refresh if mealFood is deleted
    if (!!todaysDiary) {
      const todaysMeals = this.props.meals.filter(meal => meal.relationships.diary.data.id === todaysDiary.id).map(filteredMeal => filteredMeal.attributes)

      if (todaysMeals.length > 0) {
        data = todaysMeals.reduce((a, b) => ({calories: a.calories + b.calories}))

      }
    }
    return data.calories


    // let data = {}
    // const todaysDiary = this.props.diaries.find(diary => diary.attributes.date === this.getDate())
    // console.log(todaysDiary)
    //
    // if (!!todaysDiary) {
    //   const todaysMeals = todaysDiary.attributes.meals
    //   console.log(todaysMeals)
    //   data = todaysMeals.reduce((a, b) => ({calories: a.calories + b.calories}))
    // }
    // return data.calories
  }

  caloriesBurned = () => {
    let data = {}

    // I don't think this first if statement is necessary here. It will always be an empty array at least, never undefined.
    if (!!this.props.exercises) {
      // filtering out today's Exercises and getting just the attributes so reduce function will work properly with more than two elements
      // ************************* NEED TO UPDATE THIS SO IF USER IS IN MEAL DIARY OR EXERCISES AND SELECTS A DIFFERENT DAY THE CORRECT TOTAL SHOWS UP *********************************
      const todaysExercises = this.props.exercises.filter(exercise => exercise.attributes.date === this.getDate()).map(filteredExercise => filteredExercise.attributes)

      if (todaysExercises.length === 1) {
        data = {calories_burned: todaysExercises[0].calories_burned}
      } else if (todaysExercises.length > 1) {
        data = todaysExercises.reduce((a, b) => ({calories_burned: a.calories_burned + b.calories_burned}))
      } else {
        data = {calories_burned: 0}
      }
    }

    return data.calories_burned
  }


  // ***************************************


  // // SHOULD I BE USING THE OTHER LIFECYCLE METHODS???????
  // componentDidMount() {
  //   // this.props.loggedIn ? this.props.getExercises() : null
  //   // if I end up using this component - comment out all calls to dispatch(getExercises()) in currentUser.js
  //   this.props.getDiaries()
  //   this.setState({
  //     loaded: true
  //   })
  // }

  render() {
    return (
      <div>
        <h1>I'm in the diaries container</h1>
          <Switch>
            { !!this.state.loaded ?
              <Route exact path={this.props.match.url} render={props =>
                <div>
                  <h4>Search for Meal Diary by Date:</h4>
                  <SearchByDate startDate={this.state.startDate} handleOnChange={this.handleOnChange}/>

                  <Diaries diaries={this.props.diaries} currentUser={this.props.currentUser} createDiary={this.props.createDiary} date={this.getDate()} caloriesConsumed={this.caloriesConsumed()} caloriesBurned={this.caloriesBurned()} {...props} />

                  {/* TO BE USED IF I CAN REFACTOR CALORIESBURNED() TO MAIN CONTAINER
                  <Diaries diaries={this.props.diaries} currentUser={this.props.currentUser} createDiary={this.props.createDiary} date={this.getDate()} caloriesBurned={this.props.caloriesBurned} {...props} />
                  */}
                </div>} />
            :
              null
            }
          </Switch>
          {/* ONLY WANT TO DISPLAY TODAY'S DIARY IF PATH IS /

          <Route exact path="/" component={Diaries} />
          */}

      </div>
    );
  }
};

// receives the state of the Redux store as an argument
// what do I need in mapStateToProps vs. mapDispatchToProps - go through all containers and review
const mapStateToProps = state => ({
  currentUser: state.currentUser,
  diaries: state.diaries,

  meals: state.meals,
  exercises: state.exercises
});


const mapDispatchToProps = {
  // getDiaries,
  createDiary,


  // getExercises
}



// the function returned from invoking connect that will now supply DiariesContainer with props included state as descriped in MSTP and actions as described in MDTP takes DiariesContainer as an argument - the whole expression is a connected DiariesContainer component with state and actions
// not just exporting the const from above, but exporting a bulked up version with state and actions

// removed withRouter 9/20/20 and seems to be working okay
export default connect(mapStateToProps, mapDispatchToProps)(DiariesContainer);
