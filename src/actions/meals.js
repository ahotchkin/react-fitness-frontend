// synchronous actions
export const setMeals = meals => {
  return {
    type: "SET_MEALS",
    meals
  }
}

export const updateMealSuccess = meal => {
  return {
    type: "UPDATE_MEAL",
    meal
  }
}

// NEED TO CALL THIS ON LOGOUT
export const clearMeals = () => {
  return {
    type: "CLEAR_MEALS"
  }
}

// before you think about populating this piece of state with anything, get it into the store first to see the name and data type are correct
// steps: 1. Build reducer, 2. Add to store, 3. Build action creator

// asychronous actions
export const getMeals = () => {
  return dispatch => {
    return fetch("http://localhost:3001/api/v1/meals", {
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
          alert(json.error)
        } else {
          // console.log(json)
          dispatch(setMeals(json.data))
        }
      })
      .catch(console.log())

  }
}

// Updates meal.calories when a meallFood is added, updated, or deleted
export const updateMeal = (mealId, mealCalories, previousMealFoodCalories = 0, updatedMealFoodCalories = 0) => {
  const updatedMeal = {
    calories: mealCalories - previousMealFoodCalories + updatedMealFoodCalories,
  }

  return dispatch => {
    return fetch(`http://localhost:3001/api/v1/meals/${mealId}`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedMeal)
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          alert(json.error)
        } else {
          dispatch(updateMealSuccess(json.data))
          // what is the difference between push and pushState???
        }
      })
      .catch(console.log())
  }
}
// export const addMeal = (mealData, currentUser, history) => {
//   console.log("meal data is ", mealData)
//   const meal = {
//     // is there a cleaner way to do this???
//     user_id: currentUser.id,
//     name: mealData.name,
//     category: mealData.category,
//     duration_in_minutes: mealData.duration_in_minutes,
//     calories_burned: mealData.calories_burned
//   }
//
//   return dispatch => {
//     return fetch("http://localhost:3001/api/v1/meals", {
//       credentials: "include",
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(meal)
//     })
//       .then(response => response.json())
//       .then(json => {
//         if (json.error) {
//           alert(json.error)
//         } else {
//           console.log(json)
//           dispatch({ type: "ADD_MEAL", meals: json.data })
//           // should they go back to home page or to meal show page???
//           history.push("/")
//         }
//       })
//       .catch(console.log())
//   }
// }
