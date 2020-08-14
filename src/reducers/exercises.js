export default (state = [], action) => {
  switch (action.type) {
    case "SET_MY_EXERCISES":
      return action.exercises
    default:
      return state
  }
}
