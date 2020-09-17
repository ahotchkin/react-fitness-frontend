export default (state = [], action) => {
  switch (action.type) {
    case "SET_MEALS":
      return action.meals
    case "UPDATE_MEAL":
      return (state.map(meal => {
        if (meal.id === action.meal.id ) {
          return action.meal
        } else {
          return meal
        }
      }))
    case "CLEAR_MEALS":
      // want the exercises to be empty when the current user logs out
      return []
    default:
      return state
  }
}
