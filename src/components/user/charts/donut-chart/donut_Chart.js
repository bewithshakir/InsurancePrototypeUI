import React from "react";
import { Doughnut, Chart } from "react-chartjs-2";
import "../_chart.scss";

export default class DonutWithText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      donutChartData: {}
    };
  }

  getDonutChartData() {
    this.setState({
      donutChartData: {
        labels: ["Safe", "Rash", "Moderate"],
        datasets: [
          {
            data: [22, 6, 10],
            label: "Car 1",
            backgroundColor: [
              "rgb(0, 228, 228)",
              "rgb(255, 00, 00)",
              "rgb(255,191,0)"
            ],
            hoverBackgroundColor: [
              "rgb(0, 228, 228)",
              "rgb(255, 00, 00)",
              "rgb(255,191,0)"
            ]
          },
          {
            data: [16, 9, 13],
            label: "Car 2",
            backgroundColor: [
              "rgb(0, 228, 228)",
              "rgb(255, 00, 00)",
              "rgb(255,191,0)"
            ],
            hoverBackgroundColor: [
              "rgb(0, 228, 228)",
              "rgb(255, 00, 00)",
              "rgb(255,191,0)"
            ]
          }
        ],
        text: "38 Trips"
      }
    });
  }

  componentDidMount() {
    this.getDonutChartData();
  }
  render() {
    const data = this.state.donutChartData;
    let originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
    Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
      draw: function() {
        originalDoughnutDraw.apply(this, arguments);

        let chart = this.chart;
        let width = chart.chart.width,
          height = chart.chart.height,
          ctx = chart.chart.ctx;

        let fontSize = 1;
        ctx.font = fontSize + "em sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.textBaseline = "middle";

        let text = chart.config.data.text,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = 80;

        ctx.fillText(text, textX, textY);
      }
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 donut-chart-header">Trip Analysis</div>
          <div className="col-md-12 donut-chart-container">
            <Doughnut
              data={this.state.donutChartData}
              options={{
                legend: {
                  display: false,
                  position: "bottom",
                  labels: {
                    boxWidth: 10,
                    fontSize: 14
                  }
                },
                cutoutPercentage: 70,
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                legend: {
                  display: true,
                  position: "bottom",
                  labels: {
                    boxWidth: 10,
                    fontSize: 14
                  }
                },
                hover: { intersect: false },
                tooltips: {
                  callbacks: {
                    label: function(item, data) {
                      return (
                        data.datasets[item.datasetIndex].label +
                        ": " +
                        data.labels[item.index] +
                        ": " +
                        data.datasets[item.datasetIndex].data[item.index]
                      );
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
