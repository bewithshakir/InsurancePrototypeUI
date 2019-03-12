import React, { Component } from "react";

import "./app.scss";

class App extends Component {
  changeCSS(cssClass) {
    var oldlink = document.getElementsByTagName("body");
    oldlink[0].className = "";
    oldlink[0].classList.add(cssClass);
  }
  render() {
    return (
      <div className="card text-center">
        <div className="card-header">
          <ul className="nav nav-pills card-header-pills">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Active
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link disabled"
                href="#"
                tabIndex="-1"
                aria-disabled="true"
              >
                Disabled
              </a>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" onClick={() => this.changeCSS("blue-theme")}>
            Blue Theme
          </a>
          <a href="#" onClick={() => this.changeCSS("black-theme")}>
            Black Theme
          </a>
        </div>
      </div>
    );
  }
}

export default App;
