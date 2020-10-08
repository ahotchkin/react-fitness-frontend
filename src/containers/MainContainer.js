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
    // console.log(this.props)
    let data = {}

    const todaysDiary = this.props.diaries.find(diary => diary.attributes.date === this.getDate(new Date()))
    // Need to get meals from Redux Store rather than from diary.attributes or else /diaries will not refresh if mealFood is deleted
    if (!!todaysDiary) {
      const todaysMeals = this.props.meals.filter(meal => meal.relationships.diary.data.id === todaysDiary.id).map(filteredMeal => filteredMeal.attributes)
      console.log(todaysMeals)

      if (todaysMeals.length > 0) {
        data = todaysMeals.reduce((a, b) => ({calories: a.calories + b.calories}))
      }
    } else {
      data = {calories: 0}
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

    return data.calories_burned
  }


  mealNutrition = selectedMeal => {
    // console.log(this.props)
    let meal = {}

    const todaysDiary = this.props.diaries.find(diary => diary.attributes.date === this.getDate(new Date()))
    // Need to get meals from Redux Store rather than from diary.attributes or else /diaries will not refresh if mealFood is deleted
    if (!!todaysDiary) {
      const todaysMeals = this.props.meals.filter(meal => meal.relationships.diary.data.id === todaysDiary.id).map(filteredMeal => filteredMeal.attributes)
      console.log(todaysMeals)

      if (todaysMeals.length > 0) {
        meal = todaysMeals.find(meal => meal.category.toLowerCase() === selectedMeal)

      }
      // if (todaysMeals.length > 0) {
      //   data = todaysMeals.reduce((a, b) => ({calories: a.calories + b.calories}))

      // }
    } else {
      meal = {calories: 0}
    }
    console.log(meal)
    return meal

  }

  dailyNutrition = () => {
    // 1. get all meals for the day
    // 2. iterate through all meals to get all mealFoods for the day
    // 3. iterate through all mealFoods to add up the total for each nutrient for the day

    // let todaysMeals = []
    // let todaysMealFoods = []
    //
    // // 1. get all meals for the day
    // const todaysDiary = this.props.diaries.find(diary => diary.attributes.date === this.getDate(new Date()))
    //
    // if (!!todaysDiary) {
    //   todaysMeals = this.props.meals.filter(meal => meal.relationships.diary.data.id === todaysDiary.id).map(filteredMeal => filteredMeal.attributes)
    //   console.log(todaysMeals)
    //
    //   // 2. iterate through all meals to get all mealFoods for the day
    //   if (todaysMeals.length > 0) {
    //     todaysMeals.forEach(meal => {
    //       todaysMealFoods.push(meal.meal_foods)
    //     })
    //   }
    //   console.log(todaysMealFoods.flat())
    //
    //   // 3. iterate through all mealFoods to add up the total for each nutrient for the day
    //
    // }

    // ************************************************************************
    // Currently saving all nutrient amounts to mealFood in database and using serializer to get info. Another option is to use the number_of_servings and the foods attribute and multiply every mealFood.attributes.food.nutrient * attributes.number_of_servings, and NOT save this info in the database

    // 1. create array of objects of mealFoodAttributes where each element is mealFood.attributes for one mealFood
    // 2. use reduce to combine objects in mealFoodAttributes and total values, while ignoring keys of number_of_servings, meal, and food

    let todaysNutrients = []
    let mealFoodNutrients = []
    let mealFoodAttributes = []

    // 1. create array of objects of mealFoodAttributes where each element is mealFood.attributes for one mealFood
    if (this.props.mealFoods.length > 0) {
      this.props.mealFoods.forEach(mealFood => {
        mealFoodAttributes.push(mealFood.attributes)
      })
      console.log(mealFoodAttributes)

      // 2. use reduce to combine objects in mealFoodAttributes and total values, while ignoring keys of number_of_servings, meal, and food
      const total = mealFoodAttributes.reduce((a, b) => {
        for (let k in b) {
          if (b.hasOwnProperty(k) && k !== "number_of_servings" && k !== "meal" && k !== "food")
            a[k] = (a[k] || 0) + b[k];
        }
        return a;
      }, {});

      console.log(total)
    }
  }





  render() {
    // const { loggedIn } = this.props
    console.log(this.props)
    console.log(this.props.mealFoods)

    return (
      // Update className when adding css
      <div className="App">
        {this.dailyNutrition()}
        {/* Have to render NavBar here for it to appear on all pages. If rendered in MainContainer it only appears at "/" */}
        { this.props.loggedIn ? <NavBar /> : null }
        {/* is there a way to always redirect to "/" if not logged in? except for /login and /signup */}

        <Switch>
          <Route exact path="/" render={ () => this.props.loggedIn ? <Dashboard caloriesConsumed={this.caloriesConsumed()} caloriesBurned={this.caloriesBurned()} breakfastNutrition={this.mealNutrition("breakfast")} lunchNutrition={this.mealNutrition("lunch")} dinnerNutrition={this.mealNutrition("dinner")} snacksNutrition={this.mealNutrition("snacks")} dailyNutrition={this.dailyNutrition()} /> : <Home /> }  />

          {/* below routes should only be available to users who are NOT logged in */}
          <Route exact path="/login" render={ props => this.props.loggedIn ? <Redirect to="/" /> : <Login history={props.history}/> } />
          <Route exact path="/signup" render={ props => this.props.loggedIn ? <Redirect to="/" /> : <SignUp history={props.history}/> } />

          {/* below routes should only be available to users who are logged in - they are working correctly, but i'm not sure how I set that up...*/}

          <Route path="/diaries" render={ routerProps => this.props.loggedIn ? <DiariesContainer {...routerProps} /> : <Home /> } />

          <Route path="/exercises" render={ routerProps => this.props.loggedIn ? <ExercisesContainer {...routerProps} /> : <Home /> } />

          {/* TO BE USED IF I CAN GET CALORIESBURNED() TO WORK FOR ALL COMPONENTS IN MAIN CONTAINER
          <Route path="/diaries" render={ routerProps => loggedIn ? <DiariesContainer caloriesBurned={this.caloriesBurned()} {...routerProps} /> : <Home /> } />

          <Route path="/exercises" render={ routerProps => loggedIn ? <ExercisesContainer caloriesBurned={this.caloriesBurned()} {...routerProps} /> : <Home /> } />
          */}

          <Route path="/foods" render={ routerProps => this.props.loggedIn ? <FoodsContainer {...routerProps} /> : <Home />} />
          <Route path="/meals/:mealId/foods" render={ routerProps => this.props.loggedIn ? <FoodsContainer {...routerProps} /> : <Home /> } />

          <Route path="/meal_foods" render={ routerProps => this.props.loggedIn ? <MealFoodsContainer {...routerProps} /> : <Home /> } />

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
    meals: state.meals,
    mealFoods: state.mealFoods
  }
}

const mapDispatchToProps = {
  getCurrentUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
