import React, { Component } from 'react';
import './App.css';
// can move BrowserRouter to index.js and wrap App instead of using here
// import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Route, Redirect, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import { getCurrentUser } from './actions/currentUser'
import NavBar from './components/NavBar'
import MainContainer from './containers/MainContainer'
import Login from './components/Login'
// import Logout from './components/Logout'
import SignUp from './components/SignUp'
import Home from './components/Home'
import Diaries from './components/Diaries'


import ExercisesContainer from './containers/ExercisesContainer'
// import Exercises from './components/Exercises'
// import NewExerciseForm from './components/NewExerciseForm'
// import UpdateExercise from './components/UpdateExercise'

// Add Switch and wrap routes?

// you want your routes in the component that has access to the store - need to set up the routes in a component that an send the props through the route to the rendered component

class App extends Component {

  // when app mounts, I want to get my currentUser
  componentDidMount() {
    console.log(this.props)
    this.props.getCurrentUser()
  }

  render() {
    const { loggedIn } = this.props

    return (
        <div className="App">


          <NavBar />
          <Switch>
            <Route exact path="/" render={ () => loggedIn ? <div> <MainContainer /> <Diaries /> </div> : <Home /> }  />

            {/* below routes should only be available to users who are NOT logged in */}
            <Route exact path="/login" render={ (props) => loggedIn ? <Redirect to="/" /> : <Login history={props.history}/> } />
            <Route exact path="/signup" render={ (props) => loggedIn ? <Redirect to="/" /> : <SignUp history={props.history}/> } />

            {/* below routes should only be available to users who are logged in - they are working correctly, but i'm not sure how I set that up...*/}
            <Route path="/exercises" render={routerProps => loggedIn ? <ExercisesContainer {...routerProps} /> : <Redirect to="/" />} />



            {/*    WILL NEED THE BELOW IF I MOVE ALL ROUTES TO APP.JS
            <Route exact path="/login" render={ (props) => loggedIn ? <Exercises /> : <Login history={props.history}/> } />
            <Route exact path="/signup" render={ (props) => loggedIn ? <Exercises /> : <SignUp history={props.history}/> } />
            <Route exact path="/" render={ () => loggedIn ? <div> <Exercises /> <Diaries /> <Logout /> </div> : <Home /> } />

            <Route exact path="/exercises" component={Exercises} />
            <Route exact path="/exercises/new" component={NewExerciseForm} />
            <Route exact path="/exercises/:exerciseId" render={routerProps => <UpdateExercise {...routerProps} />} />

            { loggedIn ? <Logout /> : <Redirect to="/" /> }

            I DON'T THINK I NEED THIS AT ALL
            <Route exact path="/logout" component={Logout} />
            */}

            <Route />
          </Switch>
        </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: !!state.currentUser
  }
}

export default connect(mapStateToProps, { getCurrentUser })(App);
