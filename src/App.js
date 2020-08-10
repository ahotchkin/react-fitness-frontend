import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import { connect } from 'react-redux'
import { getCurrentUser } from './actions/currentUser'

class App extends Component {

  componentDidMount() {
    this.props.getCurrentUser()
  }

  render() {
    return (
      <div className="App">
        App
        <Login />
      </div>
    );
  }
}

export default connect(null, { getCurrentUser })(App);
