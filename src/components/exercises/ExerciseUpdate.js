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
    // this.setState({
    //   // drop down stays selected on whatever category was selected. Is this a problem or will it always update on page refresh?
    //   // category: "",
    //   // name: "",
    //   // duration_in_minutes: "",
    //   // calories_burned: ""
    // });
  };

  render() {
    return(
      <div>
      {console.log(this.state.category)}

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">Category: </label>
            <select className="form-control" name="category" id="category" value={this.state.category} onChange={this.handleOnChange}>
              <option value="cardio">Cardio</option>
              <option value="strength">Strength Training</option>
              <option value="balance">Balance</option>
              <option value="stretching">Stretching</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              onChange={this.handleOnChange}
              value={this.state.name}
            />
          </div>


          <div className="form-row">
            <div className="form-group col-md-6">

              <label htmlFor="duration_in_minutes">Minutes Performed: </label>
              <input
                type="number"
                className="form-control"
                name="duration_in_minutes"
                id="duration_in_minutes"
                onChange={this.handleOnChange}
                value={this.state.duration_in_minutes}
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="calories_burned">Calories Burned: </label>
              <input
                type="number"
                className="form-control"
                name="calories_burned"
                id="calories_burned"
                onChange={this.handleOnChange}
                value={this.state.calories_burned}
              />
            </div>
          </div>

          <input type="submit" className="btn btn-primary-fill" value="Update Exercise" />

        </form>
      </div>
    );
  };
};

export default ExerciseUpdate;
