import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData
    };
  }

  static defaultProps = {
    displayTitle: true
  };

  render() {
    return (
      <React.Fragment>
        <div className=" bar-chart-header">Break Frequency</div>
        <div className=" bar-chart-container">
          <Bar
            data={this.state.chartData}
            height={275}
            options={{
              legend: {
                display: true,
                position: "bottom",
                labels: {
                  boxWidth: 10,
                  fontSize: 14
                }
              },
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      stepSize: 10,
                      min: 0,
                      max: 30,
                      padding: 5,
                      color: "#ffffff",
                      callback: function(value) {
                        return ((value / 100) * 100).toFixed(0) + " KPH";
                      }
                    },
                    scaleLabel: {
                      display: true,
                      labelString: "Speed",
                      fontSize: 14
                    },
                    gridLines: {
                      drawBorder: true,
                      color: "#ffffff"
                    }
                  }
                ],
                xAxes: [
                  {
                    gridLines: {
                      // offsetGridLines: true,
                      display: true,
                      color: "#ffffff"
                    },
                    ticks: {
                      // labelOffset: 10
                    },
                    scaleLabel: {
                      display: true,
                      labelString: "Range",
                      fontSize: 14
                    }
                  }
                ]
              },
              animation: {
                duration: 0,
                animateRotate: false,
                animateScale: false
              }
            }}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Charts;
