export const addMealFood = mealFood => {
  return {
    type: "ADD_MEAL_FOOD",
    mealFood
  }
}

export const createMealFood = (mealId, foodData, history) => {
  console.log("foodId is ", foodData, "mealId is ", mealId)
  const mealFood = {
    // is there a cleaner way to do this???
    meal_id: mealId,
    food_id: foodData.id,
    // placeholder info - need to have user enter this information
    number_of_servings: 1,
    calories: foodData.attributes.calories * 1
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
