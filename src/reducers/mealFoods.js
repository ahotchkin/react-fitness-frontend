export default (state = [], action) => {
  switch (action.type) {
    case "SET_MEAL_FOODS":
      return action.mealFoods
    case "ADD_MEAL_FOOD":
      return state.concat(action.mealFood)
    case "UPDATE_MEAL_FOOD_SUCCESS":
      return (state.map(mealFood => {
        if (mealFood.id === action.mealFood.id ) {
          return action.mealFood
        } else {
          return mealFood
        }
      }))
    case "DELETE_MEAL_FOOD":
      console.log(state.filter(mealFood => mealFood.id !== action.mealFoodId))
      return state.filter(mealFood => mealFood.id !== action.mealFoodId)
    case "CLEAR_MEAL_FOODS":
      return []
    default:
      return state
  }
}
