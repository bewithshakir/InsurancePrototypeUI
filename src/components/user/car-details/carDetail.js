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
import {
  GoogleMap,
  GetMap,
  setRoutes,
  startAnimation,
  stopMovement,
  startMovement,
  startmap
} from "./../Google-Map/googleMapRoute";

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
            //this.updateVideo(response.data.streamData[0].name);
          }
        } else {
          this.setState({ modalFlag: false });
          this.refs.modalform.onOpenModal(this.props.match.params.vin);
        }
        let mapObj = startmap();
        console.log("map obj", mapObj);
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
    this.player1 = videojs("car-video1");

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
        this.player1.src({
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

    // _.each(,(cardata) => {
    let car1 = new GoogleMap();
    console.log("car>>>>>>>>>>>>>>", car1);
    //})
    car1.cardata = [
      // {
      //   vin: "121212",
      //   dateTime: "2019-02-05T17:22:32Z",
      //   latitude: "37.388467",
      //   longitude: "-122.008963"
      // },
      // {
      //   vin: "121212",
      //   dateTime: "2019-02-05T17:23:32Z",
      //   latitude: "37.388249",
      //   longitude: "-122.008637"
      // },
      // {
      //   vin: "121212",
      //   dateTime: "2019-02-05T17:24:32Z",
      //   latitude: "37.388267",
      //   longitude: "-122.008251"
      // },
      // {
      //   vin: "121212",
      //   dateTime: "2019-02-05T17:25:32Z",
      //   latitude: "37.388335",
      //   longitude: "-122.007779"
      // },
      // {
      //   vin: "121212",
      //   dateTime: "2019-02-05T17:26:32Z",
      //   latitude: "37.388215",
      //   longitude: "-122.007435"
      // },
      // {
      //   vin: "121212",
      //   dateTime: "2019-02-05T17:27:32Z",
      //   latitude: "37.388266",
      //   longitude: "-122.006985"
      // }
      // { lat: 48.981284, lng: 21.217192, name: "Station 1" },
      // { lat: 48.9832841, lng: 21.2176398, name: "Station 2" },
      // { lat: 48.9856443, lng: 21.2209088, name: "Station 3" },
      // { lat: 48.9861461, lng: 21.2261563, name: "Station 4" },
      // { lat: 48.9874682, lng: 21.2294855, name: "Station 5" },
      // { lat: 48.9909244, lng: 21.2295512, name: "Station 6" },
      // { lat: 48.9928871, lng: 21.2292352, name: "Station 7" },
      // { lat: 48.9921334, lng: 21.2246742, name: "Station 8" },
      // { lat: 48.9943196, lng: 21.2234792, name: "Station 9" },
      // { lat: 48.9966345, lng: 21.2221262, name: "Station 10" },
      // { lat: 48.9981191, lng: 21.2271386, name: "Station 11" },
      // { lat: 49.0009168, lng: 21.2359527, name: "Station 12" },
      // { lat: 49.001795, lng: 21.239289, name: "Station 13" },
      // { lat: 48.9991912, lng: 21.2398272, name: "Station 14" },
      // { lat: 48.995985, lng: 21.241841, name: "Station 15" },
      // { lat: 48.9931772, lng: 21.2453901, name: "Station 16" },
      // { lat: 48.9963512, lng: 21.252585, name: "Station 17" },
      // { lat: 48.9985134, lng: 21.2508423, name: "Station 18" },
      // { lat: 49.0085, lng: 21.2508, name: "Station 19" },
      // { lat: 49.0093, lng: 21.2528, name: "Station 20" },
      // { lat: 49.0103, lng: 21.256, name: "Station 21" },
      // { lat: 49.0112, lng: 21.259, name: "Station 22" },
      // { lat: 49.0124, lng: 21.262, name: "Station 23" },
      // { lat: 49.0135, lng: 21.265, name: "Station 24" },
      // { lat: 49.0149, lng: 21.268, name: "Station 25" },
      // { lat: 49.0171, lng: 21.271, name: "Station 26" },
      // { lat: 49.0198, lng: 21.274, name: "Station 27" },
      // { lat: 49.0305, lng: 21.3, name: "Station 28" }

      //{ latitude: 49.0112, longitude: 21.259, name: "Station 22" }
      // { latitude: 49.0124, longitude: 21.262, name: "Station 23" },
      // { latitude: 49.0135, longitude: 21.265, name: "Station 24" },
      // { latitude: 49.0149, longitude: 21.268, name: "Station 25" },
      // { latitude: 49.0171, longitude: 21.271, name: "Station 26" },
      // { latitude: 49.0198, longitude: 21.274, name: "Station 27" },
      // { latitude: 49.0305, longitude: 21.3, name: "Station 28" }
      { lat: 26.203997, lng: -98.180473, name: "Station 1" },
      { lat: 26.200893, lng: -98.160565, name: "Station 2" },
      { lat: 26.194099, lng: -98.14753, name: "Station 3" },
      { lat: 26.190994, lng: -98.130369, name: "Station 4" },
      { lat: 26.189108, lng: -98.107025, name: "Station 5" },
      { lat: 26.185995, lng: -98.08849, name: "Station 6" },
      { lat: 26.182259, lng: -98.067896, name: "Station 7" },
      { lat: 26.180991, lng: -98.050729, name: "Station 8" },
      { lat: 26.176632, lng: -98.029447, name: "Station 9" },
      { lat: 26.17106, lng: -98.017785, name: "Station 10" },
      { lat: 26.171646, lng: -98.005419, name: "Station 11" },
      { lat: 26.171616, lng: -97.993741, name: "Station 12" },
      { lat: 26.171584, lng: -97.981375, name: "Station 13" },
      { lat: 26.164777, lng: -97.970403, name: "Station 14" },
      { lat: 26.159813, lng: -97.958051, name: "Station 15" },
      { lat: 26.154846, lng: -97.945012, name: "Station 16" },
      { lat: 26.152337, lng: -97.930591, name: "Station 17" },
      { lat: 26.15353, lng: -97.917531, name: "Station 18" },
      { lat: 26.154727, lng: -97.906531, name: "Station 19" },
      { lat: 26.157763, lng: -97.892773, name: "Station 20" },
      { lat: 26.158964, lng: -97.883145, name: "Station 21" },
      { lat: 26.158303, lng: -97.870086, name: "Station 22" },
      { lat: 26.160103, lng: -97.856329, name: "Station 23" }
    ];

    car1.cardataforAnimation = car1.cardata.map(item => {
      return {
        location: new window.google.maps.LatLng(item.lat, item.lng),
        stopover: false
      };
    });

    let setRoute = setRoutes.bind(car1);

    //console.log("getCurrentContext 1", getCurrentContext());
    let car2 = new GoogleMap();
    console.log("car>>>>>>>>>>>>>>", car2);
    // //})

    car2.cardata = [
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
      // { latitude: 48.981284, longitude: 21.217192, name: "Station 1" },
      // { latitude: 48.9832841, longitude: 21.2176398, name: "Station 2" },
      // { latitude: 48.9856443, longitude: 21.2209088, name: "Station 3" },
      // { latitude: 48.9861461, longitude: 21.2261563, name: "Station 4" },
      // { latitude: 48.9874682, longitude: 21.2294855, name: "Station 5" },
      // { latitude: 48.9909244, longitude: 21.2295512, name: "Station 6" },
      // { latitude: 48.9928871, longitude: 21.2292352, name: "Station 7" },
      // { latitude: 48.9921334, longitude: 21.2246742, name: "Station 8" },
      // { latitude: 48.9943196, longitude: 21.2234792, name: "Station 9" },
      // { latitude: 48.9966345, longitude: 21.2221262, name: "Station 10" },
      // { latitude: 48.9981191, longitude: 21.2271386, name: "Station 11" },
      // { latitude: 49.0009168, longitude: 21.2359527, name: "Station 12" },
      // { latitude: 49.001795, longitude: 21.239289, name: "Station 13" },
      // { latitude: 48.9991912, longitude: 21.2398272, name: "Station 14" },
      // { latitude: 48.995985, longitude: 21.241841, name: "Station 15" },
      // { latitude: 48.9931772, longitude: 21.2453901, name: "Station 16" },
      // { latitude: 48.9963512, longitude: 21.252585, name: "Station 17" },
      // { latitude: 48.9985134, longitude: 21.2508423, name: "Station 18" },
      // { latitude: 49.0085, longitude: 21.2508, name: "Station 19" },
      // { latitude: 49.0093, longitude: 21.2528, name: "Station 20" },
      // { latitude: 49.0103, longitude: 21.256, name: "Station 21" }
      // { latitude: 49.0112, longitude: 21.259, name: "Station 22" },
      // { latitude: 49.0124, longitude: 21.262, name: "Station 23" }
      { lat: 26.161905, lng: -97.843257, name: "Station 24" },
      { lat: 26.164966, lng: -97.837743, name: "Station 25" },
      { lat: 26.164923, lng: -97.826052, name: "Station 26" },
      { lat: 26.165494, lng: -97.814357, name: "Station 27" },
      { lat: 26.169774, lng: -97.805396, name: "Station 28" },
      { lat: 26.173449, lng: -97.799188, name: "Station 29" },
      { lat: 26.178947, lng: -97.786779, name: "Station 30" },
      { lat: 26.180766, lng: -97.779201, name: "Station 31" },
      { lat: 26.185678, lng: -97.774361, name: "Station 32" },
      { lat: 26.183786, lng: -97.764047, name: "Station 33" },
      { lat: 26.185603, lng: -97.756467, name: "Station 34" },
      { lat: 26.184317, lng: -97.744083, name: "Station 35" },
      { lat: 26.186131, lng: -97.735813, name: "Station 36" },
      { lat: 26.184236, lng: -97.725495, name: "Station 37" },
      { lat: 26.181378, lng: -97.714827, name: "Station 38" },
      { lat: 26.166442, lng: -97.697049, name: "Station 39" },
      { lat: 26.152685, lng: -97.67375, name: "Station 40" }
    ];

    let setRoute1 = setRoutes.bind(car2);

    //setTimeout(() => {}, 0);
    setRoute();
    setRoute1();

    //console.log("mapObj....", mapObj);
    // .then(map => {
    //   setRoute1();
    //   setRoute();
    // });
    // console.log("car1", car1);
    // console.log("car2", car2);
    // console.log("getCurrentContext 2", getCurrentContext());

    //this.refs.googleMap.setRoutes();
    //this.refs.googleMap.resetStartingPosition();
    //this.refs.googleMap.stopMovement();
    // this.setLatLng({ lat: () => 0, lng: () => 0 });
    this.player.on("play", () => {
      this.player1.play();
      if (this.isMapActive === 1) {
        console.log("Car1 before startanimation-------------", car1);
        // console.log("Car2 before startanimation-------------", car2);
        startAnimation.call(car1, 0);
        startAnimation.call(car2, 0);
        this.isMapActive = 2;
      }
      if (this.isMapActive === 3) {
        console.log("startMovement called >>>>>>>", startMovement);
        // startMovement.call(car2);
        startMovement.call(car1);
        this.isMapActive = 2;
      }
    });
    this.player.on("pause", () => {
      this.player1.pause();
      if (this.isMapActive === 2) {
        console.log("this.isMapActive", this.isMapActive);
        stopMovement.call(car1);
        // stopMovement.call(car2);
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
                    id="car-video1"
                    className="video-js vjs-default-skin"
                    controls
                    preload="auto"
                    style={{ width: 100 + "%" }}
                    data-setup="{}"
                  />

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
          <div
            className="row"
            style={{ marginTop: "34px", width: "1149px", height: "800px" }}
          >
            <div className="col-12 d-flex p-0" id="map-details">
              {/* <LatiLognDetails
                latlng={this.state.latlng}
                accidentData={this.state.accidentData}
              /> */}
              <GetMap
              // ref="googleMap"
              // // setLatLng={this.setLatLng}
              // // Cardetails={this.state.cardata}
              // resetMap={this.onMap}
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

            {/* {this.chartRender()} */}

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
