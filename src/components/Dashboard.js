import React from 'react';
import MacrosChart from './MacrosChart';

const Dashboard = props => {

  return (
    <div className="dashboard-container">
      <h2>Hello, {props.currentUser.attributes.username}! Welcome to your React Fitness Dashboard!</h2>

      <br />

      <div className="row">
        <div className="col-sm dashboard-module info-container">
          <h3>Profile</h3>

          <div className="center-align">
            <svg width="5em" height="5em" viewBox="0 0 16 16" className="bi bi-person-circle" fill="#DADFE6" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"/>
              <path fillRule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              <path fillRule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
            </svg>
          </div>

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
        </div>

        <div className="col-sm dashboard-module info-container">
          <h3>Today's Macros</h3>
          {!!props.dailyMacros ?
            <div>
              <canvas id="macros-chart">
                <MacrosChart macros={props.dailyMacros} />
              </canvas>

              <table className="macros-table">
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th className="right-align">Total</th>
                    <th className="right-align">Goal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-square-fill" fill="#2BC700" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                      </svg>
                    </td>
                    <td><b>Carbohydrates ({props.dailyNutrition.total_carbohydrate}g)</b></td>
                    <td className="right-align">{props.dailyMacros.carbohydrates}%</td>
                    <td className="right-align">50%</td>
                  </tr>
                  <tr>
                    <td>
                      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-square-fill" fill="#AB0091" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                      </svg>
                    </td>
                    <td><b>Fat ({props.dailyNutrition.total_fat}g)</b></td>
                    <td className="right-align">{props.dailyMacros.fat}%</td>
                    <td className="right-align">30%</td>
                  </tr>
                  <tr>
                    <td>
                      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-square-fill"   fill="#F76319" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                      </svg>
                    </td>
                    <td><b>Protein ({props.dailyNutrition.protein}g)</b></td>
                    <td className="right-align">{props.dailyMacros.protein}%</td>
                    <td className="right-align">20%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          :
            null
          }
        </div>

        <div className="col-sm dashboard-module info-container">
          <h3>Today's Exercise</h3>
          <p>Total Calories Burned: {props.caloriesBurned}</p>
        </div>

      </div>

      <div className="row meal-macros">
        <div className="col-lg dashboard-module info-container">
          <h3>Today's Meals</h3>


            <div class="row">
              <div class="meal-macros-col-sm">
                <canvas id="breakfast-macros-chart" className="meal-macros-chart">
                  <MacrosChart macros={props.breakfastMacros} />
                </canvas>
                <span className="meal-labels">Breakfast</span>
                <br />
                <span className="meal-labels-calories">{props.breakfastNutrition.calories} calories</span>
              </div>
              <div class="meal-macros-col-sm">
                <canvas id="lunch-macros-chart" className="meal-macros-chart">
                  <MacrosChart macros={props.lunchMacros} />
                </canvas>
                <span className="meal-labels">Lunch</span>
                <br />
                <span className="meal-labels-calories">{props.lunchNutrition.calories} calories</span>
              </div>
              <div class="meal-macros-col-sm">
                <canvas id="dinner-macros-chart" className="meal-macros-chart">
                  <MacrosChart macros={props.dinnerMacros} />
                </canvas>
                <span className="meal-labels">Dinner</span>
                <br />
                <span className="meal-labels-calories">{props.dinnerNutrition.calories} calories</span>
              </div>
            <div class="meal-macros-col-sm">
              <canvas id="snacks-macros-chart" className="meal-macros-chart">
                <MacrosChart macros={props.snacksMacros} />
              </canvas>
              <span className="meal-labels">Snacks</span>
              <br />
              <span className="meal-labels-calories">{props.snacksNutrition.calories} calories</span>
            </div>
        </div>
      </div>
      </div>

      <div className="row">
        <div className="row col-lg info-container">
          {!!props.dailyNutrition ?
            <div>
            <h3>Today's Nutrition</h3>
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
        </div>
      </div>

    </div>
  )

}

export default Dashboard;
