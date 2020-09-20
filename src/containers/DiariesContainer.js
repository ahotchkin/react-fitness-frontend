import React, { Component } from 'react'
import { connect } from 'react-redux';

// for routing - WHAT IS SWITCH???
// removed withRouter 9/20/20 and seems to be working okay
import { Route, Switch } from 'react-router-dom';

import { getDiaries } from '../actions/diaries';
import { createDiary } from '../actions/diaries';
// import { updateExercise } from '../actions/exercises';
// import { deleteExercise } from '../actions/exercises';

import Diaries from '../components/diaries/Diaries'
// import ExerciseInput from '../components/exercises/ExerciseInput'
// import ExerciseUpdate from '../components/exercises/ExerciseUpdate'

class DiariesContainer extends Component {

  // add componentDidMount that calls a fetchExercises function from actions/exercises.js??????

  // SHOULD I BE USING THE OTHER LIFECYCLE METHODS???????
  componentDidMount() {
    // this.props.loggedIn ? this.props.getExercises() : null
    // if I end up using this component - comment out all calls to dispatch(getExercises()) in currentUser.js
    this.props.getDiaries()

  }

  render() {
    return (
      <div>
        {/* SHOULD ONLY SHOW DIARY FOR THE CURRENT DAY - HAVE THE OPTION TO SEARCH BY DATE */}
        <h1>I'm in the diaries container</h1>
          <Switch>
            <Route exact path={this.props.match.url} render={(props) => <Diaries diaries={this.props.diaries} currentUser={this.props.currentUser} createDiary={this.props.createDiary} {...props} />} />
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
