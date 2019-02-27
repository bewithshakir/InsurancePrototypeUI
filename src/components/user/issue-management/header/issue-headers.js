// Library imports
import React, { Component } from "react";
class IssueHeader extends Component {
  render = () => {
    return (
      <div className="row issue-header">
        <div className="col-md-3">
          <div className=" issue-cards-headers col-md-11">NEW ISSUE</div>
          <div className="col-md-1" />
        </div>
        <div className="col-md-3">
          <div className=" issue-cards-headers col-md-11">ASSIGNED</div>
          <div className="col-md-1" />
        </div>
        <div className="col-md-3">
          <div className=" issue-cards-headers col-md-11">REVIEW</div>
          <div className="col-md-1" />
        </div>
        <div className="col-md-3">
          <div className=" issue-cards-headers col-md-11">DONE</div>
          <div className="col-md-1" />
        </div>
      </div>
    );
  };
}

export default IssueHeader;
