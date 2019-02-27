import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./carDetail.scss";
import axios from "axios";
import _ from "lodash";
import Modal from "../forms/modalForm";
import videojs from "video.js";
import { FadeLoader } from "react-spinners";

import LatiLognDetails from "../lati-long-details/latiLongDetails";
import MapDetails from "../map-details/mapDetails";
// import CarVideo from "../car-video/CarVideo";
import DonutChart from "./../charts/donut-chart/donut_Chart";
import BarChart from "./../charts/barChart-chart2/barChart";
import LineChart from "./../charts/line-chart/lineChart";
import GoogleMapComponent from "./../Google-Map/googleMapRoute";

class CarDetail extends Component {
  state = {
    url:
      "https://www.totaleclips.com/Player/Bounce.aspx?eclipid=e108119&bitrateid=449&vendorid=102&type=.mp4",
    modalFlag: false,
    loadingSpinner: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      latlng: { lat: 0, lng: 0 },
      cardata: {},
      accidentData: {},
      //videoUrl:"https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
      controlBar: {
        inputRangeVal: 0
      },
      videoEnableFlag: false,
      mapEnableFlag: false,
      chartEnableFlag: false,
      resetdom: false
    };
    const id = props.match.params.vin;
    //this.updateVideo("carvin121212_cam1");
    this.setLatLng = this.setLatLng.bind(this);
    this.updateVideo = this.updateVideo.bind(this);
    this.isMapActive = 1;
    this.state.loadingSpinner = false;
  }

  componentDidMount() {
    axios
      .post(
        "https://skloa3avwj.execute-api.us-east-1.amazonaws.com/prototype",
        {
          vin: this.props.match.params.vin
        }
      )
      .then(response => {
        console.log("data", typeof response.data.message);
        // console.log(
        //   "data",
        //   response.data.streamData,
        //   response.data.gpsData,
        //   response.data.carSpeedData
        // );
        this.setState({ loadingSpinner: true });
        if (response && response.data) {
          // Remove spinner
          console.warn(
            "vccvhckcgvbnm" + " " + typeof response.data.carSpeedData
          );
          if (
            typeof response.data.streamData === "undefined" &&
            typeof response.data.gpsData === "undefined" &&
            typeof response.data.carSpeedData === "undefined"
          ) {
            this.setState({ modalFlag: false });
            this.refs.modalform.onOpenModal(this.props.match.params.vin);
          } else {
            if (typeof response.data.streamData === "object") {
              this.setState({ videoEnableFlag: true });
            } else {
              this.setState({ videoEnableFlag: false });
            }

            if (typeof response.data.carSpeedData === "object") {
              this.setState({ chartEnableFlag: true });
            } else {
              this.setState({ chartEnableFlag: false });
            }
            // if (typeof response.data.gpsData === "object") {
            //   this.setState({ mapEnableFlag: true });
            // } else {
            //   this.setState({ mapEnableFlag: false });
            // }
            this.setState({ modalFlag: true });
            this.setState({ cardata: response.data });
            this.setState({ accidentData: response.data.accidentFlagData[0] });
            //this.setState({ camdata : response.data.cardata })
            this.updateVideo(response.data.streamData[0].name);
          }
        } else {
          this.setState({ modalFlag: false });
          this.refs.modalform.onOpenModal(this.props.match.params.vin);
        }
      })
      .catch(err => {
        console.log("err" + err);
        //this.refs.modalform.onOpenModal(this.props.match.params.vin);
      });
  }
  setLatLng(e) {
    //console.log("setlatlng" ,e);
    this.setState({
      latlng: { lat: e.lat().toFixed(6), lng: e.lng().toFixed(6) }
    });
    //console.log(this.state.latlng);
  }

  updateVideo(camName) {
    this.player = videojs("car-video");

    console.log("camName", camName);

    if (this.state.cardata) {
      console.log(
        "this.state.cardata.streamData",
        this.state.cardata.streamData
      );
      // let videodetails = [];
      let videodetails = _.filter(
        this.state.cardata.streamData,
        item => item.name == camName
      ).map(item => {
        return { url: item.url };
      });

      if (videodetails[0].url) {
        this.player.src({
          src: videodetails.length > 0 ? videodetails[0].url : "",
          type: "application/x-mpegURL"
        });
      } else {
        this.player.src({
          src:
            "https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
          type: "application/x-mpegURL"
        });
      }
      console.log("this.videoJsOptions", videodetails);
    }
    // update seekbar
    // this.player.on("timeupdate", this.seekTimeUpdate);
    // Reload video if camra change
    this.player.pause();
    // sync map with video
    this.refs.googleMap.setRoutes();
    this.refs.googleMap.resetStartingPosition();
    this.refs.googleMap.stopMovement();
    this.setLatLng({ lat: () => 0, lng: () => 0 });
    this.player.on("play", () => {
      if (this.isMapActive === 1) {
        this.refs.googleMap.startAnimation(this.map, 0);
        this.isMapActive = 2;
      }
      if (this.isMapActive === 3) {
        this.refs.googleMap.startMovement();
        this.isMapActive = 2;
      }
    });
    this.player.on("pause", () => {
      if (this.isMapActive === 2) {
        this.refs.googleMap.stopMovement();
        this.isMapActive = 3;
      }
    });
  }

  onMap = map => {
    this.map = map;
  };

  renderSensor(streamData) {
    if (streamData) {
      return streamData.map((data, i) => {
        if (this.props.match.params.vin === "123456") {
          i++;
          i++;
        }
        i++;
        let activeClass = i === 1 || i === 3 ? "active" : "";
        const classN = `sensor pos-${i} ${activeClass}`;
        return (
          <span
            key={i}
            className={classN}
            onClick={e => {
              this.updateVideo(data.name);
              this.setActiveClass(e, i);
            }}
          />
        );
      });
    }
  }
  // Add class 'active' on camra when user click on it
  setActiveClass(event) {
    const allSensorEle = document.querySelectorAll(".car-image .sensor");
    allSensorEle.forEach((ele, i) => {
      ele.classList.remove("active");
    });
    event.target.classList.add("active");
  }

  // Custom control bar start
  // playPause = e => {
  //   if (this.player.paused() && this.isMapActive === 1) {
  //     this.player.play();
  //     e.target.innerHTML = "Paused";
  //     // this.refs.googleMap.setRoutes();
  //     // this.isMapActive = 2;
  //   } else {
  //     this.player.pause();
  //     e.target.innerHTML = "Play";
  //   }
  // };

  // videoSeek = event => {
  //   let val = event.target.value;
  //   const player = this.player;
  //   // change the value on slide
  //   this.setState(prevState => ({
  //     controlBar: {
  //       ...prevState.controlBar,
  //       inputRangeVal: val
  //     }
  //   }));

  //   // Get current time
  //   let seekto = player.duration() * (val / 100);
  //   player.currentTime(seekto);
  // };

  // seekTimeUpdate() {
  //   const seekslider = document.getElementById("seekslider");
  //   const curtimetext = document.getElementById("curtimetext");
  //   const durtimetext = document.getElementById("durtimetext");

  //   // Sync seekbar with video
  //   let newTime = this.currentTime() * (100 / this.duration());
  //   seekslider.value = newTime;

  //   // Update min to sec and vice versa
  //   let curmins = Math.floor(this.currentTime() / 60);
  //   let cursecs = Math.floor(this.currentTime() - curmins * 60);
  //   let durmins = Math.floor(this.duration() / 60);
  //   let dursecs = Math.floor(this.duration() - durmins * 60);
  //   if (cursecs < 10) {
  //     cursecs = "0" + cursecs;
  //   }
  //   if (dursecs < 10) {
  //     dursecs = "0" + dursecs;
  //   }
  //   if (curmins < 10) {
  //     curmins = "0" + curmins;
  //   }
  //   if (durmins < 10) {
  //     durmins = "0" + durmins;
  //   }

  //   // update ui
  //   curtimetext.innerHTML = `${curmins}:${cursecs}`;
  //   durtimetext.innerHTML = `${durmins}:${dursecs}`;
  // }

  // fullScreenToggle = event => {
  //   const fullscreenbtn = event.target;
  //   const player = this.player;
  //   if (player.requestFullscreen) {
  //     player.requestFullscreen();
  //   } else if (player.webkitRequestFullScreen) {
  //     player.webkitRequestFullScreen();
  //   } else if (player.mozRequestFullScreen) {
  //     player.mozRequestFullScreen();
  //   }
  // };
  // Custom control bar end

  fullScreenToggle = event => {
    const fullscreenbtn = event.target;
    const player = this.player;
    if (player.requestFullscreen) {
      player.requestFullscreen();
    } else if (player.webkitRequestFullScreen) {
      player.webkitRequestFullScreen();
    } else if (player.mozRequestFullScreen) {
      player.mozRequestFullScreen();
    }
  };

  videoRender() {
    if (this.state.videoEnableFlag) {
      return (
        <div>
          <div className="row ">
            <div className="col-12 d-flex">
              <div className="car-image">
                <div className="car-id">VIN: {this.props.match.params.vin}</div>
                {this.renderSensor(this.state.cardata.streamData)}
              </div>
              <div className="car-video">
                <div className="video-container">
                  <video
                    id="car-video"
                    className="video-js vjs-default-skin"
                    controls
                    preload="auto"
                    style={{ width: 100 + "%" }}
                    data-setup="{}"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="row"
            style={{ marginTop: "-9px", minHeight: "100px" }}
          />
          <div className="row" style={{ marginTop: "34px", width: "1149px" }}>
            <div className="col-12 d-flex p-0" id="map-details">
              <LatiLognDetails
                latlng={this.state.latlng}
                accidentData={this.state.accidentData}
              />
              <GoogleMapComponent
                ref="googleMap"
                setLatLng={this.setLatLng}
                Cardetails={this.state.cardata}
                resetMap={this.onMap}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row ">
          <div className="col-12 d-flex video-map-aceess">
            You don't have access to view the Video and Google Map Content.
          </div>
        </div>
      );
    }
  }

  // Chart Render

  chartRender() {
    if (this.state.chartEnableFlag) {
      return (
        <div className="row charts" style={{ marginTop: "18px" }}>
          <div className="donutChart">
            <DonutChart />
          </div>
          <div className="barChart">
            <BarChart />
          </div>
          <div className="lineChart">
            <LineChart />
          </div>
        </div>
      );
    } else {
      return (
        <div className="row charts chart-aceess">
          You don't have access to view the Charts.
        </div>
      );
    }
  }

  componentWillUnmount() {
    // destroy player on unmount
    if (this.player) {
      this.player.dispose();
      console.log("disposed player");
    }
  }

  render() {
    // console.warn("videoFlag", this.state.videoEnableFlag);
    return this.state.loadingSpinner ? (
      this.state.modalFlag ? (
        <div className="car-details">
          <div className="container">
            {this.videoRender()}

            {/* Chart Row */}

            {this.chartRender()}

            {/* End of Charts */}
          </div>
        </div>
      ) : (
        <Modal ref="modalform" />
      )
    ) : (
      <div style={{ position: "absolute", top: "50%", left: "50%" }}>
        <FadeLoader
          height={15}
          heightUnit="px"
          width={5}
          widthUnit="px"
          margin="2px"
          radius={10}
          color="#ffffff"
        />
      </div>
    );
  }
}

export default CarDetail;
