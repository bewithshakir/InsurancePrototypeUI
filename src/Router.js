import React from "react";
import { Switch, Route } from "react-router-dom";
import CarManagement from "./components/user/car-management/carManagement";
import CarDetail from "./components/user/car-details/carDetail";
//import GoogleMapComponent from "./components/user/Google-Map/googleMapRoute";
import ModalForm from "./components/user/forms/modalForm";
import userForm from "./components/user/forms/userForm";
import carDetails1 from "./components/user/car-details/carDetails-1";
import IssueManagement from "./components/user/issue-management/dashboard/dashboard";

const Router = () => (
  <Switch>
    <Route exact path="/" component={CarManagement} />
    <Route exact path="/carDetails/:vin" component={CarDetail} />
    <Route exact path="/carDetails1/:vin" component={carDetails1} />
    {/* <Route exact path="/googleMapComponent" component={GoogleMapComponent} /> */}
    <Route exact path="/modalform/:vin" component={ModalForm} />
    <Route exact path="/openform/:vin" component={userForm} />
    <Route exact path="/issueManagement/" component={IssueManagement} />
  </Switch>
);

export default Router;
