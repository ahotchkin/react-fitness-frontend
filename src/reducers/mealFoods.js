export default (state = [], action) => {
  switch (action.type) {
    // case "SET_MEAL_FOODS":
    //   return action.mealFoods
    // case "CLEAR_FOODS":
    //   // want the diaries to be empty when the current user logs out
    //   return []
    case "ADD_MEAL_FOOD":
      return state.concat(action.mealFood)
    case "UPDATE_MEAL_FOOD_SUCCESS":
      return (state.map(mealFood => {
        if (mealFood.id === action.mealFood.id ) {
          return action.mealFood
        } else {
          return mealFood
        }
      }))
    default:
      return state
  }
}
