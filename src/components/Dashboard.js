import React from 'react';

const Dashboard = props => {

  return (
    <div className="DashboardContainer">
      <h2>Hello, {props.currentUser.attributes.username}! Welcome to your React Fitness Dashboard!</h2>

      <p>*************************************************************************************************</p>

      <h3>Profile</h3>

      <p>Age: {props.currentUser.attributes.age}</p>
      {/* User should have ability to update weight */}
      <p>Current Weight: {props.currentUser.attributes.weight}</p>
      {/* Should take the user's daily calorie goal, subtract any calories user has already eaten, and add any calories user has gained from exercise */}
      <p>Daily Calorie Goal: {props.currentUser.attributes.daily_calorie_goal}</p>
      {!!props.dailyNutrition ?
        <div>
          <p>Calories Consumed: {props.dailyNutrition.calories}</p>
          <p>Calories Remaining: {props.currentUser.attributes.daily_calorie_goal - props.dailyNutrition.calories + props.caloriesBurned}</p>
        </div>
      :
        <div>
          <p>Calories Consumed: 0</p>
          <p>Calories Remaining: {props.currentUser.attributes.daily_calorie_goal - 0 + props.caloriesBurned}</p>
        </div>
      }

      <p>*************************************************************************************************</p>

      <h3>Today's Exercise</h3>
      <p>Total Calories Burned: {props.caloriesBurned}</p>

      <p>*************************************************************************************************</p>

      <h3>Today's Macros</h3>
      {!!props.dailyMacros ?
        <div>
          <ul>
            Carbohydrates ({props.dailyNutrition.total_carbohydrate}g):
            <li>Total: {props.dailyMacros.carbohydrates}%</li>
            <li>Goal: 50%</li>
          </ul>
          <ul>
            Fat ({props.dailyNutrition.total_fat}g)
            <li>Total: {props.dailyMacros.fat}%</li>
            <li>Goal: 30%</li>
          </ul>
          <ul>
            Protein ({props.dailyNutrition.protein}g)
            <li>Total: {props.dailyMacros.protein}%</li>
            <li>Goal: 20%</li>
          </ul>
        </div>
      :
        null
      }

      <p>*************************************************************************************************</p>

        <h3>Today's Nutrition</h3>
        {!!props.dailyNutrition ?
          <div>
            <ul>
              <li>Total fat: {props.dailyNutrition.total_fat}g</li>
              <li>Saturated fat: {props.dailyNutrition.saturated_fat}g</li>
              <li>Polyunsaturated fat: {props.dailyNutrition.polyunsaturated_fat}g</li>
              <li>Monounsaturated fat: {props.dailyNutrition.monounsaturated_fat}g</li>
              <li>Trans fat: {props.dailyNutrition.trans_fat}g</li>
              <li>Cholesterol: {props.dailyNutrition.cholesterol}mg</li>
              <li>Sodium: {props.dailyNutrition.sodium}mg</li>
              <li>Total carbohydrates: {props.dailyNutrition.total_carbohydrate}g</li>
              <li>Dietary fiber: {props.dailyNutrition.dietary_fiber}g</li>
              <li>Total sugars: {props.dailyNutrition.total_sugars}g</li>
              <li>Added sugars: {props.dailyNutrition.added_sugars}g</li>
              <li>Sugar alcohols: {props.dailyNutrition.sugar_alcohols}g</li>
              <li>Protein: {props.dailyNutrition.protein}g</li>
              <li>Vitamin A: {props.dailyNutrition.vitamin_a}%</li>
              <li>Vitamin C: {props.dailyNutrition.vitamin_c}%</li>
              <li>Vitamin D: {props.dailyNutrition.vitamin_d}%</li>
              <li>Calcium: {props.dailyNutrition.calcium}%</li>
              <li>Iron: {props.dailyNutrition.iron}%</li>
              <li>Potassium: {props.dailyNutrition.potassium}mg</li>
            </ul>
        </div>
      :
        null
      }

      <p>*************************************************************************************************</p>

      <h3>Today's Meals</h3>

      <p>Breakfast: {props.breakfastNutrition.calories} calories</p>
      <p>Lunch: {props.lunchNutrition.calories} calories</p>
      <p>Dinner: {props.dinnerNutrition.calories} calories</p>
      <p>Snacks: {props.snacksNutrition.calories} calories</p>

      <p>*************************************************************************************************</p>

    </div>
  )

}

export default Dashboard;
