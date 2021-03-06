import { updateMeal } from './meals';


// synchronous actions
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

export const clearMealFoods = () => {
  return {
    type: "CLEAR_MEAL_FOODS"
  }
}


// asychronous actions

// ******************************************
// fix error handling in fetch requests
// abstract fetch request to adapter class
// ******************************************

const baseUrl = "http://localhost:3001/api/v1/meal_foods"

export const getMealFoods = () => {
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
          dispatch(setMealFoods(json.data))
        }
      })
      .catch(console.log())

  }
}

export const createMealFood = (meal, foodId, food, number_of_servings, history, location) => {
  const mealFood = {
    // is there a cleaner way to do this???
    meal_id: meal.id,
    food_id: foodId,
    number_of_servings: number_of_servings,
    calories: Math.round(food.calories * number_of_servings),
    total_fat: Math.round(food.total_fat * number_of_servings),
    saturated_fat: Math.round(food.saturated_fat * number_of_servings),
    polyunsaturated_fat: Math.round(food.polyunsaturated_fat * number_of_servings),
    monounsaturated_fat: Math.round(food.monounsaturated_fat * number_of_servings),
    trans_fat: Math.round(food.trans_fat * number_of_servings),
    cholesterol: Math.round(food.cholesterol * number_of_servings),
    sodium: Math.round(food.sodium * number_of_servings),
    total_carbohydrate: Math.round(food.total_carbohydrate * number_of_servings),
    dietary_fiber: Math.round(food.dietary_fiber * number_of_servings),
    total_sugars: Math.round(food.total_sugars * number_of_servings),
    added_sugars: Math.round(food.added_sugars * number_of_servings),
    sugar_alcohols: Math.round(food.sugar_alcohols * number_of_servings),
    protein: Math.round(food.protein * number_of_servings),
    vitamin_a: Math.round(food.vitamin_a * number_of_servings),
    vitamin_c: Math.round(food.vitamin_c * number_of_servings),
    vitamin_d: Math.round(food.vitamin_d * number_of_servings),
    calcium: Math.round(food.calcium * number_of_servings),
    iron: Math.round(food.iron * number_of_servings),
    potassium: Math.round(food.potassium * number_of_servings)
  }

  return dispatch => {
    return fetch(baseUrl, {
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
          dispatch(addMealFood(json.data))
          dispatch(updateMeal(meal.id, meal.attributes.calories, null, mealFood.calories))
          history.push("/diaries")
        }
      })
      .catch(console.log())
  }
}


export const updateMealFood = (mealFood, updated_number_of_servings, history) => {
  const updatedMealFood = {
    // is there a cleaner way to do this???

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

  return dispatch => {
    return fetch(baseUrl + `/${mealFood.id}`, {
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
          console.log(json.error)
        } else {
          dispatch(updateMealFoodSuccess(json.data))
          dispatch(updateMeal(mealFood.attributes.meal.id, mealFood.attributes.meal.calories, mealFood.attributes.calories, updatedMealFood.calories))
          history.push("/diaries")
        }
      })
      .catch(console.log())
  }
}

export const deleteMealFood = (mealFood, meal, history) => {
  return dispatch => {
    return fetch(baseUrl + `/${mealFood.id}`, {
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
          dispatch(deleteMealFoodSuccess(mealFood.id))
          dispatch(updateMeal(meal.id, meal.attributes.calories, mealFood.attributes.calories, null))
          history.push("/diaries")
        }
      })
      .catch(console.log())
  }
}
