import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateExercise } from '../actions/exercises';

// rename to CreateExercise????
class UpdateExercise extends Component {

  state = {
    category: this.props.exercise.attributes.category,
    name: this.props.exercise.attributes.name,
    duration_in_minutes: this.props.exercise.attributes.duration_in_minutes,
    calories_burned: this.props.exercise.attributes.calories_burned
  }

  handleOnChange = event => {
    // is this necessary? WHAT DOES EVENT.PERSIST() DO??????
    event.persist()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    // set the state here by accessing props provided by mapDispatchToProps
    console.log(this.props)
    this.props.updateExercise(this.state, this.props.exercise, this.props.history)
    this.setState({
      // drop down stays selected on whatever category was selected. Is this a problem or will it always update on page refresh?
      category: "",
      name: "",
      duration_in_minutes: "",
      calories_burned: ""
    })
    console.log("you updated your exercise!!!")
  };




  render() {
    return(
      <div>

        This is the update exercise page for {this.props.exercise.attributes.name}
        <br /><br />
        {console.log(this.state)}


        <form onSubmit={this.handleSubmit}>
          <label>Category: </label>
          <select name="category" value={this.state.category} onChange={this.handleOnChange}>
            <option value="cardio">Cardio</option>
            <option value="strength_training">Strength Training</option>
            <option value="balance">Balance</option>
            <option value="stretching">Stretching</option>
          </select>

          <br />

          <label>Name: </label>
          <input
            name="name"
            onChange={this.handleOnChange}
            value={this.state.name}
          />

          <br />

          <label>Minutes Performed: </label>
          <input
            name="duration_in_minutes"
            onChange={this.handleOnChange}
            value={this.state.duration_in_minutes}
          />

          <br />

          <label>Calories Burned: </label>
          <input
            name="calories_burned"
            onChange={this.handleOnChange}
            value={this.state.calories_burned}
          />

          <br />

          <input type="submit" value="Update Exercise" />
        </form>

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
