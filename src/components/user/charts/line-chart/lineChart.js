import React from "react";
import { Line } from "react-chartjs-2";

import "../_chart.scss";

export default class lineChart extends React.Component {
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
      lineTension: 0.0,
      backgroundColor: "#50e3c2",
      borderColor: "#50e3c2",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "#50e3c2",
      pointBackgroundColor: "#50e3c2",
      pointBorderWidth: 5,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#50e3c2",
      pointHoverBorderColor: "rgb(220,220,220)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55]
    };
    const dataSecond = {
      label: "Car 2",
      fill: false,
      lineTension: 0.0,
      backgroundColor: "#2087ff",
      borderColor: "#2087ff",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "#2087ff",
      pointBackgroundColor: "#2087ff",
      pointBorderWidth: 5,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#2087ff",
      pointHoverBorderColor: "#2087ff",
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
        <div className="line-chart-header">Anomaly Detection</div>
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
                      labelString: "Year",
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
                        return ((value / 100) * 100).toFixed(0) + "%";
                      }
                    },
                    scaleLabel: {
                      display: true,
                      labelString: "Engine Health",
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
