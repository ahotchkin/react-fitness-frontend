import React, { Component } from 'react'
import { connect } from 'react-redux';

// for routing - WHAT IS SWITCH???
// removed withRouter 9/20/20 and seems to be working okay
import { Route, Switch } from 'react-router-dom';

import { getExercises } from '../actions/exercises';
import { createExercise } from '../actions/exercises';
import { updateExercise } from '../actions/exercises';
import { deleteExercise } from '../actions/exercises';

import Exercises from '../components/exercises/Exercises';
import ExerciseInput from '../components/exercises/ExerciseInput';
import ExerciseUpdate from '../components/exercises/ExerciseUpdate';

// ********************************************
import SearchByDate from '../components/SearchByDate';
// ********************************************

class ExercisesContainer extends Component {

// ***************************************
  state = {
    startDate: new Date()
    // startDate: ""
  };

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


  // add componentDidMount that calls a fetchExercises function from actions/exercises.js??????

  // SHOULD I BE USING THE OTHER LIFECYCLE METHODS???????
  componentDidMount() {
    // this.props.loggedIn ? this.props.getExercises() : null
    // if I end up using this component - comment out all calls to dispatch(getExercises()) in currentUser.js
    this.props.getExercises()

  }

  render() {
    return (
      <div>
        {/* SHOULD ONLY SHOW EXERCISES FOR THE CURRENT DAY - HAVE THE OPTION TO SEARCH BY DATE */}
        {/* UPDATE ALL ROUTES TO {THIS.PROPS.MATCH.URL} */}
        <h1>I'm in the exercises container</h1>
          <Switch>
            <Route exact path="/exercises/new" render={props =>
              <div>
              Date: <SearchByDate startDate={this.state.startDate} handleOnChange={this.handleOnChange} />
              <ExerciseInput currentUser={this.props.currentUser} createExercise={this.props.createExercise} date={this.getDate()} history={this.props.history} />
              </div>} />
            <Route exact path={this.props.match.url} render={props =>
              <div>
              <SearchByDate startDate={this.state.startDate} handleOnChange={this.handleOnChange}/>
              <Exercises exercises={this.props.exercises} deleteExercise={this.props.deleteExercise} date={this.getDate()} {...props} /></div>} />
            <Route exact path={`${this.props.match.url}/:exerciseId/edit`} render={props => {
              const exercise = this.props.exercises.find(exercise => exercise.id === props.match.params.exerciseId)
              return (
              <div>
                <SearchByDate startDate={this.state.startDate} handleOnChange={this.handleOnChange} />
                <ExerciseUpdate exercise={exercise} currentUser={this.props.currentUser} updateExercise={this.props.updateExercise} date={this.getDate()} {...props} />
              </div>
              )
            }} />

          </Switch>

          {/* ONLY WANT TO DISPLAY TODAY'S EXERCISES IF PATH IS /

          <Route exact path="/" component={Exercises} />
          */}

      </div>
    );
  }
};

// receives the state of the Redux store as an argument
const mapStateToProps = state => ({
  loggedIn: !!state.currentUser,
  currentUser: state.currentUser,
  exercises: state.exercises
});


const mapDispatchToProps = {
  getExercises,
  createExercise,
  updateExercise,
  deleteExercise
}
// const mapDispatchToProps = dispatch => ({
//   getExercises,
//   createExercise: formData => dispatch({ type: "ADD_EXERCISE", text: formData }),
//   updateExercise: (formData, id) => dispatch({ type: "UPDATE_EXERCISE", exercise: { text: formData, id: id } }),
//   deleteExercise: exerciseId => dispatch({ type: "DELETE_EXERCISE", id: exerciseId })
// });


// the function returned from invoking connect that will now supply ExercisesContainer with props included state as descriped in MSTP and actions as described in MDTP takes ExercisesContainer as an argument - the whole expression is a connected ExercisesContainer component with state and actions
// not just exporting the const from above, but exporting a bulked up version with state and actions

// removed withRouter 9/20/20 and seems to be working okay
export default connect(mapStateToProps, mapDispatchToProps)(ExercisesContainer);
