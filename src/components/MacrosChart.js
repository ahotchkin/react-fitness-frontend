import React, { Component } from 'react';
import Chart from 'chart.js';

class MacrosChart extends Component {

  state = {
    loaded: false
  }

  componentDidMount() {
    this.setState({
      loaded: true
    })
  }

  renderMacrosChart = () => {
    const ctx = document.getElementById("macros-chart").getContext("2d")
    console.log(ctx)

    const macrosChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            label: "Daily Macros",
            data: [this.props.dailyMacros.carbohydrates, this.props.dailyMacros.fat, this.props.dailyMacros.protein],
            backgroundColor: ["#2ADECE", "#DD3B79", "#FF766B"]
          }
        ],
        labels: ["Carbohydrates", "Fat", "Protein"],
      },
      options: {
        cutoutPercentage: 65,
      }
    })
  }

  render() {
    return (
      <div>
        { !!this.state.loaded ?
          this.renderMacrosChart()
        :
          null
        }
      </div>
    )
  }
  
}

export default MacrosChart;
