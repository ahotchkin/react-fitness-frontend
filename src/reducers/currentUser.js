export default (state = null, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return action.user
    case "CLEAR_CURRENT_USER":
      // want the user to be null when the current user logs out
      return null
    default:
      return state
  }
}
