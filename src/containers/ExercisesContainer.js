// HOW DO CONTAINER COMPONENTS WORK WITH ROUTES??????

import React, { Component } from 'react'
import { connect } from 'react-redux';

// for routing - WHAT IS SWITCH???
import { Route, Switch, withRouter } from 'react-router-dom';

// ORGANIZE ALL COMPONENTS INTO SEPARATE FOLDERS
import { getExercises } from '../actions/exercises';
import { addExercise } from '../actions/exercises';


import NewExerciseForm from '../components/NewExerciseForm'
import Exercises from '../components/Exercises'
import ExerciseCard from '../components/ExerciseCard'
import UpdateExercise from '../components/UpdateExercise'

class ExercisesContainer extends Component {

  // add componentDidMount that calls a fetchExercises function from actions/exercises.js??????

  componentDidMount() {
    // this.props.loggedIn ? this.props.getExercises() : null
    // if I end up using this component - comment out all calls to dispatch(getExercises()) in currentUser.js
    this.props.getExercises()

  }

  render() {
    return (
      <div>
        {/*
        <NewExerciseForm addRestaurant={this.props.addExercise} />
        <Exercises exercises={this.props.exercises} updateExercise={this.props.updateExercise} deleteExercise={this.props.deleteExercise} />
        */}
        {/* SHOULD ONLY SHOW EXERCISES FOR THE CURRENT DAY - HAVE THE OPTION TO SEARCH BY DATE */}
        <h1>I'm in the exercises container</h1>
          <Switch>
            <Route exact path="/exercises/new" render={ (props) => <NewExerciseForm addExercise={this.props.addExercise} history={this.props.history} /> } />
            <Route exact path={this.props.match.url} render={(props) => <Exercises {...props} />} />
            <Route exact path={`${this.props.match.url}/:exerciseId/edit`} render={props => {
              const exercise = this.props.exercises.find(exercise => exercise.id === props.match.params.exerciseId)
              return <UpdateExercise exercise={exercise} {...props} />
            }} />

            {/*
            <Route exact path="/exercises" component={Exercises} />
            */}
          </Switch>
          {/*

          <Route exact path="/exercises" component={Exercises} />


          {/* ONLY WANT TO DISPLAY TODAY'S EXERCISES IF PATH IS /

          <Route exact path="/" component={Exercises} />
          */}

      </div>
    );
  }
};

const mapStateToProps = state => ({
  loggedIn: !!state.currentUser,
  exercises: state.exercises
});


const mapDispatchToProps = {
  getExercises,
  addExercise
}
// const mapDispatchToProps = dispatch => ({
//   getExercises,
//   addExercise: formData => dispatch({ type: "ADD_EXERCISE", text: formData }),
//   updateExercise: (formData, id) => dispatch({ type: "UPDATE_EXERCISE", exercise: { text: formData, id: id } }),
//   deleteExercise: exerciseId => dispatch({ type: "DELETE_EXERCISE", id: exerciseId })
// });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExercisesContainer));
// export default connect(null, mapDispatchToProps)(ExercisesContainer);
