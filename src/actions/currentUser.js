// Because of information that shows on dashboard, these actions need to be dispatched in signUp, login, and getCurrentUser - does this mean they can be removed from their respective containers because information will already be in the store???
import { getExercises } from './exercises';
import { getDiaries } from './diaries';
import { getMeals } from './meals';
import { getFoods } from './foods';
// import { getMealFoods } from './mealFoods';

import { clearExercises } from './exercises';
import { clearDiaries } from './diaries';
import { clearMeals } from './meals';
import { clearMealFoods } from './mealFoods';

// synchronous action creators
export const setCurrentUser = user => {
  return {
    type: "SET_CURRENT_USER",
    user
    // or payload: user
  }
}

// get rid of the currentUser that is sitting in Redux store
export const clearCurrentUser = () => {
  return {
    type: "CLEAR_CURRENT_USER"
  }
}


// aysnchronous action creators
// pass in history prop
export const login = (credentials, history) => {
  return dispatch => {
    // can abstract fetch requests into an adapter class and do something like - return Adapter.login(args) or Api.login(args)
    return fetch("http://localhost:3001/api/v1/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          alert(json.error)
        } else {
          dispatch(setCurrentUser(json.data))
          dispatch(getExercises())
          dispatch(getDiaries())
          dispatch(getMeals())
          dispatch(getFoods())
          // dispatch(getMealFoods())

          // tells your app which path to go to once logged in
          history.push("/")
        }
      })
      .catch(console.log())
  }
}

export const signUp = (credentials, dailyCalorieGoal, dailyNutrientGoals, history) => {
  console.log("credentials are", credentials)
  const userInfo = {
    user: credentials
  }
  userInfo.user.daily_calorie_goal = dailyCalorieGoal
  userInfo.user.daily_fat_goal = dailyNutrientGoals.fat
  userInfo.user.daily_saturated_fat_goal = dailyNutrientGoals.saturatedFat
  userInfo.user.daily_polyunsaturated_fat_goal = dailyNutrientGoals.polyunsaturatedFat
  userInfo.user.daily_monounsaturated_fat_goal = dailyNutrientGoals.monounsaturatedFat
  userInfo.user.daily_carbohydrate_goal = dailyNutrientGoals.carbohydrate
  userInfo.user.daily_sugar_goal = dailyNutrientGoals.sugar
  userInfo.user.daily_protein_goal = dailyNutrientGoals.protein
  userInfo.user.daily_vitamin_a_goal = dailyNutrientGoals.vitaminA
  userInfo.user.daily_vitamin_c_goal = dailyNutrientGoals.vitaminC
  userInfo.user.daily_vitamin_d_goal = dailyNutrientGoals.vitaminD
  userInfo.user.daily_calcium_goal = dailyNutrientGoals.calcium
  userInfo.user.daily_iron_goal = dailyNutrientGoals.iron

  return dispatch => {
    // can abstract fetch requests into an adapter class and do something like - return Adapter.login(args) or Api.login(args)
    return fetch("http://localhost:3001/api/v1/signup", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          if (json.error.includes("has already been taken")) {
            alert("Username has already been taken")
            console.log(json.error)
          } else {
            console.log(json.error)
          }
        } else {
          console.log(json.data)
          dispatch(setCurrentUser(json.data))
          dispatch(getExercises())
          dispatch(getDiaries())
          dispatch(getMeals())
          dispatch(getFoods())
          // dispatch(getMealFoods())

          history.push("/")
        }
      })
      .catch(console.log())
  }
}

export const getCurrentUser = () => {
  return dispatch => {
    // can abstract fetch requests into an adapter class and do something like - return Adapter.login(args) or Api.login(args)
    return fetch("http://localhost:3001/api/v1/get_current_user", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      // .then(user => dispatch({type: "SET_CURRENT_USER"}))
      .then(json => {
        if (json.error) {
          console.log(json.error)
        } else {
          dispatch(setCurrentUser(json.data))
          dispatch(getExercises())
          dispatch(getDiaries())
          dispatch(getMeals())
          // DO I NEED TO GET THIS HERE OR CAN I WAIT UNTIL USER IS IN FOODSCONTAINER?
          dispatch(getFoods())
        }
      })
      .catch(console.log())
  }
}

// this takes care of clearing the session, also need to clear out the user in the store with clearCurrentUser
export const logout = () => {
  return dispatch => {
    // don't need to wait until fetch request resolves to log out a user, when a user clicks logout they should logout right away. call clearCurrentUser immediately
    // optimistic => make the change to the frontend right away, don't wait for the backend
    // pessimistic => hold on, make sure the server is running, the response we said works and the backend is all set before changing anything on the frontend and displaying anything to the user
    dispatch(clearCurrentUser())
    dispatch(clearExercises())
    dispatch(clearDiaries())
    dispatch(clearMeals())
    dispatch(clearMealFoods())
    return fetch("http://localhost:3001/api/v1/logout", {
      credentials: "include",
      method: "DELETE"
    })

  }
}
