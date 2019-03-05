// Library imports
import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { FadeLoader } from "react-spinners";
import axios from "axios";
// Compoonent imports
import Header from "../../../../shared/header/header.js";
import IssueColumn from "../column/issue-column";
import IssueModal from "../modal/form";
import IssueHeader from "../header/issue-headers";
// Services Import
import pushNotificationService from "../../services/pushNotificationService.js";
// SCSS Import
import {} from "../_issueManagement.scss";
// Static Data Import - will be removed after end to end Integration
import initialData from "../initial-data";

class IssueManagement extends Component {
  state = {
    loadingSpinner: false,
    aclRequestModal: false,
    aclVinToshow: "",
    notificationSuccessModal: false,
    notificationFailureModal: false,
    aclToken: ""
  };
  componentDidMount = () => {
    axios
      .get("https://jwrr2fa8mf.execute-api.us-east-1.amazonaws.com/p3/incident")
      .then(response => {
        this.setState({ loadingSpinner: true });
        this.createDNDData(response);
      })
      .catch(err => {
        // console.log("ERROR :: " + err);
        this.setState({ loadingSpinner: true });
      });
  };
  // This method creates the Drag and Drop Data in the required format
  createDNDData = response => {
    const tasks = {};
    const columns = {
      "column-1": {
        id: "column-1",
        title: "NEW ISSUE",
        taskIds: []
      },
      "column-2": {
        id: "column-2",
        title: "ASSIGNED",
        taskIds: []
      },
      "column-3": {
        id: "column-3",
        title: "REVIEW",
        taskIds: []
      },
      "column-4": {
        id: "column-4",
        title: "DONE",
        taskIds: []
      }
    };
    response.data.map(task => {
      tasks[task.id] = task;
      switch (task.status) {
        case "NEW ISSUE":
          columns["column-1"].taskIds.push(task.id);
          break;
        case "ASSIGNED":
          columns["column-2"].taskIds.push(task.id);
          break;
        case "REVIEW":
          columns["column-3"].taskIds.push(task.id);
          break;
        case "DONE":
          columns["column-4"].taskIds.push(task.id);
          break;
        default:
          console.warn("Incorrect Status");
          break;
      }
    });
    const initialData = {
      tasks: tasks,
      columns: columns,
      columnOrder: ["column-1", "column-2", "column-3", "column-4"]
    };
    this.setState({ ...initialData });
  };
  // This method is used to send notification to the user for ACL request
  raiseRequest = event => {
    this.closeIssueModal(false);
    let vin = this.state.aclVinToshow;
    let token = this.state.aclToken;
    let postData = {
      notification: {
        title: "Notification",
        body: "Notification for permission from car list with vin number" + vin,
        click_action:
          "http://ec2-18-206-226-75.compute-1.amazonaws.com/permission/" + vin
      },
      to: token
    };
    pushNotificationService
      .pushMessageToMobile(postData)
      .then(res => {
        console.log(res.data.success);
        this.setState({ notificationSuccessModal: true });
      })
      .catch(err => {
        console.log(err);
        this.setState({ notificationFailureModal: true });
      });
  };
  // This method is triggered when the Drag ends
  onDragEnd = result => {
    this.setState({ loadingSpinner: false });
    const { destination, source, draggableId } = result;
    if (!destination) {
      this.setState({ loadingSpinner: true });
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      this.setState({ loadingSpinner: true });
      return;
    }
    if (this.checkStatus(result)) {
      this.updateStatusToBE(result);
      this.setState({ aclRequestModal: false });
      const start = this.state.columns[source.droppableId];
      const finish = this.state.columns[destination.droppableId];
      if (start === finish) {
        const newTasksIds = Array.from(start.taskIds);
        newTasksIds.splice(source.index, 1);
        newTasksIds.splice(destination.index, 0, draggableId);
        const newColumn = {
          ...start,
          taskIds: newTasksIds
        };
        const newState = {
          ...this.state,
          columns: {
            ...this.state.columns,
            [newColumn.id]: newColumn
          }
        };
        this.setState(newState);
        return;
      }
      const startTasksIds = Array.from(start.taskIds);
      startTasksIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTasksIds
      };

      const finishTasksIds = Array.from(finish.taskIds);
      finishTasksIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTasksIds
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      };
      newState.tasks[draggableId].status =
        newState.columns[destination.droppableId].title;
      this.setState(newState);
      return;
    } else {
      this.showIssueModal(result);
    }
  };
  // This method open the modal window for raising ACL Requests
  showIssueModal = result => {
    let vinACL = this.state.tasks[result.draggableId].acl
      ? this.state.tasks[result.draggableId].collideVin
      : this.state.tasks[result.draggableId].vin;
    let aclToken = this.state.tasks[result.draggableId].acl
      ? this.state.tasks[result.draggableId].collideCarToken
      : this.state.tasks[result.draggableId].mainCarToken;
    if (vinACL !== 0) {
      this.setState({ aclRequestModal: true });
      this.setState({
        aclVinToshow: vinACL,
        aclToken: aclToken
      });
    } else {
      this.setState({ loadingSpinner: true });
    }
  };
  // This method closes the modal window for raising ACL Requests
  closeIssueModal = flag => {
    this.setState({ aclRequestModal: flag });
    this.setState({ loadingSpinner: true });
  };
  // This method opens the success notification of ACL Requests
  closeSuccessNotificationModal = flag => {
    this.setState({ notificationSuccessModal: flag });
    this.setState({ loadingSpinner: true });
  };
  // This method opens the failure notification of ACL Requests
  closeFailureNotificationModal = flag => {
    this.setState({ notificationFailureModal: flag });
    this.setState({ loadingSpinner: true });
  };
  // This method checks the ACL for both the vehicles
  checkStatus = result => {
    switch (result.destination.droppableId) {
      case "column-3":
        let carCount = this.getCarCount(result);
        let collideACL = this.state.tasks[result.draggableId].collideACL;
        let acl = this.state.tasks[result.draggableId].acl;
        let combinedACL = false;
        if (carCount === 1) {
          combinedACL = acl;
        } else {
          combinedACL = acl && collideACL;
        }
        if (combinedACL) {
          return true;
        } else {
          return false;
        }
      case "column-1":
      case "column-2":
      case "column-4":
      default:
        return true;
    }
  };

  getCarCount = result => {
    return this.state.tasks[result.draggableId].collideVin === 0 ? 1 : 2;
  };
  // This method updates the status to the backend server
  updateStatusToBE = result => {
    const updateData = {
      accId: this.state.tasks[result.draggableId].accId,
      incidentId: this.state.tasks[result.draggableId].incidentId,
      incidentStatus: this.state.columns[result.destination.droppableId].title,
      assignedTo: "Jaksom M",
      updateDateTime: new Date()
    };
    axios
      .put(
        "https://jwrr2fa8mf.execute-api.us-east-1.amazonaws.com/p3/incident",
        updateData
      )
      .then(response => {
        this.setState({ loadingSpinner: true });
      });
  };
  // This method opens the Modal for raising requests
  IssueModal = () => {
    return (
      <div className="row issue-modal-content">
        <div className="col-md-4">
          <div className="issue-acl-text">ACL FOR VIN</div>
        </div>
        <div className="col-md-5 ">
          <div className="issue-vin">{this.state.aclVinToshow}</div>
        </div>
        <div className="col-md-3">
          <div className="issue-category" onClick={this.raiseRequest}>
            REQUEST
          </div>
        </div>
      </div>
    );
  };
  // This method opens the notification Modal
  NotificationModal = () => {
    if (this.state.notificationFailureModal) {
      return (
        <div className="row issue-modal-content-acl">
          <span>ACL permission notification couldn't be sent.</span>
        </div>
      );
    } else {
      return (
        <div className="row issue-modal-content-acl">
          <span>ACL permission notification has been sent.</span>
        </div>
      );
    }
  };
  render = () => {
    return (
      <div className="issue-management">
        <Header isAuthorized={this.state.isLogin} />
        <div className="container">
          <div className="issue-list-header col-md-12">
            Issue Management Dashboard
          </div>
          {this.state.loadingSpinner ? (
            <div>
              <div className="row issue-records-details">
                <div className="issue-list-sub-header col-md-12">
                  Showing{" "}
                  {this.state.tasks && Object.keys(this.state.tasks).length} of{" "}
                  {this.state.tasks && Object.keys(this.state.tasks).length}
                </div>
                {/*  <div className="issue-list-sub-header col-md-3">
                  Add the search here
                </div> */}
              </div>
              <IssueHeader />
              <DragDropContext onDragEnd={this.onDragEnd}>
                <div>
                  <div className="row issue-data">
                    {this.state.columnOrder &&
                      this.state.columnOrder.map(columnId => {
                        const column = this.state.columns[columnId];
                        const tasks = column.taskIds.map(
                          taskId => this.state.tasks[taskId]
                        );
                        return (
                          <IssueColumn
                            key={column.id}
                            column={column}
                            tasks={tasks}
                          />
                        );
                      })}
                  </div>
                </div>
              </DragDropContext>
            </div>
          ) : (
            <div style={{ position: "absolute", top: "50%", left: "50%" }}>
              <FadeLoader
                height={15}
                width={5}
                margin="2px"
                radius={2}
                color="#ffffff"
              />
            </div>
          )}
        </div>

        {this.state.aclRequestModal ? (
          <IssueModal
            openFlag={this.state.aclRequestModal}
            aclVinToshow={this.state.aclVinToshow}
            onCloseModal={this.closeIssueModal}
            content={this.IssueModal()}
          />
        ) : null}

        {this.state.notificationSuccessModal ? (
          <IssueModal
            openFlag={this.state.notificationSuccessModal}
            onCloseModal={this.closeSuccessNotificationModal}
            classList="modal-acl-notification"
            content={this.NotificationModal()}
          />
        ) : (
          <IssueModal
            openFlag={this.state.notificationFailureModal}
            onCloseModal={this.closeFailureNotificationModal}
            classList="modal-acl-notification"
            content={this.NotificationModal()}
          />
        )}
      </div>
    );
  };
}

export default IssueManagement;
