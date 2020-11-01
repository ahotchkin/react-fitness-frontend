import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { login } from '../actions/currentUser';

class Login extends Component {
  state = {
    username: "",
    password: "",
    submitted: false,
  }

  handleOnChange = event => {
    // what does this do??
    event.persist()

    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleOnClick = event => {
    this.setState({
      submitted: true,
    })
  }

  handleOnSubmit = event => {
    event.preventDefault()

    this.props.login(this.state, this.props.history)
  }

  render() {
    return (
      <div>
        <h1 className="header">Log In</h1>
        <div className="form">
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
    )
  }
}
// Written in Redux - change to React? Make sure I understand what's going on here...
// ******************************
// const Login = ({ loginFormData, updateLoginForm, login, history }) => {
//
//   const handleInputChange = event => {
//     const { name, value } = event.target
//     const updatedFormInfo = {
//       ...loginFormData,
//       [name]: value
//     }
//     updateLoginForm(updatedFormInfo)
//   }
//
//   const handleSubmit = event => {
//     event.preventDefault();
//     login(loginFormData, history)
//   }
//
//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         placeholder="Username"
//         value={loginFormData.username}
//         name="username"
//         type="text"
//         onChange={handleInputChange}
//       />
//       <input
//         placeholder="Password"
//         value={loginFormData.password}
//         name="password"
//         type="text"
//         onChange={handleInputChange}
//       />
//       <input type="submit" value="Log In" />
//     </form>
//   )
// }
//
// const mapStateToProps = state => {
//   return {
//     loginFormData: state.loginForm
//   }
// }
//
// const mapDispatchToProps = dispatch => {
//   return {
//     updateLoginForm: formData => dispatch({type: "UPDATE_LOGIN_FORM", formData})
//   }
// }

// export default connect(mapStateToProps, { updateLoginForm, login })(Login);

export default connect(null, { login })(Login);
