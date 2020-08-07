import React from 'react';
import { connect } from 'react-redux';

const Login = ({username, password}) => {
  return (
    <form onSubmit={undefined}>
      <input
        placeholder="Username"
        value={username}
        name="username"
        type="text"
        onChange={undefined}
      />
      <input
        placeholder="Password"
        value={password}
        name="password"
        type="text"
        onChange={undefined}
      />
    </form>
  )
}

const mapStateToProps = state => {
  return {
    username: state.loginForm.username,
    password: state.loginForm.password
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
