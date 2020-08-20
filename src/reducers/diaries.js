export default (state = [], action) => {
  switch (action.type) {
    case "SET_DIARIES":
      return action.diaries
    case "CLEAR_DIARIES":
      // want the diaries to be empty when the current user logs out
      return []
    default:
      return state
  }
}
