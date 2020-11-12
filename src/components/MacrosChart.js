import React, { Component } from 'react';
import Chart from 'chart.js';

class MacrosChart extends Component {

  state = {
    loaded: false
  };

  componentDidMount() {
    this.setState({
      loaded: true
    });
  };

  renderMacrosChart = () => {
    let elementId = ""
    if (this.props.macros.meal === "breakfast") {
      elementId = "breakfast-macros-chart"
    } else if (this.props.macros.meal === "lunch") {
      elementId = "lunch-macros-chart"
    } else if (this.props.macros.meal === "dinner") {
      elementId = "dinner-macros-chart"
    } else if (this.props.macros.meal === "snacks") {
      elementId = "snacks-macros-chart"
    } else {
      elementId = "macros-chart"
    };

    const ctx = document.getElementById(elementId).getContext("2d");

    if (this.props.macros.carbohydrates === 0 && this.props.macros.fat === 0 && this.props.macros.protein === 0) {
      new Chart(ctx, {
        type: "doughnut",
        data: {
          datasets: [
            {
              label: "Macros",
              data: [100],
              backgroundColor: ["#E6EBF2"],
              borderWidth: 0
            }
          ],
        },
        options: {
          cutoutPercentage: 77,
          legend: {
            display: false
          },
          events: null,
          animation: null
        }
      })
    } else {
      new Chart(ctx, {
        type: "doughnut",
        data: {
          datasets: [
            {
              label: "Macros",
              data: [this.props.macros.carbohydrates, this.props.macros.fat, this.props.macros.protein],
              backgroundColor: ["#01ACAD", "#A2218E", "#F9A51B"]

            }
          ],
          labels: ["Carbohydrates", "Fat", "Protein"],
        },
        options: {
          cutoutPercentage: 75,
          legend: {
            display: false
          }
        }
      });
    };
  };

  render() {
    return (
      <div>
        { !!this.state.loaded ?
          this.renderMacrosChart()
        :
          null
        }
      </div>
    );
  };
};

export default MacrosChart;
