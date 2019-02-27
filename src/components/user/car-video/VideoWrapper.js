import React, { Component } from "react";
import _ from "lodash";

import SpinnerImg from "../../../assets/images/spinner-gif.gif";

import VideoPlayer from "../car-video/VideoPlayer1";
import CamraWrapper from "./CamraWrapper";

export default class VideoWrapper extends Component {
  state = {
    show: false,
    videoData: this.props.streamData[0]
  };
  componentWillMount() {
    this.streamData = this.props.streamData;
  }
  componentWillReceiveProps(prevProps) {
    // if (prevProps.currentVdData !== this.props.currentVdData) {
    // }
  }

  onCamraClick = data => {
    // Update video on camra click
    this.setState({ videoData: data });
    this.props.onCamraChange("reset player");
  };

  renderVideoDOM() {
    const id = this.props.id;
    return (
      <div className="flex-half ">
        <div className="row">
          <div className="col-sm-12">
            <div
              className="video-section d-flex box-shadow"
              id={`camra-wrapper-${id}`}
            >
              {this.streamData.length > 0 && (
                <React.Fragment>
                  <CamraWrapper
                    streamData={this.streamData}
                    onCamraChange={this.onCamraClick}
                    vidId={this.props.vidId}
                  />
                  <div className="video-wrapper">
                    <VideoPlayer
                      src={this.state.videoData.url}
                      id={"player-" + id}
                      playerInstance={this.props.setVdInstance}
                    />
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  // return (
  //   <div className="spinner-bg">
  //     <img src={SpinnerImg} />
  //   </div>
  // );

  render() {
    return (
      <React.Fragment>{this.renderVideoDOM(this.streamData)}</React.Fragment>
    );
  }
}
