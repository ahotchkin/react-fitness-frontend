import React from 'react';

import MealsContainer from '../../containers/MealsContainer';

const  DiaryCard = props => {

  return (
    <div className="col-lg info-container">
      <h5>Calories Remaining</h5>
      { props.caloriesRemaining >= 0 ?
        <h3 className="positive">{props.caloriesRemaining}</h3>
      :
        <h3 className="negative">{props.caloriesRemaining}</h3>
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
            <td className="calorie-table-cell">{props.caloriesRemaining}</td>
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
  );
};

export default DiaryCard;
