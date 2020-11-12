import React, { Component } from 'react';

class ExerciseInput extends Component {

  state = {
    category: "",
    name: "",
    duration_in_minutes: "",
    calories_burned: "",
    submitted: false
  };

  handleOnChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleOnClick = event => {
    this.setState({
      submitted: true,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.createExercise(this.state, this.props.date, this.props.currentUser, this.props.history);
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
                  <select className={`form-control ${!!this.state.submitted && this.state.category === "" ? "is-invalid" : null}`} name="category" id="category" defaultValue="DEFAULT" onChange={this.handleOnChange}>
                    <option value="DEFAULT" disabled hidden>Select</option>
                    <option value="cardio">Cardio</option>
                    <option value="strength">Strength Training</option>
                    <option value="balance">Balance</option>
                    <option value="stretching">Stretching</option>
                  </select>
                  <div className="invalid-feedback">
                    Category required
                  </div>
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
                    placeholder="e.g. Morning Walk"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="duration_in_minutes">Minutes Performed: </label>
                    <input
                      type="number"
                      className={`form-control ${!!this.state.submitted && this.state.duration_in_minutes === "" ? "is-invalid" : null}`}
                      name="duration_in_minutes"
                      id="duration_in_minutes"
                      onChange={this.handleOnChange}
                      value={this.state.duration_in_minutes}
                    />
                    <div className="invalid-feedback">
                      Minutes Performed required
                    </div>
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="calories_burned">Calories Burned: </label>
                    <input
                      type="number"
                      className={`form-control ${!!this.state.submitted && this.state.calories_burned === "" ? "is-invalid" : null}`}
                      name="calories_burned"
                      id="calories_burned"
                      onChange={this.handleOnChange}
                      value={this.state.calories_burned}
                    />
                    <div className="invalid-feedback">
                      Calories Burned required
                    </div>
                  </div>
                </div>

                <br />

                <input type="submit" className="btn btn-primary-fill" value="Add Exercise" onClick={this.handleOnClick} />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default ExerciseInput;
