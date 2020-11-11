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

export const clearMeals = () => {
  return {
    type: "CLEAR_MEALS"
  }
}

// asychronous actions
const baseUrl = "http://localhost:3001/api/v1/meals"

export const getMeals = () => {
  return dispatch => {
    return fetch(baseUrl, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          alert(json.error)
        } else {
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
    return fetch(baseUrl + `/${mealId}`, {
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
        }
      })
      .catch(console.log())
  }
}
