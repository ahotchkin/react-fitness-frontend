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

// asychronous actions

// ******************************************
// fix error handling in fetch requests
// abstract fetch request to adapter class
// ******************************************

const baseUrl = "http://localhost:3001/api/v1/exercises"

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
  let exerciseInfo = {
    exercise: exerciseData
  }

  exerciseInfo.exercise.user_id = currentUser.id
  exerciseInfo.exercise.date = date

  return dispatch => {
    return fetch(baseUrl, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(exerciseInfo)
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

export const updateExercise = (exerciseData, date, exercise, history) => {
  let updatedExerciseInfo = {
    exercise: exerciseData
  }

  updatedExerciseInfo.exercise.date = date

  return dispatch => {
    return fetch(baseUrl + `/${exercise.id}`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedExerciseInfo)
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          console.log(json.error)
        } else {
          dispatch(updateExerciseSuccess(json.data))
          history.push("/exercises")
        }
      })
      .catch(console.log())
  }
}

export const deleteExercise = (exerciseId, history) => {
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
          dispatch(deleteExerciseSuccess(exerciseId))
          history.push("/exercises")
        }
      })
      .catch(console.log())
  }
}
