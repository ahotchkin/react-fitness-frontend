import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateExercise } from '../actions/exercises';

// rename to CreateExercise????
class UpdateExercise extends Component {

  // state = {
  //   category: this.props.exercise.category,
  //   name: this.props.exercise.name,
  //   duration_in_minutes: this.props.exercise.duration_in_minutes,
  //   calories_burned: this.props.exercise.calories_burned
  // }
  //
  // handleOnChange = event => {
  //   // is this necessary?
  //   event.persist()
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   })
  // }
  //
  // handleSubmit = event => {
  //   event.preventDefault();
  //   // set the state here by accessing props provided by mapDispatchToProps
  //   console.log(this.props)
  //   this.props.updateExercise(this.state, this.props.history)
  //   this.setState({
  //     // drop down stays selected on whatever category was selected. Is this a problem or will it always update on page refresh?
  //     category: "",
  //     name: "",
  //     duration_in_minutes: "",
  //     calories_burned: ""
  //   })
  //   console.log("you updated your exercise!!!")
  // };

  render() {
    return(
      <div>
        {console.log(this.props)}

        This is the update exercise page
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

// how can I get this to work to be able to call mapDispatchToProps in connect???
// const mapDispatchToProps = dispatch => {
//   return {
//     addExercise: exerciseData => dispatch({ type: "ADD_EXERCISE", exerciseData })
//   }
// }

export default connect(mapStateToProps, { updateExercise })(UpdateExercise);
// export default connect(mapStateToProps)(NewExerciseForm);
