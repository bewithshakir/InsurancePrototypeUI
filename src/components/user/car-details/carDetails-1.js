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
    this.getCarDetails(121212);
  }
  componentDidMount() {
    // this.getCarDetails(121212);
  }
  getCarDetails = async vin => {
    try {
      const response = await carDetailApi.get(`/collidecar/${vin}`);

      // Main data used as a default
      const mainIndex = _.findIndex(response.data, {
        nodeType: "Main"
      });

      response.data.forEach(object => {
        if (object.streamData.length > 0) {
          // update streamData inside columns
          const columns = [...this.state.columns];
          columns[0].streamData = response.data[mainIndex].streamData;

          // find default video index;
          let defaultIndex = _.findIndex(columns[0].streamData, {
            name: "vin121212_cam1"
          });
          // set activeUrl to show video in default
          columns[0].activeUrl =
            response.data[mainIndex].streamData[defaultIndex].url;

          this.setState({ responseDatas: response.data, columns });
        }
      });

      // throw "something went wrong from cardetails api";
    } catch (error) {
      console.log(error);
    }
  };

  splitLayout() {
    // const collideIndex = _.findIndex(this.state.responseDatas, {
    //   nodeType: "Collide"
    // });
    // const defaultIndex = _.findIndex(
    //   this.state.responseDatas[collideIndex].streamData,
    //   {
    //     name: "vin123456_cam1"
    //   }
    // );

    // const columns = [
    //   ...this.state.columns,
    //   {
    //     id: 1,
    //     isSensorHidden: false
    //   }
    // ];
    // this.setState({ columns });
    this.setState({ isSplit: !this.state.isSplit });
    // this.resetVideo(this.state.vdInstance);
  }

  resetVideo(videos) {
    if (videos) {
      videos[0].pause();
      videos[1].pause();

      videos[0].currentTime(0);
      videos[1].currentTime(1);

      videos[0].load();
      videos[1].load();
    }
  }

  setVdInstance(player) {
    this.players.push(player);
    this.setState({ vdInstance: this.players });
  }

  toggleCamras(event, index) {
    // const columns = [...this.state.columns];
    // columns[index].isSensorHidden = !this.state.columns[index].isSensorHidden;
    // this.setState({ columns });
    this.showCamra = true;
    console.log("index", index);
    this.setState({ show: true });
  }

  onCamraClick(camraName, column) {
    //vin123456_cam1
    const id = column.id;

    // Find active video index
    const currentIndex = _.findIndex(column.streamData, { name: camraName });

    // Update video url on camra click
    const columns = [...this.state.columns];
    columns[id].activeUrl = columns[id].streamData[currentIndex].url;
    this.setState({ columns });
  }

  resetPlayBtn = () => {
    // this.setState({ resetPlay: true });
  };

  renderVideoDOM(columns) {
    if (columns.length > 0) {
      return columns.map((column, i) => {
        if (column.streamData.length > 0) {
          return (
            <div key={i} className="flex-half ">
              <div className="row">
                <div className="col-sm-12">
                  <div className="video-section d-flex box-shadow">
                    <div className="hdr">
                      <button onClick={event => this.toggleCamras(event, i)}>
                        Select View
                      </button>
                      <span>VIN: 123456</span>
                    </div>
                    <div
                      className={classnames("car-info", {
                        car_hidden: this.state.show
                      })}
                    >
                      <div className="car-bg">
                        <div className="car-img">
                          <img src={carImg} />
                          {column.streamData.map((data, j) => (
                            <span
                              key={data.name}
                              className={`sensor pos-${j}`}
                              onClick={() =>
                                this.onCamraClick(data.name, column)
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="video-wrapper">
                      <VideoPlayer
                        src={column.activeUrl}
                        id={"player-" + column.id}
                        playerInstance={player => this.setVdInstance(player)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div key={i} className="spinner-bg">
              <img src={SpinnerImg} />
            </div>
          );
        }
      });
    }
  }

  renderVideoWrapper(data) {
    if (data) {
      console.log("data", data);
      // const mainData = data[]
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header isAuthorized={this.state.isLogin} />
        <div className="container-fluid car-details-1">
          <h2>Car Information Details</h2>
          {/* <button onClick={e => this.change(e, 0)}>change</button> */}
          <div className="graph-section box-shadow gap-row">Google Map</div>
          {/* control bar */}
          <div className="box-shadow control-bar gap-row ">
            {this.state.vdInstance && (
              <VideoControlBar
                videoPlayers={this.state.vdInstance}
                className=""
                isSplit={this.state.isSplit}
              />
            )}

            <button
              onClick={e => this.splitLayout()}
              className="split-icon"
              disabled={
                this.state.responseDatas
                  ? !this.state.responseDatas[0].collide
                  : false
              }
            >
              Split
            </button>
          </div>

          <div
            className={classnames("d-flex split-sect gap-row", {
              splitHor: this.state.isSplit
            })}
          >
            {this.renderVideoWrapper(this.state.responseDatas)}
            {/* <VideoWrapper
              currentVdData={
                this.state.responseDatas
                  ? this.state.responseDatas[0].streamData[0]
                  : null
              }
              id="0"
              setVdInstance={player => this.setVdInstance(player)}
              streamData={
                this.state.responseDatas
                  ? this.state.responseDatas[0].streamData
                  : []
              }
              onReset={this.resetPlayBtn}
            /> */}
            {/* <VideoWrapper
              currentVdData={
                this.state.responseDatas
                  ? this.state.responseDatas[1].streamData[1]
                  : null
              }
              id="1"
              setVdInstance={player => this.setVdInstance(player)}
              streamData={
                this.state.responseDatas
                  ? this.state.responseDatas[1].streamData
                  : []
              }
              onReset={this.resetPlayBtn}
            /> */}
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
