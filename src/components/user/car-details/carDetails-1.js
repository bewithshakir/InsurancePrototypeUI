import React, { Component } from "react";
import classnames from "classnames";
import _ from "lodash";
import SpinnerImg from "../../../assets/images/spinner-gif.gif";

import "./carDetail1.scss";
import Header from "../../../shared/header/header";
import carImg from "../../../assets/images/car.png";
import VideoPlayer from "../car-video/VideoPlayer";
import VideoControlBar from "../../video-control-bar/VideoControlBar";
import carDetailApi from "../../../apis/carDetailApi";
import VideoWrapper from "../car-video/VideoWrapper";
import DonutChart from "./../charts/donut-chart/donut_Chart";
import BarChart from "./../charts/barChart-chart2/barChart";
import LineChart from "./../charts/line-chart/lineChart";
import LineChartWithTime from "./../charts/line-chart2/lineChartWithTime";
import playImg from "../../../assets/images/Play_button.png";

class carDetails1 extends Component {
  state = {
    isLogin: true,
    isSplit: false,
    spinner: true,
    responseDatas: null,
    show: false,
    src:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    vdInstance: [],
    columns: [
      {
        id: 0,
        isSensorHidden: false
      }
    ],
    resetPlay: false
  };
  players = [];
  showCamra = false;
  componentWillMount() {
    const { vin } = this.props.match.params;
    this.getCarDetails(+vin);
  }
  getCarDetails = async vin => {
    try {
      const response = await carDetailApi.get(`/collidecar/${vin}`);
      this.setState({ responseDatas: response.data });
      // throw "something went wrong from cardetails api";
    } catch (error) {
      console.log(error);
    }
  };

  splitLayout() {
    this.setState({ isSplit: !this.state.isSplit });
    this.resetVideo(this.state.vdInstance);
  }

  setVdInstance(player) {
    this.players.push(player);
    this.setState({ vdInstance: this.players });
  }

  toggleCamras(event, index) {
    this.showCamra = true;
    this.setState({ show: true });
  }

  onCamraChange(data) {
    this.resetVideo(this.state.vdInstance);
  }

  resetVideo(videos) {
    if (videos.length > 0) {
      videos.forEach(video => {
        video.pause();
        video.currentTime(0);
        video.trigger("loadstart");
      });
      const elem = document.getElementById("playBtn");
      elem.style.backgroundImage = `url(${playImg})`;
    }
  }

  renderVideoWrapper(data) {
    if (data) {
      console.log("data", data);
      return data.map((videoData, i) => {
        return (
          <VideoWrapper
            key={i}
            streamData={videoData.streamData}
            id={i}
            setVdInstance={player => this.setVdInstance(player)}
            isSplitActive={this.state.isSplit}
            vidId={videoData.carData[0].vin}
            onCamraChange={data => this.onCamraChange(data)}
          />
        );
      });
    }
  }

  // Add class 'mainCtrl' if streamData is empty
  setMainCtrlClass(isSplit, streamData) {
    console.log("set main control class executed");
    const controlBarElem = document.getElementById("control-bar");
    if (isSplit) {
      controlBarElem.classList.remove("mainCtrl");
    } else {
      if (streamData.length === 0) {
        controlBarElem.classList.add("mainCtrl");
      }
    }
  }
  render() {
    let mainIndex;
    if (this.state.responseDatas) {
      mainIndex = _.findIndex(this.state.responseDatas, {
        nodeType: "Main"
      });
      if (this.state.responseDatas[mainIndex].streamData.length === 0) {
        this.setMainCtrlClass(
          this.state.isSplit,
          this.state.responseDatas[mainIndex].streamData
        );
      }
    }

    return (
      <React.Fragment>
        <Header isAuthorized={this.state.isLogin} />
        <div className="container-fluid car-details-1">
          <h2>Car Information Details</h2>
          <div className="graph-section box-shadow gap-row">Google Map</div>
          {/* control bar */}
          <div
            id="control-bar"
            className={classnames("box-shadow control-bar gap-row")}
          >
            {this.state.vdInstance.length > 0 && (
              <React.Fragment>
                <VideoControlBar
                  videoPlayers={this.state.vdInstance}
                  isSplit={this.state.isSplit}
                />
                <button
                  onClick={e => this.splitLayout()}
                  className="split-icon"
                  disabled={
                    this.state.responseDatas
                      ? !this.state.responseDatas[mainIndex].collide
                      : false
                  }
                >
                  Split
                </button>
              </React.Fragment>
            )}
          </div>

          <div
            className={classnames("d-flex split-sect gap-row", {
              splitHor: this.state.isSplit
            })}
          >
            {this.renderVideoWrapper(this.state.responseDatas)}
          </div>

          <div className="row gap-row graphs charts" id="charts">
            <div className="col-sm-4">
              <div className="box-shadow donutChart">
                <LineChartWithTime />
              </div>
            </div>
            <div className="col-sm-4">
              <div className="box-shadow barChart">
                <BarChart />
              </div>
            </div>
            <div className="col-sm-4">
              <div className="box-shadow lineChart">
                <LineChart />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default carDetails1;
