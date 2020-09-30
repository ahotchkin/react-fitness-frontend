// synchronous actions
export const setExercises = exercises => {
  return {
    type: "SET_EXERCISES",
    exercises
  }
}

export const clearExercises = () => {
  return {
    type: "CLEAR_EXERCISES"
  }
}

export const addExercise = exercise => {
  return {
    type: "ADD_EXERCISE",
    exercise
  }
}

export const updateExerciseSuccess = exercise => {
  return {
    type: "UPDATE_EXERCISE",
    exercise
  }
}

export const deleteExerciseSuccess = exerciseId => {
  return {
    type: "DELETE_EXERCISE",
    exerciseId
  }
}

// before you think about populating this piece of state with anything, get it into the store first to see the name and data type are correct
// steps: 1. Build reducer, 2. Add to store, 3. Build action creator
const baseUrl = "http://localhost:3001/api/v1/exercises"
// asychronous actions
export const getExercises = () => {
  return dispatch => {
    console.log("DISPATCHING CURRENT USER'S EXERCISES")
    return fetch(baseUrl, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
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

export const createExercise = (exerciseData, date, currentUser, history) => {
  console.log("exercise data is ", exerciseData)
  const exercise = {
    // is there a cleaner way to do this???
    user_id: currentUser.id,
    date: date,
    category: exerciseData.category,
    name: exerciseData.name,
    duration_in_minutes: exerciseData.duration_in_minutes,
    calories_burned: exerciseData.calories_burned
  }
  console.log(exercise)


  return dispatch => {
    return fetch(baseUrl, {
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
          dispatch(addExercise(json.data))
          // should they go back to home page or to exercise show page???
          history.push("/exercises")
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
    return fetch(baseUrl + `/${exercise.id}`, {
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
          dispatch(updateExerciseSuccess(json.data))
          // what is the difference between push and pushState???
          history.push("/exercises")
        }
      })
      .catch(console.log())
  }
}

export const deleteExercise = (exerciseId, history) => {
  console.log(`getting ready to delete exercise with an id of ${exerciseId}`)
  console.log(history)
  return dispatch => {
    return fetch(baseUrl + `/${exerciseId}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          alert(json.error)
        } else {
          console.log(json)
          dispatch(deleteExerciseSuccess(exerciseId))
          history.push("/exercises")
        }
      })
      .catch(console.log())
    // **********NEED TO REDIRECT TO /EXERCISES, FIGURE OUT HOW TO DO THIS**********

  }
}
