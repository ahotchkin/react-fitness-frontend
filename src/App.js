import React, { Component } from 'react';
import './App.css';
// can move BrowserRouter to index.js and wrap App instead of using here
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentUser } from './actions/currentUser'
import NavBar from './components/NavBar'
import MainContainer from './components/MainContainer'
import Login from './components/Login'
import Logout from './components/Logout'
import SignUp from './components/SignUp'
import Exercises from './components/Exercises'

class App extends Component {

  // when app mounts, I want to get my currentUser
  componentDidMount() {
    this.props.getCurrentUser()
  }

  render() {
    return (
      <Router>
        <div className="App">


          <NavBar />
          <MainContainer />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/exercises" component={Exercises} />
          <Logout />
          <Route />
          <Route />
        </div>
      </Router>

    );
  }
}

export default connect(null, { getCurrentUser })(App);
