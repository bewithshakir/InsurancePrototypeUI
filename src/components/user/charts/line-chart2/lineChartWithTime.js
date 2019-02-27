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

  getLineChartData() {
    const dataFirst = {
      label: "Car 1",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgb(75,192,192)",
      borderColor: "rgb(75,192,192)",
      borderCapStyle: "square",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "bevel",
      pointBorderColor: "rgb(75,192,192)",
      pointBackgroundColor: "rgb(75,192,192)",
      pointBorderWidth: 5,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgb(75,192,192)",
      pointHoverBorderColor: "rgb(220,220,220)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55]
    };
    const dataSecond = {
      label: "Car 2",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgb(255,69,0)",
      borderColor: "rgb(255,69,0)",
      borderCapStyle: "square",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "bevel",
      pointBorderColor: "rgb(255,69,0)",
      pointBackgroundColor: "rgb(255,69,0)",
      pointBorderWidth: 5,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgb(255,69,0)",
      pointHoverBorderColor: "rgb(255,69,0)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [81, 46, 55, 65, 72, 80]
    };

    const data = {
      labels: ["2013", "2014", "2015", "2016", "2017", "2018"],
      datasets: [dataFirst, dataSecond]
    };
    this.setState({
      lineChartData: data
    });
  }

  componentDidMount() {
    this.getLineChartData();
  }

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
