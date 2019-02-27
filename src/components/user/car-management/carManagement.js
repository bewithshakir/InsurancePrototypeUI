import React, { Component } from "react";
import ReactTable from "react-table";
import { Link } from "react-router-dom";
import axios from "axios";
import { FadeLoader } from "react-spinners";

import Header from "../../../shared/header/header.js";
import {} from "./_carManagement.scss";
import pushNotificationService from "../services/pushNotificationService.js";
import IssueModal from "../issue-management/modal/form";

class UserManagement extends Component {
  state = {
    selected: {},
    selectAll: 0,
    data: [],
    openModal: false,
    loadingSpinner: false,
    modalForFailure: false
  };

  componentDidMount() {
    axios
      .get("https://jwrr2fa8mf.execute-api.us-east-1.amazonaws.com/p3/car")
      .then(response => {
        this.setState({ loadingSpinner: true });
        this.setState({ data: response.data });
      })
      .catch(err => {
        console.log("ERROR :: " + err);
      });
  }

  // toggleRow(name) {
  //   const newSelected = Object.assign({}, this.state.selected);
  //   newSelected[name] = !this.state.selected[name];
  //   this.setState({
  //     selected: newSelected,
  //     selectAll: 2
  //   });
  // }

  // Select all table row checkout box
  toggleSelectAll(object) {
    let newSelected = {};

    if (this.state.selectAll === 0) {
      this.state.data.forEach(row => {
        newSelected[row.name] = true;
      });
    }

    this.setState({
      selected: newSelected,
      selectAll: this.state.selectAll === 0 ? 1 : 0
    });
  }

  /*
   * Push notification on Raise Request button.
   */
  raiseRequest = (vin, notificationToken) => {
    let postData = {
      notification: {
        title: "Data Access Permission",
        body: "Notification for permission from car list with vin number" + vin,
        click_action: "http://localhost:3000/permission/" + vin
      },
      to: notificationToken
    };

    pushNotificationService
      .pushMessageToMobile(postData)
      .then(res => {
        if (res.data.success === 1) {
          this.setState({
            openModal: true
          });
        }
      })
      .catch(err => {
        console.log("raiseRequest pushNotificationService", err);
        this.setState({
          openModal: true,
          modalForFailure: true
        });
      });
  };

  NotificationModal() {
    if (this.state.modalForFailure) {
      return (
        <div className="row issue-modal-content-acl">
          <span>ACL permission notification couldn't sent.</span>
        </div>
      );
    }
    return (
      <div className="row issue-modal-content-acl">
        <span>ACL permission notification has sent.</span>
      </div>
    );
  }

  /*
   * Display the table
   */
  userListColumn() {
    const columns = [
      {
        Header: "VIN",
        accessor: "",
        Cell: ({ original }) => {
          return (
            <div className="d-flex align-items-center">
              <Link
                to={{
                  pathname: "/carDetails/" + original.vin,
                  param1: "Par1"
                }}
                className="car-name"
              >
                {original.vin}
              </Link>
            </div>
          );
        }
      },
      {
        Header: "Car Modal Name",
        accessor: "model"
      },
      {
        Header: "Car Trim",
        accessor: "carTrim"
      },
      {
        Header: "ACL Permission",
        Cell: ({ original }) => {
          return (
            <button
              className="acl-permission-raise"
              onClick={() =>
                this.raiseRequest(original.vin, original.notificationToken)
              }
            >
              Raise Request
            </button>
          );
        }
      },
      {
        Header: "Status",
        Cell: ({ original }) => {
          return (
            <div>
              <span
                className={
                  "status-round-" + original.carStatus.toLocaleLowerCase()
                }
              />
              <span
                className={
                  original.carStatus.toLocaleLowerCase() === "inactive"
                    ? "inactive"
                    : ""
                }
              >
                {original.carStatus}
              </span>
            </div>
          );
        },
        width: 100
      }
    ];
    return columns;
  }

  closeIssueModal = flag => {
    this.setState({ openModal: flag });
  };

  renderTableRowActions() {
    if (this.state.selectAll > 0) {
      return (
        <div className="table-actions">
          <button className="btn btn-outline-secondary small">
            <i className="fas fa-pen" />
          </button>
          <button className="btn btn-outline-secondary small ml-2 mr-2">
            <i className="far fa-check-circle" />
          </button>
          <button className="btn btn-outline-secondary small">
            <i className="fas fa-times" />
          </button>
        </div>
      );
    }
    return <div className="" />;
  }

  render() {
    return (
      <div className="car-management">
        <Header isAuthorized={this.state.isLogin} />
        <div className="container">
          <div className="user-list row">
            <div className="car-list-header col-md-12">ACL Permission</div>
            <div className="col-md-12 user-list-table-container">
              <div className="row">
                {/* <div className="col-md-12">{this.renderTableRowActions()}</div> */}

                {this.state.loadingSpinner ? (
                  <div className="col-md-12">
                    <ReactTable
                      className="user-list-table table-striped mt-3"
                      data={this.state.data}
                      columns={this.userListColumn()}
                      defaultPageSize={2}
                      id="table-to-xls"
                      showPagination={false}
                    />
                  </div>
                ) : (
                  <div
                    style={{ position: "absolute", top: "50%", left: "50%" }}
                  >
                    <FadeLoader
                      height={15}
                      width={5}
                      margin="2px"
                      radius={2}
                      color="#ffffff"
                    />
                  </div>
                )}
                {this.state.openModal ? (
                  <IssueModal
                    openFlag={this.state.openModal}
                    onCloseModal={this.closeIssueModal}
                    classList="modal-acl-notification"
                    content={this.NotificationModal()}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserManagement;
