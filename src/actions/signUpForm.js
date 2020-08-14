// synchronous action creators
export const updateSignUpForm = formData => {
  return {
    type: "UPDATE_SIGNUP_FORM",
    formData
    // payload: formData

  }
}


export const resetSignUpForm = () => {
  return {
    type: "RESET_SIGNUP_FORM"
  }
}