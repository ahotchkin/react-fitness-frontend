export default (state = [], action) => {
  switch (action.type) {
    case "SET_EXERCISES":
      return action.exercises
    case "ADD_EXERCISE":
      return [
        ...state,
        action.exercise
      ]
    case "DELETE_EXERCISE":
      return [
        state.filter(exercise => exercise !== action.exercise)

      ]
    case "CLEAR_EXERCISES":
      // want the exercises to be empty when the current user logs out
      return []
    default:
      return state
  }
}
