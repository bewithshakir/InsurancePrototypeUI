import React, { Component } from "react";

import SpinnerImg from "../../assets/images/spinner-gif.gif";

export default class Spinner extends Component {
  state = { show: false };
  render() {
    return (
      <div className="spinner-bg">
        <img src={SpinnerImg} />
      </div>
    );
  }
}
