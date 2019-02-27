import React, { Component } from "react";
import _ from "lodash";

import SpinnerImg from "../../../assets/images/spinner-gif.gif";

import VideoPlayer from "../car-video/VideoPlayer1";
import CamraWrapper from "./CamraWrapper";

export default class VideoWrapper extends Component {
  state = {
    show: false,
    videoData: null,
    streamData: []
  };
  componentDidMount() {
    // console.log("componentDidMount", this.props.currentVdData);
  }
  componentWillReceiveProps(prevProps) {
    if (prevProps.currentVdData !== this.props.currentVdData) {
      //Perform some operation
      this.setState({
        videoData: prevProps.currentVdData,
        streamData: prevProps.streamData
      });
    }
  }

  onCamraClick = data => {
    // Update video on camra click
    this.setState({ videoData: data });
    this.props.onReset();
  };
  renderVideoDOM(data) {
    if (data) {
      return (
        <div className="flex-half ">
          <div className="row">
            <div className="col-sm-12">
              <div className="video-section d-flex box-shadow">
                <CamraWrapper
                  streamData={this.state.streamData}
                  onCamraChange={this.onCamraClick}
                />
                {/* <div className="hdr">
                  <button onClick={event => this.toggleCamras(event)}>
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
                    onClick={() => this.onCamraClick(data.name, column)}
                  />
                ))}
                    </div>
                  </div>
                </div> */}
                <div className="video-wrapper">
                  <VideoPlayer
                    src={data.url}
                    id={"player-" + this.props.id}
                    playerInstance={this.props.setVdInstance}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="spinner-bg">
          <img src={SpinnerImg} />
        </div>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.renderVideoDOM(this.state.videoData)}
      </React.Fragment>
    );
  }
}
