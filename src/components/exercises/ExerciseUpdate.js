import React, { Component } from 'react';

class ExerciseUpdate extends Component {

  // CAN I REFACTOR AND USE THE SAME FORM FOR NEW AND UPDATE?????? WATCH GLOBETROTTER PART 11
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

    this.props.updateExercise(this.state, this.props.date, this.props.exercise, this.props.history)
    this.setState({
      // drop down stays selected on whatever category was selected. Is this a problem or will it always update on page refresh?
      category: "",
      name: "",
      duration_in_minutes: "",
      calories_burned: ""
    });
  };

  render() {
    return(
      <div>
        This is the update exercise page for {this.props.exercise.attributes.name}
        <br /><br />

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
    );
  };
};

export default ExerciseUpdate;
