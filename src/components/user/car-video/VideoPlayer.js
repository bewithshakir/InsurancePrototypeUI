import React, { Component } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

class VideoPlayer extends Component {
  state = {};
  componentDidMount() {
    const src = this.props.src;
    this.loadVideo(src, "application/x-mpegURL");
    // Set video instance on root
    this.props.playerInstance(this.player);
  }
  componentDidUpdate(prevProps, prevState) {
    // this.props.playerInstance(player);
  }

  loadVideo(src, type) {
    this.player = videojs(this.props.id);

    this.player.src({
      src,
      type
    });
    this.player.load();
  }
  componentWillReceiveProps(nextProps) {
    this.loadVideo(nextProps.src, "application/x-mpegURL");
    console.log("video player nextProps", nextProps);
  }

  render() {
    return (
      <video
        id={this.props.id}
        className="video-js"
        data-setup='{"controls": true, "autoplay": false, "preload": "auto"}'
      />
    );
  }
}
export default VideoPlayer;
