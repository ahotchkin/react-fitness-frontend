export default (state = [], action) => {
  switch (action.type) {
    // case "SET_MEAL_FOODS":
    //   return action.mealFoods
    // case "CLEAR_FOODS":
    //   // want the diaries to be empty when the current user logs out
    //   return []
    case "ADD_MEAL_FOOD":
      return state.concat(action.mealFood)
    default:
      return state
  }
}
