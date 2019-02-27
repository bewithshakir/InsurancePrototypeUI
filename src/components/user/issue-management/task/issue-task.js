// Library imports
import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
// Images import
import userImage from "../../../../assets/images/issue-task-24-px.svg";
import chatBubble from "../../../../assets/images/outline-chat-bubble-24-px.svg";
import viewCarDetail from "../../../../assets/images/view-car-details.svg";

export default class Task extends Component {
  state = {
    aclCount: 0
  };
  componentWillMount = () => {
    let aclCount = this.props.task.acl + this.props.task.collideACL;
    this.setState({ aclCount: aclCount });
  };
  openCarDetails = () => {
    const url = `/carDetails1/${this.props.task.vin}`;
    window.open(url, "_blank");
  };
  render = () => {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {provided => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            className="issue-card"
          >
            {this.props.task.status !== "NEW ISSUE" ? (
              <div className="row">
                <div className="col-md-3">
                  <img
                    style={{ paddingTop: 15 + "px", paddingLeft: 15 + "px" }}
                    src={userImage}
                  />
                </div>
                <div className="col-md-9">
                  <div style={{ marginTop: 15 + "px" }}>Jaksom M</div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-12">
                  <img
                    style={{ paddingTop: 15 + "px", paddingLeft: 15 + "px" }}
                    src={userImage}
                  />
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-md-12">
                <div className="issue-content">
                  Insurance claim request <br />
                  <span>
                    Vin - {this.props.task.vin} <br />
                  </span>
                  {this.props.task.collideVin !== 0 ? (
                    <span>
                      Vin -{this.props.task.collideVin} <br />
                    </span>
                  ) : null}
                  met with an accident
                </div>
              </div>
            </div>
            {this.props.task.status !== "NEW ISSUE" ? (
              <div className="row">
                <div className="col-md-9">
                  <div className="issue-category">Insurance Claim Request</div>
                </div>
                <div className="col-md-3">
                  <img
                    src={viewCarDetail}
                    className="view-issue"
                    onClick={this.openCarDetails}
                  />
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-12">
                  <div className="issue-category">Insurance Claim Request</div>
                </div>
              </div>
            )}
            {this.props.task.status !== "NEW ISSUE" ? (
              <div className="row issue-footer">
                <div className="col-md-4">
                  <span className="issue-acl">ACL</span>
                  <span className="issue-acl-count">{this.state.aclCount}</span>
                </div>
                <div className="col-md-8">
                  {/* <span className="issue-comments-icon"></span> */}
                  <img src={chatBubble} />
                  <span className="issue-comments-count">2</span>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </Draggable>
    );
  };
}
