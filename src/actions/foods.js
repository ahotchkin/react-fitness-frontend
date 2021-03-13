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

export const clearFoods = () => {
  return {
    type: "CLEAR_FOODS"
  }
}


// asychronous actions

// ******************************************
// fix error handling in fetch requests
// abstract fetch request to adapter class
// ******************************************

const baseUrl = "http://localhost:3001/api/v1/foods"

export const getFoods = () => {
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
          console.log(json.error)
        } else {
          dispatch(setFoods(json.data))
        }
      })
      .catch(console.log())

  }
}

export const createFood = (userId, foodData, mealId, history) => {
  let foodInfo = {
    food: foodData
  }

  foodInfo.food.user_id = userId

  return dispatch => {
    return fetch(baseUrl, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(foodInfo)
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          // console.log(json.error)
          throw new Error(json.error)
        } else {
          dispatch(addFood(json.data))
          if (!!mealId) {
            history.push(`/meals/${mealId}/foods`)
          } else {
            history.push("/foods")
          }
        }
      })
      .catch(json => console.log(json))
  }
}
