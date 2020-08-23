// synchronous actions
export const setFoods = foods => {
  return {
    type: "SET_FOODS",
    foods
    // or payload: foods
  }
}

export const clearFoods = () => {
  return {
    type: "CLEAR_FOODS"
  }
}

// before you think about populating this piece of state with anything, get it into the store first to see the name and data type are correct
// steps: 1. Build reducer, 2. Add to store, 3. Build action creator

// asychronous actions
export const getFoods = () => {
  return dispatch => {
    console.log("DISPATCHING CURRENT USER'S FOODS")
    return fetch("http://localhost:3001/api/v1/foods", {
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
          dispatch(setFoods(json.data))
          console.log(json.data)
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
//     return fetch("http://localhost:3001/api/v1/foods", {
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
//           dispatch({ type: "ADD_FOOD", foods: json.data })
//           // should they go back to home page or to meal show page???
//           history.push("/")
//         }
//       })
//       .catch(console.log())
//   }
// }
