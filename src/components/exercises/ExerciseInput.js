import React, { Component } from 'react';

class ExerciseInput extends Component {

  state = {
    category: "",
    name: "",
    duration_in_minutes: "",
    calories_burned: ""
  };

  handleOnChange = event => {
    // is this necessary? What is happening here?
    event.persist()
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.createExercise(this.state, this.props.date, this.props.currentUser, this.props.history)
    this.setState({
      // drop down stays selected on whatever category was selected. Is this a problem or will it always update on page refresh? fix this!!!!
      category: "",
      name: "",
      duration_in_minutes: "",
      calories_burned: ""
    });
  };

  render() {
    return(
      <div className="dashboard-container">
        <div className="row">
          <div className="col-lg info-container">
            <div className="form">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="category">Category: </label>
                  <select className="form-control" name="category" id="category" defaultValue="DEFAULT" onChange={this.handleOnChange}>
                    <option value="DEFAULT" disabled hidden>Select</option>
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

                <br />

                <input type="submit" className="btn btn-primary-fill" value="Add Exercise" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default ExerciseInput;
