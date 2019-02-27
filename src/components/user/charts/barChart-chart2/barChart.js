import React, { Component } from "react";
import Charts from "./chart";
import "../_chart.scss";

class barChart extends Component {
  state = {};
  constructor() {
    super();
    this.state = {
      chartData: {}
    };
  }

  componentWillMount() {
    this.getChartData();
  }

  getChartData() {
    this.setState({
      chartData: {
        labels: ["00-04", "05-08", "09-12", "13-16", "17-20", "21+"],
        datasets: [
          {
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
          },
          {
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
          }
        ]
      }
    });
  }

  render() {
    return (
      <div className="barCharts">
        <Charts chartData={this.state.chartData} />
      </div>
    );
  }
}

export default barChart;
