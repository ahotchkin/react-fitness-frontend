import React, { Component } from 'react';
import './App.css';
// can move BrowserRouter to index.js and wrap App instead of using here
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentUser } from './actions/currentUser'
import NavBar from './components/NavBar'
import MainContainer from './components/MainContainer'
import Login from './components/Login'
import Logout from './components/Logout'
import SignUp from './components/SignUp'
import Exercises from './components/Exercises'
import Home from './components/Home'
import NewExerciseForm from './components/NewExerciseForm'
import Diaries from './components/Diaries'

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

          <Route exact path="/login" render={ (props) => loggedIn ? <Exercises /> : <Login history={props.history}/> } />
          <Route exact path="/signup" render={ (props) => loggedIn ? <Exercises /> : <SignUp history={props.history}/> } />



          <Route exact path="/" render={ () => loggedIn ? <Exercises /> : <Home /> } />

          {/* below routes should only be available to users who are NOT logged in */}


          {/* below routes should only be available to users who are logged in - they are working correctly, but i'm not sure how I set that up...*/}
          <Route exact path="/exercises" component={Exercises} />
          <Route exact path="/exercises/new" component={NewExerciseForm} />
          { loggedIn ? <Diaries /> : null }

          {/* is this doing anything???? */}
          <Route exact path="/logout" component={Logout} />

          { loggedIn ? <Logout /> : <Redirect to="/" /> }



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
