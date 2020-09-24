// synchronous actions
export const setDiaries = diaries => {
  return {
    type: "SET_DIARIES",
    diaries
    // or payload: diaries
  }
}

export const clearDiaries = () => {
  return {
    type: "CLEAR_DIARIES"
  }
}

export const addDiary = diary => {
  return {
    type: "ADD_DIARY",
    diary
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
          console.log(json.data)
        } else {
          dispatch(setDiaries(json.data))
        }
      })
      .catch(console.log())

  }
}

export const createDiary = (diaryDate, currentUser, history) => {
  const diary = {
    // is there a cleaner way to do this???
    user_id: currentUser.id,
    date: diaryDate,
  }

  return dispatch => {
    return fetch("http://localhost:3001/api/v1/diaries", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(diary)
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          alert(json.error)
        } else {
          console.log(json)
          dispatch(addDiary(json.data))
          console.log("diary successfully created")
          // should they go back to home page or to diary show page???
          history.push("/diaries")
        }
      })
      .catch(console.log())
  }
}
