export default (state = [], action) => {
  switch (action.type) {
    // case "SET_FOODS":
    //   return action.foods
    // case "CLEAR_FOODS":
    //   // want the diaries to be empty when the current user logs out
    //   return []
    case "ADD_MEAL_FOOD":
      return state.concat(action.food)
    default:
      return state
  }
}
