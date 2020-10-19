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

    if (this.props.dailyMacros.carbohydrates === 0 && this.props.dailyMacros.fat === 0 && this.props.dailyMacros.protein === 0) {
      const macrosChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          datasets: [
            {
              label: "Daily Macros",
              data: [100],
              backgroundColor: ["#E6EBF2"],
              borderWidth: 0
            }
          ],
        },
        options: {
          cutoutPercentage: 67,
          legend: {
            display: false
          },
          events: null,
          animation: null
        }
      })
    } else {
      const macrosChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          datasets: [
            {
              label: "Daily Macros",
              data: [this.props.dailyMacros.carbohydrates, this.props.dailyMacros.fat, this.props.dailyMacros.protein],
              // backgroundColor: ["#2ADECE", "#DD3B79", "#FF766B"]
              backgroundColor: ["#2BC700", "#AB0091", "#F76319"]

            }
          ],
          labels: ["Carbohydrates", "Fat", "Protein"],
        },
        options: {
          cutoutPercentage: 65,
          legend: {
            display: false
          }
        }
      })
    }
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
