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

class carDetails1 extends Component {
  state = {
    isLogin: true,
    isSplit: false,
    spinner: true,
    responseDatas: null,
    show: false,
    src:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    vdInstance: null,
    columns: [
      {
        id: 0,
        isSensorHidden: false,
        streamData: [],
        activeUrl: ""
      }
    ]
  };
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

      this.setState({ responseDatas: response.data });

      // update streamData inside columns
      const columns = [...this.state.columns];
      // If incident use responseDatas.streamData or responseDatas[0].streamData
      // Main data used as a default
      const mainIndex = _.findIndex(this.state.responseDatas, {
        nodeType: "Main"
      });
      columns[0].streamData = this.state.responseDatas[mainIndex].streamData;
      // find default video index;
      let defaultIndex = _.findIndex(columns[0].streamData, {
        name: "vin121212_cam1"
      });
      // set activeUrl to show video in default
      columns[0].activeUrl = this.state.responseDatas[mainIndex].streamData[
        defaultIndex
      ].url;
      this.setState({ columns });
      // throw "something went wrong from cardetails api";
    } catch (error) {
      console.log(error);
    }
  };

  splitLayout() {
    const collideIndex = _.findIndex(this.state.responseDatas, {
      nodeType: "Collide"
    });
    const defaultIndex = _.findIndex(
      this.state.responseDatas[collideIndex].streamData,
      {
        name: "vin123456_cam1"
      }
    );

    const columns = [
      ...this.state.columns,
      {
        id: 1,
        isSensorHidden: false,
        streamData: this.state.responseDatas[collideIndex].streamData,
        activeUrl: this.state.responseDatas[collideIndex].streamData[
          defaultIndex
        ].url
      }
    ];
    this.setState({ columns });
    this.isSplit = true;
    this.resetVideo(this.state.vdInstance);
  }

  resetVideo(video) {
    if (video) {
      video.pause();
      video.currentTime(0);
      video.load();
    }
  }

  setVdInstance(player) {
    console.log("instance ....");
    this.setState({ vdInstance: player });
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

  renderVideoDOM(columns) {
    if (columns.length > 0) {
      return columns.map((column, i) => {
        console.log("columns");
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

  render() {
    const { isSplit } = this;
    console.log("render");
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
              splitHor: isSplit
            })}
          >
            {/* {this.state.columns.map((column, i) => {
              if (column.streamData.length > 0) {
                return (
                  <div key={i} className="flex-half ">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="video-section d-flex box-shadow">
                          <div className="hdr">
                            <button
                              onClick={event => this.toggleCamras(event, i)}
                            >
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
                              playerInstance={player =>
                                this.setVdInstance(player)
                              }
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
            })} */}
            {this.renderVideoDOM(this.state.columns)}
          </div>

          <div className="row gap-row graphs">
            <div className="col-sm-4">
              <div className="box-shadow">sss</div>
            </div>
            <div className="col-sm-4">
              <div className="box-shadow">sss</div>
            </div>
            <div className="col-sm-4">
              <div className="box-shadow">sss</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default carDetails1;
