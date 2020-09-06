// synchronous actions
export const setExercises = exercises => {
  return {
    type: "SET_EXERCISES",
    exercises
    // or payload: exercises
  }
}

export const clearExercises = () => {
  return {
    type: "CLEAR_EXERCISES"
  }
}

// before you think about populating this piece of state with anything, get it into the store first to see the name and data type are correct
// steps: 1. Build reducer, 2. Add to store, 3. Build action creator

// asychronous actions
export const getExercises = () => {
  return dispatch => {
    console.log("DISPATCHING CURRENT USER'S EXERCISES")
    return fetch("http://localhost:3001/api/v1/exercises", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      // .then(user => dispatch({type: "SET_CURRENT_USER"}))
      .then(json => {
        if (json.error) {
          alert(json.error)
        } else {
          dispatch(setExercises(json.data))
        }
      })
      .catch(console.log())

  }
}

export const addExercise = (exerciseData, currentUser, history) => {
  console.log("exercise data is ", exerciseData)
  const exercise = {
    // is there a cleaner way to do this???
    user_id: currentUser.id,
    name: exerciseData.name,
    category: exerciseData.category,
    duration_in_minutes: exerciseData.duration_in_minutes,
    calories_burned: exerciseData.calories_burned
  }

  return dispatch => {
    return fetch("http://localhost:3001/api/v1/exercises", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(exercise)
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          alert(json.error)
        } else {
          console.log(json)
          dispatch({ type: "ADD_EXERCISE", exercise: json.data })
          // should they go back to home page or to exercise show page???
          history.push("/")
        }
      })
      .catch(console.log())
  }
}

export const updateExercise = (exerciseFormData, exercise, history) => {
  console.log(exercise)
  console.log(`getting ready to update exercise with an id of ${exercise.id}`)
  const updatedExercise = {
    // is there a cleaner way to do this???
    // is this persisting the userId that was originally saved?????
    name: exerciseFormData.name,
    category: exerciseFormData.category,
    duration_in_minutes: exerciseFormData.duration_in_minutes,
    calories_burned: exerciseFormData.calories_burned
  }
  console.log("here is the updated exercise: ")
  console.log(updatedExercise)

  return dispatch => {
    return fetch(`http://localhost:3001/api/v1/exercises/${exercise.id}`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedExercise)
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          alert(json.error)
        } else {
          console.log(json)
          console.log(history)
          dispatch({ type: "UPDATE_EXERCISE", exercise: json.data })
          // should they go back to home page or to exercise show page???
          // what is the difference between push and pushState???



          // **********THIS IS CAUSING AN ERROR, NOT REDIRECTING PROPERLY**********
          history.push("/exercises")
        }
      })
      .catch(console.log())
  }
}

export const deleteExercise = id => {
  console.log(`getting ready to delete exercise with an id of ${id}`)
  return dispatch => {
    return fetch(`http://localhost:3001/api/v1/exercises/${id}`, {
      credentials: "include",
      method: "DELETE"
    })
    // **********NEED TO REDIRECT TO /EXERCISES, FIGURE OUT HOW TO DO THIS**********

  }
}
