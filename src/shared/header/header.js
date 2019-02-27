import React, { Component } from "react";

import "../../assets/styles/_header.scss";

const pathToExcludeHeader = ["/", "/signup"];

class Header extends Component {
  state = {};

  renderHdrRight() {
    if (this.props.isAuthorized) {
      return (
        <div className="col-sm-8">
          <div className="d-flex align-items-center justify-content-end">
            <input
              type="text"
              className="form-control searchBox"
              placeholder="search"
            />
            <i className="far fa-bell ml-4">
              <span className="badge">9</span>
            </i>
            <i className="far fa-envelope icon-envelope ml-4 mr-4">
              <span className="badge">1</span>
            </i>
            <div className="d-flex">
              <div className="user-name mr-2">
                <p>Peter Parker</p>
                <span>Super admin</span>
              </div>
              <img
                className="rounded-circle dropdown-toggle"
                src="https://www.w3schools.com/howto/img_avatar.png"
                width="30"
                height="30"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                alt="Profile"
              />
              <div
                className="dropdown-menu image-dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <i className="fas fa-caret-up" />
                <a className="dropdown-item" href="htttps:www.google.com">
                  Profile
                </a>
                <a className="dropdown-item" href="htttps:www.google.com">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    // console.log(
    //   "pathToExcludeHeader.indexOf(window.location.pathname)",
    //   pathToExcludeHeader.indexOf(window.location.pathname)
    // );
    // if (pathToExcludeHeader.indexOf(window.location.pathname) >= 0) return null;
    /*{<header className="row align-items-center top-header">
        <div className="col-sm-4">
          <img src={logo} alt="Trillium logo" />
        </div>
        {this.renderHdrRight()}
      </header> }*/
    return <div className="col-md-12 car-detail-header" />;
  }
}

export default Header;
