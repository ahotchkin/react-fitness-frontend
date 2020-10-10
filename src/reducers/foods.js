export default (state = [], action) => {
  switch (action.type) {
    case "SET_FOODS":
      return action.foods
    case "ADD_FOOD":
      return state.concat(action.food)
    default:
      return state
  }
}
