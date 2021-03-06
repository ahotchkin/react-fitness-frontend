import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { login } from '../actions/currentUser';

class Login extends Component {
  state = {
    username: "",
    password: "",
    submitted: false,
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

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.login(this.state, this.props.history);
  };

  render() {
    return (
      <div>
        <h1 className="header">Log In</h1>
        <br />
        <div className="form user-form">
          <form onSubmit={this.handleOnSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                className={`form-control ${!!this.state.submitted && this.state.username === "" ? "is-invalid" : null}`}
                name="username"
                id="username"
                value={this.state.username}
                onChange={this.handleOnChange}
              />
              <div className="invalid-feedback">
                Username required
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                className={`form-control ${!!this.state.submitted && this.state.password === "" ? "is-invalid" : null}`}
                name="password"
                id="password"
                value={this.state.password}
                onChange={this.handleOnChange}
              />
              <div className="invalid-feedback">
                Password required
              </div>
            </div>
            <br />
            <input type="submit" className="btn btn-primary-fill" value="Log In" onClick={this.handleOnClick} />
          </form>

        </div>
        <div className="note">
          <p>Not a member? Sign up <Link to="/signup">here</Link>.</p>
        </div>
      </div>
    );
  };
};

export default connect(null, { login })(Login);
