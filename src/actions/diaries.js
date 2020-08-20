// synchronous actions
export const setDiaries = diaries => {
  return {
    type: "SET_DIARIES",
    diaries
    // or payload: exercises
  }
}

export const clearDiaries = () => {
  return {
    type: "CLEAR_DIARIES"
  }
}

// before you think about populating this piece of state with anything, get it into the store first to see the name and data type are correct
// steps: 1. Build reducer, 2. Add to store, 3. Build action creator

// asychronous actions
export const getDiaries = () => {
  return dispatch => {
    console.log("DISPATCHING CURRENT USER'S DIARIES")
    return fetch("http://localhost:3001/api/v1/diaries", {
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
          console.log(json.data)
          dispatch(setDiaries(json.data))
        }
      })
      .catch(console.log())

  }
}

// export const addExercise = (exerciseData, currentUser, history) => {
//   console.log("exercise data is ", exerciseData)
//   const exercise = {
//     // is there a cleaner way to do this???
//     user_id: currentUser.id,
//     name: exerciseData.name,
//     category: exerciseData.category,
//     duration_in_minutes: exerciseData.duration_in_minutes,
//     calories_burned: exerciseData.calories_burned
//   }
//
//   return dispatch => {
//     return fetch("http://localhost:3001/api/v1/exercises", {
//       credentials: "include",
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(exercise)
//     })
//       .then(response => response.json())
//       .then(json => {
//         if (json.error) {
//           alert(json.error)
//         } else {
//           console.log(json)
//           dispatch({ type: "ADD_EXERCISE", exercises: json.data })
//           // should they go back to home page or to exercise show page???
//           history.push("/")
//         }
//       })
//       .catch(console.log())
//   }
// }
