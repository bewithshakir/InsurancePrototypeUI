import React, { Component } from "react";
import _ from "lodash";

import "./VideoControlBar.scss";
import pauseImg from "../../assets/images/baseline-pause-24-px.png";
import playImg from "../../assets/images/Play_button.png";
import Spinner from "../spinner/Spinner";

class VideoControlBar extends Component {
  players = [];
  state = { val: 0, show: true };

  componentDidMount() {
    this.fillBar = document.getElementById("fill");
    this.currentTime = document.getElementById("currentTime");
    this.elem = document.getElementById("playBtn");
    this.seekslider = document.getElementById("seekslider");

    this.createInstance(this.props.videoPlayers);
    this.elem.style.backgroundImage = `url(${playImg})`;

    // Show Spinner on video load
    this.showSpinnerOnLoadVd(this.players);
    // Stop Main video when collide video buffered
    this.stopMainPlayerOnBufferCollideVid(this.players[0], this.players[1]);

    this.seekslider.addEventListener("mouseup", event => {
      console.log("keyup");

      // do something
    });
  }

  componentWillReceiveProps(prevProps, nextProps) {
    this.elem.style.backgroundImage = `url(${playImg})`;
  }

  showSpinnerOnLoadVd(players) {
    if (players.length > 0) {
      players.forEach((player, i) => {
        player.on("loadeddata", () => {
          if (i === 1) {
            this.setState({ show: false });
          }
        });
      });
    }
  }

  stopMainPlayerOnBufferCollideVid(mainVid, collideVid) {
    // Stop main player on buffer collide video as seek bar is created with main player
    if (mainVid && collideVid) {
      collideVid.on("waiting", e => {
        mainVid.pause();
      });
      collideVid.on("playing", e => {
        mainVid.play();
      });
    }
  }

  createInstance(videos) {
    if (videos) {
      const players = [...this.players, ...videos];
      this.players = players;
    }
  }

  playOrPause(event) {
    let vid1, vid2;
    vid1 = this.players[0];
    if (this.players.length > 0) {
      vid2 = this.players[1];
    }

    if (vid1 && vid2) {
      console.log("two videos");
      this.isPlayPause(vid1, vid2);
    } else if (vid1) {
      console.log("one video");
      this.isPlayPause(vid1);
    }
    this.seekTimeUpdate(vid1);
  }

  isPlayPause(vid1, vid2) {
    if (vid1) {
      if (vid1.paused()) {
        // Move car on play
        this.props.startAnimate();
        vid1.play();
        vid2 && vid2.play();
        this.elem.style.backgroundImage = `url(${pauseImg})`;
      } else {
        vid1.pause();
        vid2 && vid2.pause();
        // Stop car on pause
        this.props.stopAnimate();

        this.elem.style.backgroundImage = `url(${playImg})`;
      }
    }
  }
  onChangeSeekSlider(event) {
    let seekToVid1, seekToVid2, val, vid1, vid2;
    val = +event.target.value;
    vid1 = this.players[0];
    seekToVid1 = vid1.duration() * (val / 100);

    if (this.players.length > 1) {
      vid2 = this.players[1];
      seekToVid2 = vid2.duration() * (val / 100);
      vid2.currentTime(seekToVid2);
    }
    vid1.currentTime(seekToVid1);
    this.setState({ val: val });
  }

  seekTimeUpdate(vid) {
    var self = this;
    if (vid) {
      vid.on("timeupdate", e => {
        let nt = vid.currentTime() * (100 / vid.duration());
        self.setState({ val: nt });
        // Update time in ui
        this.timeUpdateUI(vid);
        this.props.getTimeRange(vid.currentTime());
      });
    }
  }

  timeUpdateUI(vid) {
    const curtimetext = document.getElementById("curtimetext");
    const durtimetext = document.getElementById("durtimetext");
    // const fillBar = document.getElementById("fill");

    let curmins = Math.floor(vid.currentTime() / 60);
    let cursecs = Math.floor(vid.currentTime() - curmins * 60);
    let durmins = Math.floor(vid.duration() / 60);
    let dursecs = Math.floor(vid.duration() - durmins * 60);

    if (cursecs < 10) {
      cursecs = "0" + cursecs;
    }

    if (dursecs < 10) {
      dursecs = "0" + dursecs;
    }

    if (vid.ended()) {
      this.elem.style.backgroundImage = `url(${playImg})`;
    }
    curtimetext.innerHTML = curmins + ":" + cursecs;
    durtimetext.innerHTML = durmins + ":" + dursecs;

    const position = vid.currentTime() / vid.duration();
    // fillBar.style.width = position * 100 + "%";
  }

  render() {
    return (
      <div className="custom-control-bar" id="controls">
        <span className="text">Control Bar</span>
        <button
          onClick={event => this.playOrPause(event)}
          id="playBtn"
          className="play-bg"
        />

        <input
          ref={elem => (this.seekslider = elem)}
          id="seekslider"
          type="range"
          min="0"
          max="100"
          step="0.05"
          value={this.state.val}
          onChange={event => this.onChangeSeekSlider(event)}
        />
        {/* <div id="seek-bar">
          <div id="fill" />
        </div> */}

        <div>
          <span id="curtimetext">00:00</span>
          <span>&nbsp;/&nbsp;</span>
          <span id="durtimetext">00:00</span>
        </div>
        {this.state.show && <Spinner />}
      </div>
    );
  }
}

export default VideoControlBar;
