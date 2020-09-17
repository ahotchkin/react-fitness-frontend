// synchronous actions
export const setMealFoods = mealFoods => {
  return {
    type: "SET_MEAL_FOODS",
    mealFoods
  }
}

// NEED TO CALL THIS AND ALL OTHER CLEAR FUNCTIONS ON LOGOUT
export const clearMealFoods = () => {
  return {
    type: "CLEAR_MEAL_FOODS"
  }
}


// asychronous actions
export const getMealFoods = () => {
  return dispatch => {
    console.log("DISPATCHING CURRENT USER'S MEAL_FOODS")
    return fetch("http://localhost:3001/api/v1/meal_foods", {
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
          console.log(json.data)
          dispatch(setMealFoods(json.data))
        }
      })
      .catch(console.log())

  }
}



// ***************************************************************************

export const addMealFood = mealFood => {
  return {
    type: "ADD_MEAL_FOOD",
    mealFood
  }
}

export const updateMealFoodSuccess = mealFood => {
  return {
    type: "UPDATE_MEAL_FOOD",
    mealFood
  }
}

export const deleteMealFoodSuccess = mealFoodId => {
  return {
    type: "DELETE_MEAL_FOOD",
    mealFoodId
  }
}


export const createMealFood = (mealId, foodData, number_of_servings, history) => {
  console.log("foodId is ", foodData, "mealId is ", mealId)
  const mealFood = {
    // is there a cleaner way to do this???
    meal_id: mealId,
    food_id: foodData.id,
    // placeholder info - need to have user enter this information
    number_of_servings: number_of_servings,
    calories: foodData.attributes.calories * number_of_servings
  }


  return dispatch => {
    return fetch("http://localhost:3001/api/v1/meal_foods", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mealFood)
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          alert(json.error)
        } else {
          console.log(json)
          dispatch(addMealFood(json.data))
          // should they go back to home page or to meal show page???
          history.push("/diaries")
        }
      })
      .catch(console.log())
  }
}




export const updateMealFood = (mealFood, foodData, number_of_servings, history) => {
  console.log(mealFood)
  console.log(`getting ready to update mealFood with an id of ${mealFood.id}`)
  const updatedMealFood = {
    // is there a cleaner way to do this???
    // is this persisting the userId that was originally saved?????

    number_of_servings: number_of_servings,
    calories: foodData.calories * number_of_servings
  }
  console.log("here is the updated mealFood: ")
  console.log(updatedMealFood)

  return dispatch => {
    // CREATE BASE URL VARIABLE TO USE
    return fetch(`http://localhost:3001/api/v1/meal_foods/${mealFood.id}`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedMealFood)
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          alert(json.error)
        } else {
          console.log(json)
          dispatch(updateMealFoodSuccess(json.data))
          // what is the difference between push and pushState???
          history.push("/diaries")
        }
      })
      .catch(console.log())
  }
}
//
export const deleteMealFood = (mealFoodId, history) => {
  console.log(`getting ready to delete mealFood with an id of ${mealFoodId}`)
  console.log(history)
  return dispatch => {
    return fetch(`http://localhost:3001/api/v1/meal_foods/${mealFoodId}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          alert(json.error)
        } else {
          console.log(json)
          dispatch(deleteMealFoodSuccess(mealFoodId))
          history.push("/diaries")
        }
      })
      .catch(console.log())

  }
}
