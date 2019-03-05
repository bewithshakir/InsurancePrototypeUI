import React from "react";
import { Line } from "react-chartjs-2";

import "../_chart.scss";

export default class lineChartWithTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lineChartData: {}
    };
  }

  componentWillMount() {
    console.log("in the line chart props flag", this.props.showTwoCharts);
    this.getLineChartData(this.props.showTwoCharts);
  }

  getLineChartData(flag) {
    const dataFirst = {
      label: "Car 1",
      fill: false,
      lineTension: 0.3,
      backgroundColor: "#50e3c2",
      borderColor: "#50e3c2",
      borderCapStyle: "square",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "bevel",
      pointBorderColor: "#50e3c2",
      pointBackgroundColor: "#50e3c2",
      pointBorderWidth: 5,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#50e3c2",
      pointHoverBorderColor: "#50e3c2",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 36, 80, 42, 66, 29]
    };
    const dataSecond = {
      label: "Car 2",
      fill: false,
      lineTension: 0.3,
      backgroundColor: "#2087ff",
      borderColor: "#2087ff",
      borderCapStyle: "square",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "bevel",
      pointBorderColor: "#2087ff",
      pointBackgroundColor: "#2087ff",
      pointBorderWidth: 5,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#2087ff",
      pointHoverBorderColor: "#2087ff",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [81, 46, 65, 35, 54, 80]
    };

    let dataSets = [];
    if (flag.showChartsForCar1 && !flag.showChartsForCar2) {
      dataSets = [dataFirst];
    } else if (!flag.showChartsForCar1 && flag.showChartsForCar2) {
      dataSets = [dataSecond];
    } else if (flag.showChartsForCar1 && flag.showChartsForCar2) {
      dataSets = [dataFirst, dataSecond];
    }
    const data = {
      labels: ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00"],
      datasets: dataSets
    };
    this.setState({
      lineChartData: data
    });
  }
  componentWillReceiveProps = nextprops => {
    this.getLineChartData(nextprops.showTwoCharts);
  };

  render() {
    // Chart.plugins.register({
    //   afterUpdate: function(chart) {
    //     let offset = 17;
    //     let model = null;
    //     for (let i = 0; i < chart.config.data.datasets.length; i++) {
    //       for (let j = 0; j < chart.config.data.datasets[i].data.length; j++) {
    //         model = chart.config.data.datasets[i]._meta[0].data[j]._model;
    //         model.x += offset;
    //         model.controlPointNextX += offset;
    //         model.controlPointPreviousX += offset;
    //       }
    //     }
    //   }
    // });
    return (
      <React.Fragment>
        <div className="line-chart-header">Engine Temperature</div>
        <div className="line-chart-container">
          <Line
            data={this.state.lineChartData}
            options={{
              legend: {
                display: true,
                position: "bottom",
                labels: { boxWidth: 10 }
              },
              responsive: true,
              animation: false,
              scales: {
                xAxes: [
                  {
                    gridLines: {
                      // offsetGridLines: true,
                      display: true,
                      color: "#ffffff"
                    },
                    scaleLabel: {
                      display: true,
                      labelString: "Time",
                      fontSize: 14
                    },
                    ticks: {
                      // labelOffset: 10
                    }
                  }
                ],
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      stepSize: 20,
                      max: 100,
                      padding: 10,
                      fontSize: 13,
                      color: "#ffffff",
                      callback: function(value) {
                        return ((value / 100) * 40).toFixed(0) + "c";
                      }
                    },
                    scaleLabel: {
                      display: true,
                      labelString: "Temperature",
                      fontSize: 14
                    },
                    gridLines: {
                      drawBorder: true,
                      color: "#ffffff"
                    }
                  }
                ]
              }
            }}
          />
        </div>
      </React.Fragment>
    );
  }
}
