import React from 'react';

const NutrientProgressBar = props => {

  const nutrientProgress = () => {
    if (props.nutrientGoal > 0) {
      return (
        (props.nutrientConsumption / props.nutrientGoal) * 100
      )
    } else if (props.nutrientGoal === 0 && props.nutrientConsumption > 0){
      return 100
    } else {
      return 0
    }
  }

  return (
    <tbody>
      <tr>
        <td colSpan="6">{props.nutrient}</td>
        <td colSpan="2" className="right-align">{props.nutrientConsumption}</td>
        <td colSpan="2" className="right-align">{props.nutrientGoal}</td>
        { props.nutrientGoal - props.nutrientConsumption < 0 ?
          <td colSpan="2" className="right-align negative">{props.nutrientGoal - props.nutrientConsumption}{props.unit}</td>
        :
          <td colSpan="2" className="right-align">{props.nutrientGoal - props.nutrientConsumption}{props.unit}</td>
        }
      </tr>
      <tr>
        <td colSpan="12">
          <div className="progress" style={{height: "10px"}}>
            <div className="progress-bar" role="progressbar" style={{width: `${nutrientProgress()}%`, backgroundColor: "#2C75D4"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </td>
      </tr>
      <tr>
        <td colSpan="12"><hr className="solid-thin" /></td>
      </tr>
    </tbody>

  )
}

export default NutrientProgressBar
