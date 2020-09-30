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
      const diaryDate = this.props.location.state.date
      // console.log(diaryDate)
      // console.log(new Date(diaryDate + "T" + gmtTime).toString())
      // console.log(new Date(diaryDate + "T" + gmtTime).toString().length)
      // console.log(new Date(diaryDate + "T" + gmtTime).toUTCString())

      // Below code is getting digits of timezone difference to be used when creating startDate
      // Sets the first two digits to hh an the second two digits to mm
      // Uses this data to set the GMT time so day always shows as day the user came from, not the day before (due to time difference)
      const a = new Date(diaryDate).toString().split("")[29]
      const b = new Date(diaryDate).toString().split("")[30]
      const c = new Date(diaryDate).toString().split("")[31]
      const d = new Date(diaryDate).toString().split("")[32]

      const hh = a + b
      const mm = c + d

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
