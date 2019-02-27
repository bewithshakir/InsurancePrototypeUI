import React, { Component } from "react";
import classnames from "classnames";

import carImg from "../../../assets/images/car.png";

export default class CamraWrapper extends Component {
  state = {
    show: false,
    streamData: [],
    activeCamra: false
  };
  componentDidMount() {
    this.setState({ streamData: this.props.streamData });
  }

  toggleCamras(event) {
    this.setState({ show: !this.state.show });
  }
  onCamraClick(camraName, data) {
    this.props.onCamraChange(data);
  }
  // Add class 'active' on camra when user click on it
  setActiveClass(event, vidId) {
    const allSensorEle1 = document.querySelectorAll(
      "#camra-wrapper-0 .car-img .sensor"
    );
    const allSensorEle2 = document.querySelectorAll(
      "#camra-wrapper-1 .car-img .sensor"
    );

    if (vidId === 121212) {
      allSensorEle1.forEach((ele, i) => {
        ele.classList.remove("active");
      });
    } else if (vidId === 123456) {
      allSensorEle2.forEach((ele, i) => {
        ele.classList.remove("active");
      });
    }
    event.target.classList.add("active");
  }
  render() {
    const { vidId } = this.props;
    return (
      <React.Fragment>
        <div className="hdr">
          <button onClick={event => this.toggleCamras(event)}>
            Select View
          </button>
          <span>VIN: {vidId}</span>
        </div>
        <div
          className={classnames("car-info", {
            car_hidden: this.state.show
          })}
        >
          <div className="car-bg">
            <div className="car-img">
              <img src={carImg} />
              {this.state.streamData.map((data, i) => {
                return (
                  <span
                    key={i}
                    className={classnames(`sensor pos-${i}`, {
                      active: i == 0
                    })}
                    onClick={e => {
                      this.onCamraClick(data.name, data);
                      this.setActiveClass(e, vidId);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
