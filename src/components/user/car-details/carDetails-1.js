import React, { Component } from "react";
import classnames from "classnames";
import _ from "lodash";

import "./carDetail1.scss";
import Header from "../../../shared/header/header";
import VideoControlBar from "../../video-control-bar/VideoControlBar";
import carDetailApi from "../../../apis/carDetailApi";
import VideoWrapper from "../car-video/VideoWrapper";
import BarChart from "./../charts/barChart-chart2/barChart";
import LineChart from "./../charts/line-chart/lineChart";
import LineChartWithTime from "./../charts/line-chart2/lineChartWithTime";
import playImg from "../../../assets/images/Play_button.png";
import Spinner from "../../spinner/Spinner";

import {
  GoogleMap,
  GetMap,
  setRoutes,
  startAnimation,
  stopMovement,
  startMovement,
  startmap,
  resetMap,
  getTimeVal
} from "./../Google-Map/googleMapRoute";
import { parse } from "querystring";

class carDetails1 extends Component {
  state = {
    chartFlag: false,
    isLogin: true,
    isSplit: false,
    spinner: false,
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
    resetPlay: false,
    showNumberOfCharts: 0,
    showCharts: {
      showChartsForCar1: false,
      showChartsForCar2: false
    }
  };
  players = [];
  showCamra = false;
  CarInstancesList = [];
  componentWillMount() {
    const { vin } = this.props.match.params;
    this.getCarDetails(+vin);
  }

  componentDidMount() {
    //Initialize Map
    startmap();
    const { vin } = this.props.match.params;
    this.getCarDetailsForCharts(+vin);
  }

  // getCarDetailsForCharts = async vin => {
  //   try {
  //     const response = await carDetailApi.get(`/collidecar/${vin}`);
  //     let mainIndex = _.findIndex(response.data, {
  //       nodeType: "Main"
  //     });
  //     let collideIndex = _.findIndex(response.data, {
  //       nodeType: "Collide"
  //     });
  //     console.log(
  //       "in the car details response data collideIndex",
  //       response.data[collideIndex]
  //     );
  //     console.log(
  //       "in the car details response data mainIndex",
  //       response.data[mainIndex]
  //     );
  //     if (
  //       response.data[mainIndex] &&
  //       response.data[mainIndex].carSpeedData.length > 0 &&
  //       !(
  //         response.data[collideIndex] &&
  //         response.data[collideIndex].carSpeedData.length > 0
  //       )
  //     ) {
  //       this.setState({
  //         showNumberOfCharts: 1,
  //         showCharts: {
  //           showChartsForCar1: true,
  //           showChartsForCar2: false
  //         }
  //       });
  //     } else if (
  //       !(
  //         response.data[mainIndex] &&
  //         response.data[mainIndex].carSpeedData.length > 0
  //       ) &&
  //       (response.data[collideIndex] &&
  //         response.data[collideIndex].carSpeedData.length > 0)
  //     ) {
  //       this.setState({
  //         showNumberOfCharts: 1,
  //         showCharts: {
  //           showChartsForCar2: true,
  //           showChartsForCar1: false
  //         }
  //       });
  //     } else if (
  //       response.data[mainIndex] &&
  //       response.data[mainIndex].carSpeedData.length > 0 &&
  //       (response.data[collideIndex] &&
  //         response.data[collideIndex].carSpeedData.length > 0)
  //     ) {
  //       this.setState({
  //         showNumberOfCharts: 2,
  //         showCharts: {
  //           showChartsForCar2: true,
  //           showChartsForCar1: true
  //         }
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  getCarDetailsForCharts = async vin => {
    if (this.responseDatas) {
      // const response = await carDetailApi.get(`/collidecar/${vin}`);
      let mainIndex = _.findIndex(this.responseDatas, {
        nodeType: "Main"
      });
      let collideIndex = _.findIndex(this.responseDatas, {
        nodeType: "Collide"
      });
      console.log(
        "in the car details response data collideIndex",
        this.responseDatas[collideIndex]
      );
      console.log(
        "in the car details response data mainIndex",
        this.responseDatas[mainIndex]
      );
      if (
        this.responseDatas[mainIndex] &&
        this.responseDatas[mainIndex].carSpeedData.length > 0 &&
        !(
          this.responseDatas[collideIndex] &&
          this.responseDatas[collideIndex].carSpeedData.length > 0
        )
      ) {
        this.setState({
          showNumberOfCharts: 1,
          showCharts: {
            showChartsForCar1: true,
            showChartsForCar2: false
          }
        });
      } else if (
        !(
          this.responseDatas[mainIndex] &&
          this.responseDatas[mainIndex].carSpeedData.length > 0
        ) &&
        (this.responseDatas[collideIndex] &&
          this.responseDatas[collideIndex].carSpeedData.length > 0)
      ) {
        this.setState({
          showNumberOfCharts: 1,
          showCharts: {
            showChartsForCar2: true,
            showChartsForCar1: false
          }
        });
      } else if (
        this.responseDatas[mainIndex] &&
        this.responseDatas[mainIndex].carSpeedData.length > 0 &&
        (this.responseDatas[collideIndex] &&
          this.responseDatas[collideIndex].carSpeedData.length > 0)
      ) {
        this.setState({
          showNumberOfCharts: 2,
          showCharts: {
            showChartsForCar2: true,
            showChartsForCar1: true
          }
        });
      }
    }
  };

  getCarDetails = async vin => {
    try {
      const response = await carDetailApi.get(`/collidecar/${vin}`);
      this.setState({ responseDatas: response.data });
      let googleMapRouteList = this.initializeMap();
      console.log(
        "googleMapRouteList>>>>>>>>>>>> on page load",
        googleMapRouteList
      );

      this.createRoutesOnGMAP(googleMapRouteList);
      this.CarInstancesList = googleMapRouteList;

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
    resetMap();
    console.log("responseDatas>>>>>>>>>", this.state.responseDatas);
    this.CarInstancesList = [];
    startmap();
    let googleMapRouteList = this.initializeMap();
    console.log("googleMapRouteList>>>>>>>>>>>>", googleMapRouteList);

    this.createRoutesOnGMAP(googleMapRouteList);
    this.CarInstancesList = googleMapRouteList;

    this.resetVideo(this.state.vdInstance);

    //startAnimation.call(car1, 0);
    //let timeout = setTimeout(startAnimation.call(car2, 0), 10000);
    //timeout.cancel();
  }

  initializeMap() {
    this.googleMapObjList = [];
    console.log(
      "this.state.responseDatas inside initializeMap",
      this.state.responseDatas
    );
    // let cardata = [
    //   {
    //     vin: "121212",
    //     dateTime: "2019-02-05T17:22:32Z",
    //     latitude: "37.388467",
    //     longitude: "-122.008963"
    //   },
    //   {
    //     vin: "121212",
    //     dateTime: "2019-02-05T17:23:32Z",
    //     latitude: "37.388249",
    //     longitude: "-122.008637"
    //   },
    //   {
    //     vin: "121212",
    //     dateTime: "2019-02-05T17:24:32Z",
    //     latitude: "37.388267",
    //     longitude: "-122.008251"
    //   },
    //   {
    //     vin: "121212",
    //     dateTime: "2019-02-05T17:25:32Z",
    //     latitude: "37.388335",
    //     longitude: "-122.007779"
    //   },
    //   {
    //     vin: "121212",
    //     dateTime: "2019-02-05T17:26:32Z",
    //     latitude: "37.388215",
    //     longitude: "-122.007435"
    //   },
    //   {
    //     vin: "121212",
    //     dateTime: "2019-02-05T17:27:32Z",
    //     latitude: "37.388266",
    //     longitude: "-122.006985"
    //   },
    //   {
    //     vin: "121212",
    //     dateTime: "2019-02-05T17:28:32Z",
    //     latitude: "37.388318",
    //     longitude: "-122.006513"
    //   },
    //   {
    //     vin: "121212",
    //     dateTime: "2019-02-05T17:29:32Z",
    //     latitude: "37.388266",
    //     longitude: "-122.005933"
    //   },
    //   {
    //     vin: "121212",
    //     dateTime: "2019-02-05T17:30:32Z",
    //     latitude: "37.388283",
    //     longitude: "-122.005418"
    //   },
    //   {
    //     vin: "121212",
    //     dateTime: "2019-02-05T17:31:32Z",
    //     latitude: "37.388437",
    //     longitude: "-122.004817"
    //   },
    //   {
    //     vin: "121212",
    //     dateTime: "2019-02-05T17:32:32Z",
    //     latitude: "37.388590",
    //     longitude: "-122.004774"
    //   },
    //   {
    //     vin: "121212",
    //     dateTime: "2019-02-05T17:33:32Z",
    //     latitude: "37.388812",
    //     longitude: "-122.004774"
    //   },
    //   {
    //     vin: "121212",
    //     dateTime: "2019-02-05T17:34:32Z",
    //     latitude: "37.389102",
    //     longitude: "-122.004796"
    //   },
    //   {
    //     vin: "121212",
    //     dateTime: "2019-02-05T17:35:32Z",
    //     latitude: "37.389374",
    //     longitude: "-122.004409"
    //   },
    //   {
    //     vin: "121212",
    //     dateTime: "2019-02-05T17:36:32Z",
    //     latitude: "37.389374",
    //     longitude: "-122.004409"
    //   },
    //   {
    //     vin: "121212",
    //     dateTime: "2019-02-05T17:37:32Z",
    //     latitude: "37.389405",
    //     longitude: "-122.004295"
    //   }
    // ];

    if (this.state.responseDatas && this.state.responseDatas.length > 0) {
      _.forEach(this.state.responseDatas, (data, i) => {
        if (data.gpsData && data.gpsData.length > 0) {
          this.googleMapObjList[i] = new GoogleMap();
          this.googleMapObjList[i].cardata = data.gpsData.map(item => {
            return {
              lat: parseFloat(item.latitude),
              lng: parseFloat(item.longitude)
            };
          });
          console.log(
            "this.googleMapObjList[i].cardata reverse",
            this.googleMapObjList[i].cardata.reverse()
          );
          debugger;
          console.log("googleMapObjList[i].cardata", this.googleMapObjList);
          this.googleMapObjList[i].cardataforAnimation = this.googleMapObjList[
            i
          ].cardata.map(item => {
            return {
              location: new window.google.maps.LatLng(item.lat, item.lng),
              stopover: false
            };
          });
        }
      });
    }

    return this.googleMapObjList;
  }

  createRoutesOnGMAP(GMapDetails) {
    if (GMapDetails && GMapDetails.length > 0) {
      _.forEach(GMapDetails, gmap => {
        console.log("gmap obj", gmap);
        setRoutes.call(gmap);
      });
    }
  }

  onStartAnimation() {
    console.log("startAnimation called>>>> with", this);
    _.forEach(this.CarInstancesList, car => {
      console.log("Current carinstance", car);
      startAnimation.call(car, 0);
    });
  }

  onPauseAnimation() {
    console.log("pauseAnimation called>>>> with", this);
    _.each(this.CarInstancesList, car => {
      console.log("Current carinstance", car);
      stopMovement.call(car);
    });
  }

  onRestartAnimation() {
    console.log("restartAnimation called>>>> with", this);
    _.each(this.CarInstancesList, car => {
      console.log("Current carinstance", car);
      startAnimation.call(car);
    });
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
            message={
              videoData.hasOwnProperty("message") ? videoData.message : null
            }
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

  getTimeRange(time) {
    // console.log("time-----", time);
    getTimeVal(time);
  }
  render() {
    let mainIndex;
    console.log("chart flag showNumberOfCharts", this.state.showCharts);

    const { isLogin, responseDatas, vdInstance, isSplit } = this.state;

    if (responseDatas) {
      mainIndex = _.findIndex(responseDatas, {
        nodeType: "Main"
      });
      if (
        responseDatas[mainIndex] &&
        responseDatas[mainIndex].streamData.length === 0
      ) {
        this.setMainCtrlClass(isSplit, responseDatas[mainIndex].streamData);
      }
    }
    function addSplitClass(responseDatas) {
      if (responseDatas) {
        if (responseDatas.length > 1) {
          return true;
        } else {
          return false;
        }
      }
    }

    return (
      <React.Fragment>
        <Header isAuthorized={isLogin} />
        <div className="container car-details-1">
          <h2>Car Information Details</h2>
          <div
            className="graph-section box-shadow gap-row"
            style={{ minWidth: "300px", height: "300px" }}
          >
            <GetMap />
          </div>
          {/* control bar */}
          <div
            id="control-bar"
            className={classnames("box-shadow control-bar gap-row")}
          >
            {vdInstance.length > 0 && (
              <React.Fragment>
                <VideoControlBar
                  videoPlayers={vdInstance}
                  isSplit={isSplit}
                  startAnimate={() => this.onStartAnimation()}
                  stopAnimate={() => this.onPauseAnimation()}
                  restartAnimation={() => this.onRestartAnimation()}
                  getTimeRange={time => this.getTimeRange(time)}
                />
                {/* <button
                  onClick={e => this.splitLayout()}
                  className="split-icon"
                  disabled={
                    responseDatas ? !responseDatas[mainIndex].collide : false
                  }
                >
                  Split
                </button> */}
                <button
                  onClick={e => this.splitLayout()}
                  className="split-icon"
                  disabled
                >
                  Split
                </button>
              </React.Fragment>
            )}
          </div>

          <div
            className={classnames("d-flex split-sect gap-row", {
              splitHor: addSplitClass(responseDatas)
            })}
          >
            {this.renderVideoWrapper(responseDatas)}
          </div>

          <div className="row gap-row graphs charts" id="charts">
            <div className="col-sm-4">
              <div className="box-shadow donutChart">
                {this.state.showNumberOfCharts !== 0 ? (
                  <LineChartWithTime showTwoCharts={this.state.showCharts} />
                ) : (
                  <h5>
                    You do not have permissions to view Engine Temperature Chart
                  </h5>
                )}
              </div>
            </div>
            <div className="col-sm-4">
              <div className="box-shadow barChart">
                {this.state.showNumberOfCharts !== 0 ? (
                  <BarChart showTwoCharts={this.state.showCharts} />
                ) : (
                  <h5>
                    You do not have permissions to view Break Frequency Chart
                  </h5>
                )}
              </div>
            </div>
            <div className="col-sm-4">
              <div className="box-shadow lineChart">
                {this.state.showNumberOfCharts !== 0 ? (
                  <LineChart showTwoCharts={this.state.showCharts} />
                ) : (
                  <h5>
                    You do not have permissions to view Anomaly Detection Chart{" "}
                  </h5>
                )}
              </div>
            </div>
          </div>
        </div>
        {!responseDatas && <Spinner />}
      </React.Fragment>
    );
  }
}

export default carDetails1;
