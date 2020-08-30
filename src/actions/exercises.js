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

export const deleteExercise = id => {
  console.log(`getting ready to delete exercise with an id of ${id}`)
  return dispatch => {
    // don't need to wait until fetch request resolves to log out a user, when a user clicks logout they should logout right away. call clearCurrentUser immediately
    // optimistic => make the change to the frontend right away, don't wait for the backend
    // pessimistic => hold on, make sure the server is running, the response we said works and the backend is all set before changing anything on the frontend and displaying anything to the user
    return fetch(`http://localhost:3001/api/v1/exercises/${id}`, {
      credentials: "include",
      method: "DELETE"
    })

  }
}
