// synchronous actions

import { updateMeal } from './meals';

export const setMealFoods = mealFoods => {
  return {
    type: "SET_MEAL_FOODS",
    mealFoods
  }
}

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

// NEED TO CALL THIS AND ALL OTHER CLEAR FUNCTIONS ON LOGOUT
export const clearMealFoods = () => {
  return {
    type: "CLEAR_MEAL_FOODS"
  }
}





// ***************************************************************************

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
          // console.log(json.data)
          dispatch(setMealFoods(json.data))
        }
      })
      .catch(console.log())

  }
}
// ^^Added when started pulling mealFoods from database instead of from associated meals
// ****************************************************************************





export const createMealFood = (meal, food, number_of_servings, history, location) => {
  console.log(location)
  console.log("foodId is ", food.id, "mealId is ", meal.id)
  console.log(food)
  console.log(number_of_servings)
  console.log(food.attributes.protein * number_of_servings)
  const mealFood = {
    // is there a cleaner way to do this???
    meal_id: meal.id,
    food_id: food.id,
    number_of_servings: number_of_servings,
    calories: Math.round(food.attributes.calories * number_of_servings),
    total_fat: Math.round(food.attributes.total_fat * number_of_servings),
    saturated_fat: Math.round(food.attributes.saturated_fat * number_of_servings),
    polyunsaturated_fat: Math.round(food.attributes.polyunsaturated_fat * number_of_servings),
    monounsaturated_fat: Math.round(food.attributes.monounsaturated_fat * number_of_servings),
    trans_fat: Math.round(food.attributes.trans_fat * number_of_servings),
    cholesterol: Math.round(food.attributes.cholesterol * number_of_servings),
    sodium: Math.round(food.attributes.sodium * number_of_servings),
    total_carbohydrate: Math.round(food.attributes.total_carbohydrate * number_of_servings),
    dietary_fiber: Math.round(food.attributes.dietary_fiber * number_of_servings),
    total_sugars: Math.round(food.attributes.total_sugars * number_of_servings),
    added_sugars: Math.round(food.attributes.added_sugars * number_of_servings),
    sugar_alcohols: Math.round(food.attributes.sugar_alcohols * number_of_servings),
    protein: Math.round(food.attributes.protein * number_of_servings),
    vitamin_a: Math.round(food.attributes.vitamin_a * number_of_servings),
    vitamin_c: Math.round(food.attributes.vitamin_c * number_of_servings),
    vitamin_d: Math.round(food.attributes.vitamin_d * number_of_servings),
    calcium: Math.round(food.attributes.calcium * number_of_servings),
    iron: Math.round(food.attributes.iron * number_of_servings),
    potassium: Math.round(food.attributes.potassium * number_of_servings)
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
          console.log(json.error)
        } else {
          // console.log(json)
          // console.log(mealFood)
          // console.log(meal)
          dispatch(addMealFood(json.data))
          dispatch(updateMeal(meal.id, meal.attributes.calories, null, mealFood.calories))

          // should they go back to home page or to meal show page???
          // history.push("/diaries")

          history.push({
            pathname: "/diaries",
            state: {
              diaryDate: location.state.diaryDate
            }
          })

          // this.props.history.push({
          //   pathname: '/template',
          //   search: '?query=abc',
          //   state: { detail: response.data }
          // })
        }
      })
      .catch(console.log())
  }
}




export const updateMealFood = (mealFood, updated_number_of_servings, history) => {
  console.log(mealFood)
  console.log(`getting ready to update mealFood with an id of ${mealFood.id}`)
  const updatedMealFood = {
    // is there a cleaner way to do this???
    // is this persisting the userId that was originally saved?????

    number_of_servings: updated_number_of_servings,
    calories: Math.round(mealFood.attributes.food.calories * updated_number_of_servings),
    total_fat: Math.round(mealFood.attributes.food.total_fat * updated_number_of_servings),
    saturated_fat: Math.round(mealFood.attributes.food.saturated_fat * updated_number_of_servings),
    polyunsaturated_fat: Math.round(mealFood.attributes.food.polyunsaturated_fat * updated_number_of_servings),
    monounsaturated_fat: Math.round(mealFood.attributes.food.monounsaturated_fat * updated_number_of_servings),
    trans_fat: Math.round(mealFood.attributes.food.trans_fat * updated_number_of_servings),
    cholesterol: Math.round(mealFood.attributes.food.cholesterol * updated_number_of_servings),
    sodium: Math.round(mealFood.attributes.food.sodium * updated_number_of_servings),
    total_carbohydrate: Math.round(mealFood.attributes.food.total_carbohydrate * updated_number_of_servings),
    dietary_fiber: Math.round(mealFood.attributes.food.dietary_fiber * updated_number_of_servings),
    total_sugars: Math.round(mealFood.attributes.food.total_sugars * updated_number_of_servings),
    added_sugars: Math.round(mealFood.attributes.food.added_sugars * updated_number_of_servings),
    sugar_alcohols: Math.round(mealFood.attributes.food.sugar_alcohols * updated_number_of_servings),
    protein: Math.round(mealFood.attributes.food.protein * updated_number_of_servings),
    vitamin_a: Math.round(mealFood.attributes.food.vitamin_a * updated_number_of_servings),
    vitamin_c: Math.round(mealFood.attributes.food.vitamin_c * updated_number_of_servings),
    vitamin_d: Math.round(mealFood.attributes.food.vitamin_d * updated_number_of_servings),
    calcium: Math.round(mealFood.attributes.food.calcium * updated_number_of_servings),
    iron: Math.round(mealFood.attributes.food.iron * updated_number_of_servings),
    potassium: Math.round(mealFood.attributes.food.potassium * updated_number_of_servings)
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
          if (updated_number_of_servings <= 0) {
            alert("Number of servings must be greater than 0")
          } else if (!Number(updated_number_of_servings)) {
            alert("Number of servings is not a number")
          }
        } else {
          console.log(json)
          console.log(mealFood)
          dispatch(updateMealFoodSuccess(json.data))
          dispatch(updateMeal(mealFood.attributes.meal.id, mealFood.attributes.meal.calories, mealFood.attributes.calories, updatedMealFood.calories))

          // what is the difference between push and pushState???
          history.push("/diaries")
        }
      })
      .catch(console.log())
  }
}
//SOMETHING FUNNY IS HAPPENING HERE. CALORIE COUNT NOT UPDATING PROPERLY.
export const deleteMealFood = (mealFood, meal, history) => {
  console.log(`getting ready to delete mealFood with an id of ${mealFood.id}`)
  console.log(history)
  console.log(mealFood)
  console.log(meal)
  return dispatch => {
    return fetch(`http://localhost:3001/api/v1/meal_foods/${mealFood.id}`, {
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
          dispatch(deleteMealFoodSuccess(mealFood.id))
          dispatch(updateMeal(meal.id, meal.attributes.calories, mealFood.attributes.calories, null))
          history.push("/diaries")
        }
      })
      .catch(console.log())

  }
}
