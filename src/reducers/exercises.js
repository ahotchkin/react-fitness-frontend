const exercisesReducer = (state = [], action) => {
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
      return state.filter(exercise => exercise.id !== action.exerciseId)
    case "CLEAR_EXERCISES":
      return []
    default:
      return state
  }
}

export default exercisesReducer;
