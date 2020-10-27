import React, { Component } from 'react'
import { connect } from 'react-redux';

// removed withRouter 9/20/20 and seems to be working okay
import { Route, Switch } from 'react-router-dom';

import { getExercises } from '../actions/exercises';
import { createExercise } from '../actions/exercises';
import { updateExercise } from '../actions/exercises';
import { deleteExercise } from '../actions/exercises';

import Exercises from '../components/exercises/Exercises';
import ExerciseInput from '../components/exercises/ExerciseInput';
import ExerciseUpdate from '../components/exercises/ExerciseUpdate';

// tried changing this to functional component but got an error in exercises - can't filter
class ExercisesContainer extends Component {

  // SHOULD I BE USING THE OTHER LIFECYCLE METHODS???????
  // componentDidMount() {
  //   // if I end up using this component - comment out all calls to dispatch(getExercises()) in currentUser.js
  //   this.props.getExercises()
  //
  // }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path={`${this.props.match.url}/new`} render={props =>
            <ExerciseInput currentUser={this.props.currentUser} createExercise={this.props.createExercise} date={this.props.date} history={this.props.history} />
          } />

          <Route exact path={this.props.match.url} render={props =>
            <Exercises exercises={this.props.exercises} deleteExercise={this.props.deleteExercise} date={this.props.date} caloriesBurned={this.props.caloriesBurned} {...props} />
          } />

          <Route exact path={`${this.props.match.url}/:exerciseId/edit`} render={props => {
            const exercise = this.props.exercises.find(exercise => exercise.id === props.match.params.exerciseId)
            if (!!exercise) {
              return (
                <ExerciseUpdate exercise={exercise} currentUser={this.props.currentUser} updateExercise={this.props.updateExercise} date={this.props.date} {...props} />
              )
            }
          }} />
        </Switch>
      </div>
    );
  };
};

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  exercises: state.exercises
});


const mapDispatchToProps = {
  // getExercises,
  createExercise,
  updateExercise,
  deleteExercise
};

// the function returned from invoking connect that will now supply ExercisesContainer with props included state as descriped in MSTP and actions as described in MDTP takes ExercisesContainer as an argument - the whole expression is a connected ExercisesContainer component with state and actions
// not just exporting the const from above, but exporting a bulked up version with state and actions

// removed withRouter 9/20/20 and seems to be working okay
export default connect(mapStateToProps, mapDispatchToProps)(ExercisesContainer);
