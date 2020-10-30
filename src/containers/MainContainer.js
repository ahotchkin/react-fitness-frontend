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

import NavBar from '../components/NavBar';

// ********************************************
import SearchByDate from '../components/SearchByDate';
// ********************************************

// Add Switch and wrap routes?

// you want your routes in the component that has access to the store - need to set up the routes in a component that an send the props through the route to the rendered component

class MainContainer extends Component {

  // ********* FROM EXERCISESCONTAINER
  state = {
    startDate: new Date()
    // startDate: ""
  };

  // ********* FROM DIARIESCONTAINER
  // state = {
  //   loaded: false,
  //   // startDate: new Date()
  //   startDate: ""
  // };
  // *********

  // when app mounts, I want to get my currentUser
  componentDidMount() {
    this.props.getCurrentUser()
  }

  // *********
  handleOnChange = date => {
    this.setState({
      startDate: date,
    });
  };
  // *********

  // COMMENTED OUT WHEN SEARCHBYDATE WAS ADDED TO THIS COMPONENT
  // getDate = date => {
  //   const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
  //   const localDate = (new Date(date - tzoffset)).toISOString().split("T")[0];
  //   return localDate
  // }

  // *********
  getDate = () => {
    const tzoffset = this.state.startDate.getTimezoneOffset() * 60000; //offset in milliseconds
    const date = (new Date(this.state.startDate - tzoffset)).toISOString().split("T")[0];
    return date
  }
  // *********

  // can I get this to work with whatever date is selected on datePicker in /diaries and /exercises???
  // don't really need this - can grab from dailyNutrition
  // caloriesConsumed = () => {
  //   // console.log(this.props)
  //   let data = {}
  //
  //   const todaysDiary = this.props.diaries.find(diary => diary.attributes.date === this.getDate(new Date()))
  //   // Need to get meals from Redux Store rather than from diary.attributes or else /diaries will not refresh if mealFood is deleted
  //   if (!!todaysDiary) {
  //     const todaysMeals = this.props.meals.filter(meal => meal.relationships.diary.data.id === todaysDiary.id).map(filteredMeal => filteredMeal.attributes)
  //     console.log(todaysMeals)
  //
  //     if (todaysMeals.length > 0) {
  //       data = todaysMeals.reduce((a, b) => ({calories: a.calories + b.calories}))
  //     }
  //   } else {
  //     data = {calories: 0}
  //   }
  //   console.log(data.calories)
  //   return data.calories
  //
  //
  //   // let data = {}
  //   // const todaysDiary = this.props.diaries.find(diary => diary.attributes.date === this.getDate())
  //   // console.log(todaysDiary)
  //   //
  //   // if (!!todaysDiary) {
  //   //   const todaysMeals = todaysDiary.attributes.meals
  //   //   console.log(todaysMeals)
  //   //   data = todaysMeals.reduce((a, b) => ({calories: a.calories + b.calories}))
  //   // }
  //   // return data.calories
  // }

  // can I get this to work with whatever date is selected on datePicker in /diaries and /exercises???


  // COMMENTED OUT WHEN SEARCHBYDATE WAS ADDED TO THIS COMPONENT
  // caloriesBurned = () => {
  //   let data = {}
  //
  //   // filtering out today's Exercises and getting just the attributes so reduce function will work properly with more than two elements
  //   // ************************* NEED TO UPDATE THIS SO IF USER IS IN MEAL DIARY OR EXERCISES AND SELECTS A DIFFERENT DAY THE CORRECT TOTAL SHOWS UP *********************************
  //   const todaysExercises = this.props.exercises.filter(exercise => exercise.attributes.date === this.getDate(new Date())).map(filteredExercise => filteredExercise.attributes)
  //
  //   if (todaysExercises.length === 1) {
  //     data = {calories_burned: todaysExercises[0].calories_burned}
  //   } else if (todaysExercises.length > 1) {
  //     data = todaysExercises.reduce((a, b) => ({calories_burned: a.calories_burned + b.calories_burned}))
  //   } else {
  //   data = {calories_burned: 0}
  //   }
  //
  //   return data.calories_burned
  // }
  //

  caloriesBurned = () => {
    let data = {}

    // filtering out today's Exercises and getting just the attributes so reduce function will work properly with more than two elements
    // ************************* NEED TO UPDATE THIS SO IF USER IS IN MEAL DIARY OR EXERCISES AND SELECTS A DIFFERENT DAY THE CORRECT TOTAL SHOWS UP *********************************
    const todaysExercises = this.props.exercises.filter(exercise => exercise.attributes.date === this.getDate()).map(filteredExercise => filteredExercise.attributes)

    if (todaysExercises.length === 1) {
      data = {calories_burned: todaysExercises[0].calories_burned}
    } else if (todaysExercises.length > 1) {
      data = todaysExercises.reduce((a, b) => ({calories_burned: a.calories_burned + b.calories_burned}))
    } else {
    data = {calories_burned: 0}
    }

    return data.calories_burned
  }


  // COMMENTED OUT WHEN SEARCHBYDATE WAS ADDED TO THIS COMPONENT
  // totalExerciseByCategory = category => {
  //   let exercisesInCategory = []
  //   let totalForCategory = {}
  //
  //   const todaysExercises = this.props.exercises.filter(exercise => exercise.attributes.date === this.getDate(new Date())).map(filteredExercise => filteredExercise.attributes)
  //
  //   if (todaysExercises.length > 0) {
  //     todaysExercises.forEach(function(exercise) {
  //       if (exercise.category === category) {
  //         exercisesInCategory.push(exercise)
  //       }
  //     })
  //   }
  //
  //   if (exercisesInCategory.length > 0) {
  //     totalForCategory = exercisesInCategory.reduce((a, b) => {
  //       for (let k in b) {
  //         if (b.hasOwnProperty(k) && k !== "category" && k !== "date" && k !== "name")
  //           a[k] = (a[k] || 0) + b[k];
  //       }
  //       return a;
  //       // by adding " , {}" to the end, it returns the new object with the 3 properties above removed. What is happening here?
  //     }, {});
  //   } else {
  //     totalForCategory = {
  //       calories_burned: 0,
  //       duration_in_minutes: 0
  //     }
  //   }
  //
  //   console.log(totalForCategory)
  //
  //   return totalForCategory
  // }
  //


  totalExerciseByCategory = category => {
    let exercisesInCategory = []
    let totalForCategory = {}

    const todaysExercises = this.props.exercises.filter(exercise => exercise.attributes.date === this.getDate()).map(filteredExercise => filteredExercise.attributes)

    if (todaysExercises.length > 0) {
      todaysExercises.forEach(function(exercise) {
        if (exercise.category === category) {
          exercisesInCategory.push(exercise)
        }
      })
    }

    if (exercisesInCategory.length > 0) {
      totalForCategory = exercisesInCategory.reduce((a, b) => {
        for (let k in b) {
          if (b.hasOwnProperty(k) && k !== "category" && k !== "date" && k !== "name")
            a[k] = (a[k] || 0) + b[k];
        }
        return a;
        // by adding " , {}" to the end, it returns the new object with the 3 properties above removed. What is happening here?
      }, {});
    } else {
      totalForCategory = {
        calories_burned: 0,
        duration_in_minutes: 0
      }
    }
    return totalForCategory
  }


  // COMMENTED OUT WHEN SEARCHBYDATE WAS ADDED TO THIS COMPONENT
  // mealNutrition = selectedMeal => {
  //   let mealMealFoods = []
  //
  //   let mealTotal = {
  //     added_sugars: 0,
  //     calcium: 0,
  //     calories: 0,
  //     cholesterol: 0,
  //     dietary_fiber: 0,
  //     iron: 0,
  //     monounsaturated_fat: 0,
  //     polyunsaturated_fat: 0,
  //     potassium: 0,
  //     protein: 0,
  //     saturated_fat: 0,
  //     sodium: 0,
  //     sugar_alcohols: 0,
  //     total_carbohydrate: 0,
  //     total_fat: 0,
  //     total_sugars: 0,
  //     trans_fat: 0,
  //     vitamin_a: 0,
  //     vitamin_c: 0,
  //     vitamin_d: 0
  //   }
  //
  //   const todaysDiary = this.props.diaries.find(diary => diary.attributes.date === this.getDate(new Date()))
  //   // Need to get meals from Redux Store rather than from diary.attributes or else /diaries will not refresh if mealFood is deleted
  //   if (!!todaysDiary) {
  //     const todaysMeals = this.props.meals.filter(meal => meal.relationships.diary.data.id === todaysDiary.id).map(filteredMeal => filteredMeal.attributes)
  //
  //     if (todaysMeals.length > 0) {
  //       mealMealFoods = todaysMeals.find(meal => meal.category.toLowerCase() === selectedMeal).meal_foods
  //     }
  //   }
  //
  //   console.log("mealfoods not flat: ", mealMealFoods)
  //   console.log("mealfoods flat: ", mealMealFoods.flat())
  //   if (mealMealFoods.flat().length > 0) {
  //     mealTotal = mealMealFoods.flat().reduce((a, b) => {
  //       for (let k in b) {
  //         if (b.hasOwnProperty(k) && k !== "id" && k !== "meal_id" && k !== "food_id" && k !== "number_of_servings" && k !== "created_at" && k !== "updated_at")
  //           a[k] = (a[k] || 0) + b[k];
  //       }
  //       return a;
  //       // by adding " , {}" to the end, it returns the new object with the 3 properties above removed. What is happening here?
  //     }, {});
  //   }
  //
  //   mealTotal.meal = selectedMeal
  //   return mealTotal
  // }


  mealNutrition = selectedMeal => {
    let mealMealFoods = []

    let mealTotal = {
      added_sugars: 0,
      calcium: 0,
      calories: 0,
      cholesterol: 0,
      dietary_fiber: 0,
      iron: 0,
      monounsaturated_fat: 0,
      polyunsaturated_fat: 0,
      potassium: 0,
      protein: 0,
      saturated_fat: 0,
      sodium: 0,
      sugar_alcohols: 0,
      total_carbohydrate: 0,
      total_fat: 0,
      total_sugars: 0,
      trans_fat: 0,
      vitamin_a: 0,
      vitamin_c: 0,
      vitamin_d: 0
    }

    const todaysDiary = this.props.diaries.find(diary => diary.attributes.date === this.getDate())
    // Need to get meals from Redux Store rather than from diary.attributes or else /diaries will not refresh if mealFood is deleted
    if (!!todaysDiary) {
      const todaysMeals = this.props.meals.filter(meal => meal.relationships.diary.data.id === todaysDiary.id).map(filteredMeal => filteredMeal.attributes)

      if (todaysMeals.length > 0) {
        mealMealFoods = todaysMeals.find(meal => meal.category.toLowerCase() === selectedMeal).meal_foods
      }
    }

    if (mealMealFoods.flat().length > 0) {
      mealTotal = mealMealFoods.flat().reduce((a, b) => {
        for (let k in b) {
          if (b.hasOwnProperty(k) && k !== "id" && k !== "meal_id" && k !== "food_id" && k !== "number_of_servings" && k !== "created_at" && k !== "updated_at")
            a[k] = (a[k] || 0) + b[k];
        }
        return a;
        // by adding " , {}" to the end, it returns the new object with the 3 properties above removed. What is happening here?
      }, {});
    }

    mealTotal.meal = selectedMeal
    return mealTotal
  }


  mealMacros = selectedMeal => {
    let macros = {"meal": selectedMeal, "carbohydrates": 0, "fat": 0, "protein": 0}

    if (!!this.mealNutrition(selectedMeal)) {
      const mealNutrition = this.mealNutrition(selectedMeal)

      const totalMealNutrition = mealNutrition.total_carbohydrate + mealNutrition.total_fat + mealNutrition.protein

      if (totalMealNutrition !== 0) {
        macros.carbohydrates = Math.round((mealNutrition.total_carbohydrate / totalMealNutrition) * 100)
        macros.fat = Math.round((mealNutrition.total_fat / totalMealNutrition) * 100)
        macros.protein = Math.round((mealNutrition.protein / totalMealNutrition) * 100)
      }

      return macros
    }


    // default all users' goals to carbohydrates: 50%, fat: 30%, protein: 20%
    // eventually add these attributes to user and allow user to set individual goals

    // To Calculate Macros by grams per day:
    // Carbs:
    // 4 calories per gram
    // 40% of 2,000 calories = 800 calories of carbs per day
    // Total grams of carbs allowed per day = 800/4 = 200 grams
    //
    // Fats:
    // 9 calories per gram
    // 30% of 2,000 calories = 600 calories of protein per day
    // Total grams of fat allowed per day = 600/9 = 67 grams
    //
    // Proteins:
    // 4 calories per gram
    // 30% of 2,000 calories = 600 calories of protein per day
    // Total grams of protein allowed per day = 600/4 = 150 grams  }
  }


  // COMMENTED OUT WHEN SEARCHBYDATE WAS ADDED TO THIS COMPONENT
  // dailyNutrition = () => {
  //   // Currently saving all nutrient amounts to mealFood in database and using serializer to get info. Another option is to use the number_of_servings and the foods attribute and multiply every mealFood.attributes.food.nutrient * attributes.number_of_servings, and NOT save this info in the database
  //
  //   // 1. get all mealFoods for the day
  //   // 2. create array of objects of mealFoodAttributes where each element is mealFood.attributes for one mealFood
  //   // 3. use reduce to combine objects in mealFoodAttributes and total values, while ignoring keys of number_of_servings, meal, and food
  //
  //   let todaysMeals = []
  //   let todaysMealFoods = []
  //   let total = {
  //     added_sugars: 0,
  //     calcium: 0,
  //     calories: 0,
  //     cholesterol: 0,
  //     dietary_fiber: 0,
  //     iron: 0,
  //     monounsaturated_fat: 0,
  //     polyunsaturated_fat: 0,
  //     potassium: 0,
  //     protein: 0,
  //     saturated_fat: 0,
  //     sodium: 0,
  //     sugar_alcohols: 0,
  //     total_carbohydrate: 0,
  //     total_fat: 0,
  //     total_sugars: 0,
  //     trans_fat: 0,
  //     vitamin_a: 0,
  //     vitamin_c: 0,
  //     vitamin_d: 0
  //   }
  //   // 1. get all mealFoods for the day
  //     // get the diary for the day
  //     // get the meals for the day
  //     // get the mealFoods for each meal
  //   const todaysDiary = this.props.diaries.find(diary => diary.attributes.date === this.getDate(new Date()))
  //   if (!!todaysDiary) {
  //     todaysMeals = this.props.meals.filter(meal => meal.relationships.diary.data.id === todaysDiary.id).map(filteredMeal => filteredMeal.attributes)
  //
  //     // requires meal_foods to be an attribute of meal to work properly
  //     if (todaysMeals.length > 0) {
  //       todaysMeals.forEach(meal => {
  //         if (meal.calories > 0) {
  //           todaysMealFoods.push(meal.meal_foods)
  //         }
  //       })
  //     }
  //   }
  //
  //   // 2. create array of objects of mealFoodAttributes where each element is mealFood.attributes for one mealFood
  //   if (todaysMealFoods.flat().length > 0) {
  //     // 3. use reduce to combine objects in todaysMealFoods and total values, while ignoring keys of properties that aren't needed
  //     total = todaysMealFoods.flat().reduce((a, b) => {
  //       for (let k in b) {
  //         if (b.hasOwnProperty(k) && k !== "id" && k !== "meal_id" && k !== "food_id" && k !== "number_of_servings" && k !== "created_at" && k !== "updated_at")
  //           a[k] = (a[k] || 0) + b[k];
  //       }
  //       return a;
  //       // by adding " , {}" to the end, it returns the new object with the 3 properties above removed. What is happening here?
  //     }, {});
  //   }
  //   return total
  // }

  dailyNutrition = () => {
    // Currently saving all nutrient amounts to mealFood in database and using serializer to get info. Another option is to use the number_of_servings and the foods attribute and multiply every mealFood.attributes.food.nutrient * attributes.number_of_servings, and NOT save this info in the database

    // 1. get all mealFoods for the day
    // 2. create array of objects of mealFoodAttributes where each element is mealFood.attributes for one mealFood
    // 3. use reduce to combine objects in mealFoodAttributes and total values, while ignoring keys of number_of_servings, meal, and food

    let todaysMeals = []
    let todaysMealFoods = []
    let total = {
      added_sugars: 0,
      calcium: 0,
      calories: 0,
      cholesterol: 0,
      dietary_fiber: 0,
      iron: 0,
      monounsaturated_fat: 0,
      polyunsaturated_fat: 0,
      potassium: 0,
      protein: 0,
      saturated_fat: 0,
      sodium: 0,
      sugar_alcohols: 0,
      total_carbohydrate: 0,
      total_fat: 0,
      total_sugars: 0,
      trans_fat: 0,
      vitamin_a: 0,
      vitamin_c: 0,
      vitamin_d: 0
    }
    // 1. get all mealFoods for the day
      // get the diary for the day
      // get the meals for the day
      // get the mealFoods for each meal
    const todaysDiary = this.props.diaries.find(diary => diary.attributes.date === this.getDate())
    if (!!todaysDiary) {
      todaysMeals = this.props.meals.filter(meal => meal.relationships.diary.data.id === todaysDiary.id).map(filteredMeal => filteredMeal.attributes)

      // requires meal_foods to be an attribute of meal to work properly
      if (todaysMeals.length > 0) {
        todaysMeals.forEach(meal => {
          if (meal.calories > 0) {
            todaysMealFoods.push(meal.meal_foods)
          }
        })
      }
    }

    // 2. create array of objects of mealFoodAttributes where each element is mealFood.attributes for one mealFood
    if (todaysMealFoods.flat().length > 0) {
      // 3. use reduce to combine objects in todaysMealFoods and total values, while ignoring keys of properties that aren't needed
      total = todaysMealFoods.flat().reduce((a, b) => {
        for (let k in b) {
          if (b.hasOwnProperty(k) && k !== "id" && k !== "meal_id" && k !== "food_id" && k !== "number_of_servings" && k !== "created_at" && k !== "updated_at")
            a[k] = (a[k] || 0) + b[k];
        }
        return a;
        // by adding " , {}" to the end, it returns the new object with the 3 properties above removed. What is happening here?
      }, {});
    }
    return total
  }


  dailyMacros = () => {
    let macros = { "carbohydrates": 0, "fat": 0, "protein": 0}

    if (!!this.dailyNutrition()) {
      const dailyNutrition = this.dailyNutrition()

      const totalDailyNutrition = dailyNutrition.total_carbohydrate + dailyNutrition.total_fat + dailyNutrition.protein

      if (totalDailyNutrition !== 0) {
        macros.carbohydrates = Math.round((dailyNutrition.total_carbohydrate / totalDailyNutrition) * 100)
        macros.fat = Math.round((dailyNutrition.total_fat / totalDailyNutrition) * 100)
        macros.protein = Math.round((dailyNutrition.protein / totalDailyNutrition) * 100)
      }

      return macros
    }
    // default all users' goals to carbohydrates: 50%, fat: 30%, protein: 20%
    // eventually add these attributes to user and allow user to set individual goals

    // To Calculate Macros by grams per day:
    // Carbs:
    // 4 calories per gram
    // 40% of 2,000 calories = 800 calories of carbs per day
    // Total grams of carbs allowed per day = 800/4 = 200 grams
    //
    // Fats:
    // 9 calories per gram
    // 30% of 2,000 calories = 600 calories of protein per day
    // Total grams of fat allowed per day = 600/9 = 67 grams
    //
    // Proteins:
    // 4 calories per gram
    // 30% of 2,000 calories = 600 calories of protein per day
    // Total grams of protein allowed per day = 600/4 = 150 grams
  }

  render() {
    return (
      // Update className when adding css
      <div>
        {/* Have to render NavBar here for it to appear on all pages. If rendered in MainContainer it only appears at "/" */}
        { this.props.loggedIn ? <NavBar /> : null }

        {/* is there a way to always redirect to "/" if not logged in? except for /login and /signup */}

        <Switch>
          <Route exact path="/" render={ () => this.props.loggedIn ?
            <div>
              <SearchByDate header={"Your Daily Summary for:"} startDate={this.state.startDate} handleOnChange={this.handleOnChange} />
              <Dashboard currentUser={this.props.currentUser} caloriesBurned={this.caloriesBurned()} breakfastNutrition={this.mealNutrition("breakfast")} breakfastMacros={this.mealMacros("breakfast")} lunchNutrition={this.mealNutrition("lunch")} lunchMacros={this.mealMacros("lunch")} dinnerNutrition={this.mealNutrition("dinner")} dinnerMacros={this.mealMacros("dinner")} snacksNutrition={this.mealNutrition("snacks")} snacksMacros={this.mealMacros("snacks")} dailyNutrition={this.dailyNutrition()} dailyMacros={this.dailyMacros()} totalCardio={this.totalExerciseByCategory("cardio")} totalStrength={this.totalExerciseByCategory("strength")} totalBalance={this.totalExerciseByCategory("balance")} totalStretching={this.totalExerciseByCategory("stretching")} />
            </div>
          :
            <Home />
          }  />

          {/* below routes should only be available to users who are NOT logged in */}
          <Route exact path="/login" render={ props => this.props.loggedIn ? <Redirect to="/" /> : <Login history={props.history}/> } />
          <Route exact path="/signup" render={ props => this.props.loggedIn ? <Redirect to="/" /> : <SignUp history={props.history}/> } />

          {/* below routes should only be available to users who are logged in - they are working correctly, but i'm not sure how I set that up...*/}

          <Route path="/diaries" render={ routerProps => this.props.loggedIn ?
            <div>
              <SearchByDate header={"Meal Diary for: "} startDate={this.state.startDate} handleOnChange={this.handleOnChange} />
              <DiariesContainer date={this.getDate()} caloriesConsumed={this.dailyNutrition().calories} caloriesBurned={this.caloriesBurned()} {...routerProps} />
            </div>

          :
            <Home />
          } />

          <Route path="/exercises" render={ routerProps => {
            let header = ""

            if (this.props.loggedIn) {
              if (routerProps.location.pathname === "/exercises") {
                header = "Exercise Summary for: "
              } else if (routerProps.location.pathname === "/exercises/new") {
                header = "Add Exercise for: "
              } else if (routerProps.location.pathname.includes("/edit")) {
                header = "Update Exercise for: "
              }
              return (
                <div>
                  <SearchByDate header={header} startDate={this.state.startDate} handleOnChange={this.handleOnChange} />
                  <ExercisesContainer caloriesBurned={this.caloriesBurned()} date={this.getDate()} {...routerProps} />
                </div>
              )
            } else {
              return (
                <div>
                  <Home />
                </div>
              )
            }
          }} />

          {/* TO BE USED IF I CAN GET CALORIESBURNED() TO WORK FOR ALL COMPONENTS IN MAIN CONTAINER
          <Route path="/diaries" render={ routerProps => loggedIn ? <DiariesContainer caloriesBurned={this.caloriesBurned()} {...routerProps} /> : <Home /> } />

          <Route path="/exercises" render={ routerProps => loggedIn ? <ExercisesContainer caloriesBurned={this.caloriesBurned()} {...routerProps} /> : <Home /> } />
          */}

          <Route path="/foods" render={ routerProps => this.props.loggedIn ? <FoodsContainer currentUser={this.props.currentUser} {...routerProps} /> : <Home />} />
          <Route path="/meals/:mealId/foods" render={ routerProps => this.props.loggedIn ? <FoodsContainer currentUser={this.props.currentUser} {...routerProps} /> : <Home /> } />

          <Route path="/meal_foods" render={ routerProps => this.props.loggedIn ? <MealFoodsContainer currentUser={this.props.currentUser} {...routerProps} /> : <Home /> } />

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
    currentUser: state.currentUser,
    exercises: state.exercises,
    diaries: state.diaries,
    meals: state.meals,
    // mealFoods: state.mealFoods
  }
}

const mapDispatchToProps = {
  getCurrentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
