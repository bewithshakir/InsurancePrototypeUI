import React, { Component } from "react";

import "../../assets/styles/_header.scss";
import logo from "../../assets/images/header/_trillium-logo.jpg";
import img_avatar from "../../assets/images/header/_img-Avatar.png";

// const pathToExcludeHeader = ["/", "/signup"];

class Header extends Component {
  state = {};

  renderHdrRight() {
    return (
      <div className="col-sm-8">
        <div
          className="d-flex align-items-center justify-content-end"
          style={{ marginRight: "5%" }}
        >
          <i className="far fa-bell ml-4" style={{ marginRight: "3%" }}>
            <span className="badge">9</span>
          </i>
          <div className="d-flex">
            <div className="user-name mr-2">
              {window.location.pathname === "/" ? (
                <p>Thomas Miller</p>
              ) : (
                <p> Johnson Watts </p>
              )}
              {window.location.pathname === "/" ? (
                <span>Org Admin</span>
              ) : (
                <span>Insurance Agent</span>
              )}
            </div>
            <img
              className="rounded-circle dropdown-toggle"
              src={img_avatar}
              width="30"
              height="30"
              alt="Profile"
            />
          </div>
        </div>
      </div>
    );
  }
  render() {
    // console.log(
    //   "pathToExcludeHeader.indexOf(window.location.pathname)",
    //   pathToExcludeHeader.indexOf(window.location.pathname)
    // );
    // if (pathToExcludeHeader.indexOf(window.location.pathname) >= 0) return null;
    return (
      <header className="row align-items-center top-header">
        <div className="col-sm-4">
          <img src={logo} alt="Trillium logo" className="image-header" />
        </div>
        {this.renderHdrRight()}
      </header>
    );
  }
}

export default Header;
