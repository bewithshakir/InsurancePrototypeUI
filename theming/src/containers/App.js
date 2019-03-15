import React, { Component } from "react";

import "./app.scss";
import Login from "../components/auth/Login";

class App extends Component {
  changeCSS(cssClass) {
    var oldlink = document.getElementsByTagName("body");
    oldlink[0].className = "";
    oldlink[0].classList.add(cssClass);
    const currentClassN =
      window.localStorage.getItem("className") &&
      window.localStorage.getItem("className");
    window.localStorage.setItem("className", cssClass);

    if (currentClassN) {
      if (cssClass === "default") {
        window.localStorage.removeItem("className");
      }
    }
  }
  addClassFn(name) {
    const oldlink = document.getElementsByTagName("body");
    oldlink[0].className = "";
    oldlink[0].classList.add(name);
  }
  render() {
    return (
      <React.Fragment>
        <a href="#" onClick={() => this.changeCSS("blue-theme")}>
          Blue Theme
        </a>
        <a href="#" onClick={() => this.changeCSS("default")}>
          Default
        </a>
        <Login />
      </React.Fragment>
    );
  }
}

export default App;
