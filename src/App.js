import React, { Component } from 'react';
import './App.css';
// can move BrowserRouter to index.js and wrap App instead of using here
// import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Route, Redirect, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import { getCurrentUser } from './actions/currentUser'
// import NavBar from './components/NavBar'
import MainContainer from './containers/MainContainer'
import Login from './components/Login'
// import Logout from './components/Logout'
import SignUp from './components/SignUp'
import Home from './components/Home'

import DiariesContainer from './containers/DiariesContainer';
import ExercisesContainer from './containers/ExercisesContainer';
import FoodsContainer from './containers/FoodsContainer';
import MealFoodsContainer from './containers/MealFoodsContainer';

import NavBar from './components/NavBar'

// Add Switch and wrap routes?

// you want your routes in the component that has access to the store - need to set up the routes in a component that an send the props through the route to the rendered component

class App extends Component {

  // when app mounts, I want to get my currentUser
  componentDidMount() {
    this.props.getCurrentUser()
  }

  render() {
    const { loggedIn } = this.props
    console.log(this.props)
    return (
        <div className="App">

          {/* Have to render NavBar here for it to appear on all pages. If rendered in MainContainer it only appears at "/" */}
          { loggedIn ? <NavBar /> : null }
          {/* is there a way to always redirect to "/" if not logged in? except for /login and /signup */}

          <Switch>
            <Route exact path="/" render={ () => loggedIn ? <MainContainer /> : <Home /> }  />

            {/* below routes should only be available to users who are NOT logged in */}
            <Route exact path="/login" render={ (props) => loggedIn ? <Redirect to="/" /> : <Login history={props.history}/> } />
            <Route exact path="/signup" render={ (props) => loggedIn ? <Redirect to="/" /> : <SignUp history={props.history}/> } />

            {/* below routes should only be available to users who are logged in - they are working correctly, but i'm not sure how I set that up...*/}
            <Route path="/diaries" render={ routerProps => loggedIn ? <DiariesContainer {...routerProps} /> : <Home /> } />

            <Route path="/exercises" render={ routerProps => loggedIn ? <ExercisesContainer {...routerProps} /> : <Home /> } />

            <Route path="/foods" render={ routerProps => loggedIn ? <FoodsContainer {...routerProps} /> : <Home />} />
            <Route path="/meals/:mealId/foods" render={ routerProps => loggedIn ? <FoodsContainer {...routerProps} /> : <Home /> } />

            <Route path="/meal_foods" render={ routerProps => loggedIn ? <MealFoodsContainer {...routerProps} /> : <Home /> } />

            {/* Added path so Logout link in NavBar isn't highlighted as active when at "/" */}
            <Route exact path="/logout" render={ () => <Redirect to="/" /> } />

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
