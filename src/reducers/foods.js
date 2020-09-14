export default (state = [], action) => {
  switch (action.type) {
    case "SET_FOODS":
      return action.foods
    // case "CLEAR_FOODS":
    //   // want the diaries to be empty when the current user logs out
    //   return []
    default:
      return state
  }
}
