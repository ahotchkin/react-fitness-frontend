export default (state = [], action) => {
  switch (action.type) {
    case "SET_DIARIES":
      return action.diaries
    case "ADD_DIARY":
      return state.concat(action.diary)
    case "CLEAR_DIARIES":
      return []
    default:
      return state
  }
}
