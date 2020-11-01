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

const baseUrl = "http://localhost:3001/api/v1/exercises"

// asychronous actions
export const getExercises = () => {
  return dispatch => {
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
  const exercise = {
    // is there a cleaner way to do this???
    user_id: currentUser.id,
    date: date,
    category: exerciseData.category,
    name: exerciseData.name,
    duration_in_minutes: exerciseData.duration_in_minutes,
    calories_burned: exerciseData.calories_burned
  }

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
          console.log(json.error)
        } else {
          dispatch(addExercise(json.data))
          history.push("/exercises")
        }
      })
      .catch(console.log())
  }
}

export const updateExercise = (exerciseFormData, date, exercise, history) => {
  const updatedExercise = {
    date: date,
    category: exerciseFormData.category,
    name: exerciseFormData.name,
    duration_in_minutes: exerciseFormData.duration_in_minutes,
    calories_burned: exerciseFormData.calories_burned
  }

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
          console.log(json.error)
        } else {
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
  }
}
