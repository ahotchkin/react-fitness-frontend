// HOW DO CONTAINER COMPONENTS WORK WITH ROUTES??????

import React, { Component } from 'react'
import { connect } from 'react-redux';

// for routing - WHAT IS SWITCH???
import { Route, Switch, withRouter } from 'react-router-dom';

// ORGANIZE ALL COMPONENTS INTO SEPARATE FOLDERS
import { getExercises } from '../actions/exercises';
import { createExercise } from '../actions/exercises';
import { updateExercise } from '../actions/exercises';
import { deleteExercise } from '../actions/exercises';


import ExerciseInput from '../components/exercises/ExerciseInput'
import Exercises from '../components/exercises/Exercises'
import ExerciseUpdate from '../components/exercises/ExerciseUpdate'

class ExercisesContainer extends Component {

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
        <h1>I'm in the exercises container</h1>
          <Switch>
            <Route exact path="/exercises/new" render={ (props) => <ExerciseInput currentUser={this.props.currentUser} createExercise={this.props.createExercise} history={this.props.history} /> } />
            <Route exact path={this.props.match.url} render={(props) => <Exercises exercises={this.props.exercises} deleteExercise={this.props.deleteExercise} {...props} />} />
            <Route exact path={`${this.props.match.url}/:exerciseId/edit`} render={props => {
              const exercise = this.props.exercises.find(exercise => exercise.id === props.match.params.exerciseId)
              return <ExerciseUpdate exercise={exercise} currentUser={this.props.currentUser} updateExercise={this.props.updateExercise} {...props} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExercisesContainer));
// export default connect(null, mapDispatchToProps)(ExercisesContainer);
