import React, { Component } from 'react'
import { connect } from 'react-redux';

// for routing - WHAT IS SWITCH???
// removed withRouter 9/20/20 and seems to be working okay
import { Route, Switch } from 'react-router-dom';

import { getDiaries } from '../actions/diaries';
import { createDiary } from '../actions/diaries';

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

    this.props.getDiaries()
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
                  <Diaries diaries={this.props.diaries} currentUser={this.props.currentUser} createDiary={this.props.createDiary} date={this.getDate()} {...props} />
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
const mapStateToProps = state => ({
  loggedIn: !!state.currentUser,
  currentUser: state.currentUser,
  diaries: state.diaries
});


const mapDispatchToProps = {
  getDiaries,
  createDiary
}



// the function returned from invoking connect that will now supply DiariesContainer with props included state as descriped in MSTP and actions as described in MDTP takes DiariesContainer as an argument - the whole expression is a connected DiariesContainer component with state and actions
// not just exporting the const from above, but exporting a bulked up version with state and actions

// removed withRouter 9/20/20 and seems to be working okay
export default connect(mapStateToProps, mapDispatchToProps)(DiariesContainer);
