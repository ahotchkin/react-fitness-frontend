import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { createExercise } from '../actions/exercises';
import { updateExercise } from '../actions/exercises';
import { deleteExercise } from '../actions/exercises';

import Exercises from '../components/exercises/Exercises';
import ExerciseInput from '../components/exercises/ExerciseInput';
import ExerciseUpdate from '../components/exercises/ExerciseUpdate';

// tried changing this to functional component but got an error in exercises - can't filter
class ExercisesContainer extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route exact path={`${this.props.match.url}/new`} render={routerProps =>
            <ExerciseInput currentUser={this.props.currentUser} createExercise={this.props.createExercise} date={this.props.date} history={this.props.history} />
          } />

          <Route exact path={this.props.match.url} render={routerProps =>
            <Exercises exercises={this.props.exercises} deleteExercise={this.props.deleteExercise} date={this.props.date} caloriesBurned={this.props.caloriesBurned} {...routerProps} />
          } />

          <Route exact path={`${this.props.match.url}/:exerciseId/edit`} render={routerProps => {
            const exercise = this.props.exercises.find(exercise => exercise.id === routerProps.match.params.exerciseId)
            if (!!exercise) {
              return (
                <ExerciseUpdate exercise={exercise} currentUser={this.props.currentUser} updateExercise={this.props.updateExercise} date={this.props.date} {...routerProps} />
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
  createExercise,
  updateExercise,
  deleteExercise
};

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesContainer);
