import React, { Component } from 'react';

class ExerciseInput extends Component {

  state = {
    category: "",
    name: "",
    duration_in_minutes: "",
    calories_burned: ""
  }

  handleOnChange = event => {
    // is this necessary?
    event.persist()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    // set the state here by accessing props provided by mapDispatchToProps
    console.log(this.props)
    this.props.createExercise(this.state, this.props.date, this.props.currentUser, this.props.history)
    this.setState({
      // drop down stays selected on whatever category was selected. Is this a problem or will it always update on page refresh?
      category: "",
      name: "",
      duration_in_minutes: "",
      calories_burned: ""
    })
    console.log("you submitted your exercise!!!")
  };

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>Category: </label>
        <select name="category" defaultValue="DEFAULT" onChange={this.handleOnChange}>
          <option value="DEFAULT" disabled hidden>Select</option>
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

        <input type="submit" value="Add Exercise" />
      </form>
    )
  }
}

export default ExerciseInput;
