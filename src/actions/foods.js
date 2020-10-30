// synchronous actions
export const setFoods = foods => {
  return {
    type: "SET_FOODS",
    foods
  }
}

export const addFood = food => {
  return {
    type: "ADD_FOOD",
    food
  }
}

// before you think about populating this piece of state with anything, get it into the store first to see the name and data type are correct
// steps: 1. Build reducer, 2. Add to store, 3. Build action creator

// asychronous actions
export const getFoods = () => {
  return dispatch => {
    console.log("DISPATCHING ALL FOODS FROM THE DATABASE")
    return fetch("http://localhost:3001/api/v1/foods", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          console.log(json.error)
        } else {
          dispatch(setFoods(json.data))
        }
      })
      .catch(console.log())

  }
}

export const createFood = (userId, foodData, mealId, history, location) => {
  console.log(foodData)
  const food = {
    // is there a cleaner way to do this???
    user_id: userId,
    brand_name: foodData.brand_name,
    description: foodData.description,
    serving_size: foodData.serving_size,
    servings_per_container: foodData.servings_per_container,
    calories: foodData.calories,
    total_fat: foodData.total_fat,
    saturated_fat: foodData.saturated_fat,
    polyunsaturated_fat: foodData.polyunsaturated_fat,
    monounsaturated_fat: foodData.monounsaturated_fat,
    trans_fat: foodData.trans_fat,
    cholesterol: foodData.cholesterol,
    sodium: foodData.sodium,
    total_carbohydrate: foodData.total_carbohydrate,
    dietary_fiber: foodData.dietary_fiber,
    total_sugars: foodData.total_sugars,
    added_sugars: foodData.added_sugars,
    sugar_alcohols: foodData.sugar_alcohols,
    protein: foodData.protein,
    vitamin_a: foodData.vitamin_a,
    vitamin_c: foodData.vitamin_c,
    vitamin_d: foodData.vitamin_d,
    calcium: foodData.calcium,
    iron: foodData.iron,
    potassium: foodData.potassium,

  }

  return dispatch => {
    return fetch("http://localhost:3001/api/v1/foods", {

      // credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(food)
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          console.log(json.error)
        } else {
          dispatch(addFood(json.data))
          if (!!mealId) {
            history.push({
              pathname: `/meals/${mealId}/foods`,
              state: {
                diaryDate: location.state.diaryDate,
              }
            })
          } else {
            history.push("/foods")
          }
        }
      })
      .catch(console.log())
  }
}
