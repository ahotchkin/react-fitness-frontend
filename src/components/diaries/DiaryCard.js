import React from 'react';

import MealsContainer from '../../containers/MealsContainer';

const  DiaryCard = props => {

  const caloriesRemaining = () => {
    let dailyCaloriesRemaining = ""
    if (!!(props.currentUser.attributes.daily_calorie_goal - props.caloriesConsumed + props.caloriesBurned)) {
      dailyCaloriesRemaining = props.currentUser.attributes.daily_calorie_goal - props.caloriesConsumed + props.caloriesBurned
    }

    return dailyCaloriesRemaining
  }

  return (
    <div className="col-lg info-container">
      <h3>Meal Diary for {props.diary.attributes.date}</h3>
      <p>Calories Remaining</p>
      { caloriesRemaining() >= 0 ?
        <h3 className="positive">{caloriesRemaining()}</h3>
      :
        <h3 className="negative">{caloriesRemaining()}</h3>
      }
      <table className="calorie-table">
        <thead>
          <tr>
            <td className="calorie-table-cell">{props.currentUser.attributes.daily_calorie_goal}</td>
            <td className="calorie-table-cell">-</td>
            <td className="calorie-table-cell">{props.caloriesConsumed}</td>
            <td className="calorie-table-cell">+</td>
            <td className="calorie-table-cell">{props.caloriesBurned}</td>
            <td className="calorie-table-cell">=</td>
            <td className="calorie-table-cell">{caloriesRemaining()}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="calorie-table-cell small text-secondary">Goal</td>
            <td className="calorie-table-cell"></td>
            <td className="calorie-table-cell small text-secondary">Consumed</td>
            <td className="calorie-table-cell"></td>
            <td className="calorie-table-cell small text-secondary">Burned</td>
            <td className="calorie-table-cell"></td>
            <td className="calorie-table-cell small text-secondary">Remaining</td>
          </tr>
        </tbody>
      </table>

      <hr className="solid-thick" />

      <MealsContainer diaryId={props.diary.id} diaryDate={props.diary.attributes.date} />
    </div>
  )
}

export default DiaryCard;
