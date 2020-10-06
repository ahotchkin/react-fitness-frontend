import React, { Component } from 'react';
// can move BrowserRouter to index.js and wrap App instead of using here
// import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Route, Redirect, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import { getCurrentUser } from '../actions/currentUser'
// import NavBar from './components/NavBar'
import Dashboard from '../components/Dashboard'
import Login from '../components/Login'
// import Logout from './components/Logout'
import SignUp from '../components/SignUp'
import Home from '../components/Home'

import DiariesContainer from './DiariesContainer';
import ExercisesContainer from './ExercisesContainer';
import FoodsContainer from './FoodsContainer';
import MealFoodsContainer from './MealFoodsContainer';

import NavBar from '../components/NavBar'

// Add Switch and wrap routes?

// you want your routes in the component that has access to the store - need to set up the routes in a component that an send the props through the route to the rendered component

class MainContainer extends Component {

  // when app mounts, I want to get my currentUser
  componentDidMount() {
    this.props.getCurrentUser()
    console.log(this.props)
  }

  getDate = date => {
    const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
    const localDate = (new Date(date - tzoffset)).toISOString().split("T")[0];
    return localDate
  }

  // can I get this to work with whatever date is selected on datePicker in /diaries and /exercises???
  caloriesConsumed = () => {
    console.log(this.props)
    let data = {}

    const todaysDiary = this.props.diaries.find(diary => diary.attributes.date === this.getDate(new Date()))
    // Need to get meals from Redux Store rather than from diary.attributes or else /diaries will not refresh if mealFood is deleted
    if (!!todaysDiary) {
      const todaysMeals = this.props.meals.filter(meal => meal.relationships.diary.data.id === todaysDiary.id).map(filteredMeal => filteredMeal.attributes)
      console.log(todaysMeals)

      if (todaysMeals.length > 0) {
        data = todaysMeals.reduce((a, b) => ({calories: a.calories + b.calories}))

      }
    }
    console.log(data.calories)
    return data.calories


    // let data = {}
    // const todaysDiary = this.props.diaries.find(diary => diary.attributes.date === this.getDate())
    // console.log(todaysDiary)
    //
    // if (!!todaysDiary) {
    //   const todaysMeals = todaysDiary.attributes.meals
    //   console.log(todaysMeals)
    //   data = todaysMeals.reduce((a, b) => ({calories: a.calories + b.calories}))
    // }
    // return data.calories
  }

  // can I get this to work with whatever date is selected on datePicker in /diaries and /exercises???
  caloriesBurned = () => {
    let data = {}

    if (!!this.props.exercises) {
      // filtering out today's Exercises and getting just the attributes so reduce function will work properly with more than two elements
      // ************************* NEED TO UPDATE THIS SO IF USER IS IN MEAL DIARY OR EXERCISES AND SELECTS A DIFFERENT DAY THE CORRECT TOTAL SHOWS UP *********************************
      const todaysExercises = this.props.exercises.filter(exercise => exercise.attributes.date === this.getDate(new Date())).map(filteredExercise => filteredExercise.attributes)

      if (todaysExercises.length === 1) {
        data = {calories_burned: todaysExercises[0].calories_burned}
      } else if (todaysExercises.length > 1) {
        data = todaysExercises.reduce((a, b) => ({calories_burned: a.calories_burned + b.calories_burned}))
      } else {
      data = {calories_burned: 0}
      }
    }

    return data.calories_burned
  }

  breakfastNutrition = () => {
    console.log(this.props)
    let breakfast = {}

    const todaysDiary = this.props.diaries.find(diary => diary.attributes.date === this.getDate(new Date()))
    // Need to get meals from Redux Store rather than from diary.attributes or else /diaries will not refresh if mealFood is deleted
    if (!!todaysDiary) {
      const todaysMeals = this.props.meals.filter(meal => meal.relationships.diary.data.id === todaysDiary.id).map(filteredMeal => filteredMeal.attributes)
      console.log(todaysMeals)

      if (todaysMeals.length > 0) {
        breakfast = todaysMeals.find(meal => meal.category.toLowerCase() === "breakfast")

      }
      // if (todaysMeals.length > 0) {
      //   data = todaysMeals.reduce((a, b) => ({calories: a.calories + b.calories}))

      // }
    }
    console.log(breakfast)
    return breakfast

  }




  render() {
    const { loggedIn } = this.props
    console.log(this.props)
    return (
      // Update className when adding css
      <div className="App">

        {/* Have to render NavBar here for it to appear on all pages. If rendered in MainContainer it only appears at "/" */}
        { loggedIn ? <NavBar /> : null }
        {/* is there a way to always redirect to "/" if not logged in? except for /login and /signup */}

        <Switch>
          <Route exact path="/" render={ () => loggedIn ? <Dashboard caloriesConsumed={this.caloriesConsumed()} caloriesBurned={this.caloriesBurned()} breakfastNutrition={this.breakfastNutrition()} /> : <Home /> }  />

          {/* below routes should only be available to users who are NOT logged in */}
          <Route exact path="/login" render={ props => loggedIn ? <Redirect to="/" /> : <Login history={props.history}/> } />
          <Route exact path="/signup" render={ props => loggedIn ? <Redirect to="/" /> : <SignUp history={props.history}/> } />

          {/* below routes should only be available to users who are logged in - they are working correctly, but i'm not sure how I set that up...*/}

          <Route path="/diaries" render={ routerProps => loggedIn ? <DiariesContainer {...routerProps} /> : <Home /> } />

          <Route path="/exercises" render={ routerProps => loggedIn ? <ExercisesContainer {...routerProps} /> : <Home /> } />

          {/* TO BE USED IF I CAN GET CALORIESBURNED() TO WORK FOR ALL COMPONENTS IN MAIN CONTAINER
          <Route path="/diaries" render={ routerProps => loggedIn ? <DiariesContainer caloriesBurned={this.caloriesBurned()} {...routerProps} /> : <Home /> } />

          <Route path="/exercises" render={ routerProps => loggedIn ? <ExercisesContainer caloriesBurned={this.caloriesBurned()} {...routerProps} /> : <Home /> } />
          */}

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
    loggedIn: !!state.currentUser,
    exercises: state.exercises,
    diaries: state.diaries,
    meals: state.meals
  }
}

const mapDispatchToProps = {
  getCurrentUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
