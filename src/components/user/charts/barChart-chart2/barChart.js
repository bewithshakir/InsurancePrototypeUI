import React, { Component } from "react";
import Charts from "./chart";
import "../_chart.scss";

import { Bar } from "react-chartjs-2";

class barChart extends Component {
  state = {};
  constructor() {
    super();
    this.state = {
      chartData: {}
    };
  }

  componentWillMount() {
    console.log("in the Bar chart props flag", this.props.showTwoCharts);
    this.getChartData(this.props.showTwoCharts);
  }

  componentWillReceiveProps = nextprops => {
    this.getChartData(nextprops.showTwoCharts);
  };

  getChartData(flag) {
    const dataFirst = {
      label: "Car 1",
      data: [20, 12, 8, 20, 12, 8],
      backgroundColor: [
        "#50e3c2",
        "#50e3c2",
        "#50e3c2",
        "#50e3c2",
        "#50e3c2",
        "#50e3c2"
      ]
    };
    const dataSecond = {
      label: "Car 2",
      data: [12, 20, 15, 14, 13, 9],
      backgroundColor: [
        "#2087ff",
        "#2087ff",
        "#2087ff",
        "#2087ff",
        "#2087ff",
        "#2087ff"
      ]
    };

    let dataSets = [];
    if (flag.showChartsForCar1 && !flag.showChartsForCar2) {
      dataSets = [dataFirst];
    } else if (!flag.showChartsForCar1 && flag.showChartsForCar2) {
      dataSets = [dataSecond];
    } else if (flag.showChartsForCar1 && flag.showChartsForCar2) {
      dataSets = [dataFirst, dataSecond];
    }

    // const dataSets = flag === 2 ? [dataFirst, dataSecond] : [dataFirst];
    // const dataSets = [dataFirst, dataSecond];
    const data = {
      labels: ["00-04", "05-08", "09-12", "13-16", "17-20", "21+"],
      datasets: dataSets
    };
    this.setState({
      chartData: data
    });
  }

  render() {
    return (
      <div className="barCharts">
        <div className=" bar-chart-header">Break Frequency</div>
        <div className=" bar-chart-container">
          <Bar
            data={this.state.chartData}
            height={160}
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
      </div>
    );
  }
}

export default barChart;
