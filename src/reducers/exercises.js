export default (state = [], action) => {
  switch (action.type) {
    case "SET_EXERCISES":
      return action.exercises
    case "ADD_EXERCISE":
      return state.concat(action.exercise)
    case "UPDATE_EXERCISE":
      return (state.map(exercise => {
        if (exercise.id === action.exercise.id ) {
          return action.exercise
        } else {
          return exercise
        }
      }))
    case "DELETE_EXERCISE":
      console.log(state.filter(exercise => exercise.id !== action.exerciseId))
      return state.filter(exercise => exercise.id !== action.exerciseId)
    case "CLEAR_EXERCISES":
      // want the exercises to be empty when the current user logs out
      return []
    default:
      return state
  }
}
