import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Header from "./shared/header/header";

import Router from "./Router";

const Navigation = props => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/userManagement">User Management</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Register User</NavLink>
        </li>
      </ul>
    </nav>
  );
};

class App extends Component {
  state = { isLogin: false };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          {/* <Header isAuthorized={this.state.isLogin} /> */}
        </div>
        {/* <Navigation /> */}
        <Router />
      </React.Fragment>
    );
  }
}

export default App;
