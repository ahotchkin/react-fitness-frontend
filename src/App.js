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
import Home from './components/Home'

// Add Switch and wrap routes?

class App extends Component {

  // when app mounts, I want to get my currentUser
  componentDidMount() {
    this.props.getCurrentUser()
  }

  render() {
    const { loggedIn } = this.props
    return (
      <Router>
        <div className="App">


          <NavBar />
          <MainContainer />
          { loggedIn ? <Logout /> : null }
          <Route exact path="/" render={ () => loggedIn ? <Exercises /> : <Home /> } />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/exercises" component={Exercises} />
          <Route />
          <Route />
        </div>
      </Router>

    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: !!state.currentUser
  }
}

export default connect(mapStateToProps, { getCurrentUser })(App);
