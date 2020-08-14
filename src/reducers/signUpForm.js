const initialState = {
  username: "",
  password: "",
  gender: "",
  age: "",
  height_feet: "",
  height_inches: "",
  weight: "",
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_SIGNUP_FORM":
      return action.formData
    case "RESET_SIGNUP_FORM":
      return initialState
    default:
      return state
  }
}

// ******* any time you build an action creator, build the reducer right away so you don't forget about it
// ******** a reducer just updates a piece of state
