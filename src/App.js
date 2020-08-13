import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { getCurrentUser } from './actions/currentUser'
// import Login from './components/Login'
// import Logout from './components/Logout'
import NavBar from './components/NavBar'
import MainContainer from './components/MainContainer'

class App extends Component {

  // when app mounts, I want to get my currentUser
  componentDidMount() {
    this.props.getCurrentUser()
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <MainContainer />
      </div>
    );
  }
}

export default connect(null, { getCurrentUser })(App);
