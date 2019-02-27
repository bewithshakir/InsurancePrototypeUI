import React, { Component } from "react";
import axios from "axios";
import "./_userForm.scss";

class userForm extends Component {
  constructor() {
    super();
    this.state = {
      isapproved: false,
      isVideoApproved: false,
      isMapApproved: false,
      isChartsApproved: false,
      isFormApproved: false
    };
  }
  updateRejectState = event => {
    // console.log("ee" + e);
    // this.setState({ isapproved: e });
    // console.log("approved", this.state.isapproved);

    //this.handleSubmit(true)
    /* setTimeout(() => {
      this.handleSubmit(event);
    }, 1000); */
    this.updatestate()
      .then(res => {
        console.log("in reject");
        this.handleSubmit(event);
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  updatestate() {
    return new Promise((resolve, reject) => {
      this.setState({
        isVideoApproved: false,
        isMapApproved: false,
        isChartsApproved: false,
        isFormApproved: false
      });
      resolve();
    });
  }
  updateVideoState = () => {
    this.setState({
      isVideoApproved: !this.state.isVideoApproved,
      isMapApproved: !this.state.isMapApproved
    });
  };

  // updateMapState() {
  //   this.setState({
  //     isMapApproved: !this.state.isMapApproved,
  //     isVideoApproved: !this.state.isVideoApproved
  //   });
  // }

  updateChartsState = () => {
    this.setState({ isChartsApproved: !this.state.isChartsApproved });
  };
  handleSubmit(e) {
    e.preventDefault();
    console.log("form submit");
    axios
      .post(
        "https://qjn410lo43.execute-api.us-east-1.amazonaws.com/prototype",
        {
          vin: this.props.match.params.vin,
          // permission: this.state.isapproved ? true : false
          video_enabled: this.state.isVideoApproved ? true : false,
          map_enabled: this.state.isMapApproved ? true : false,
          speed_enabled: this.state.isChartsApproved ? true : false
        }
      )
      .then(response => {
        console.log("response data", response.data);
      })
      .catch(err => {
        console.log("ERROR : " + err);
      });
    this.updatestate()
      .then(res => {
        console.log("in reject");
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  updateFormState = () => {
    this.setState({ isFormApproved: !this.state.isFormApproved });
  };
  render() {
    console.warn(
      "in video check",
      this.state.isVideoApproved + " " + this.state.isMapApproved
    );
    return (
      <div>
        <div className="container custom-form-modal-theme">
          <div className="row custom-form-header">
            <div className="col-md-12">Data Access Permission</div>
          </div>
          <form onSubmit={e => this.handleSubmit(e)}>
            <div className="row custom-form-modal">
              <div className="col-md-12 custom-form-modal-header custom-form-modal-content">
                VIN {this.props.match.params.vin}
              </div>

              <div className="col-md-12 custom-form-modal-content custom-align">
                <span className="text-style-1">ABC Inusrance Co.</span>
                <span className="text-style-2 text-style-3">
                  ,with whom you have your car insured seeks your permission for
                  accessing data captured by the car for the purpose of
                  assessing and evaluating your insurance claim. The insurance
                  company will have viewing rights only. You may choose to
                  provide access to your data on basis of following categories.
                  Please go through the options in details before giving
                  approval. You may also choose to deny access completely.
                </span>
              </div>
              <div className="col-md-12 custom-form-modal-content custom-align">
                <span className="text-style-2 text-style-3">
                  Car Details: VIN - {this.props.match.params.vin}
                </span>
              </div>
              <div className="col-md-12 custom-form-modal-content custom-align">
                <div className="check-boxes">
                  <div className="form-group form-check custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="form-check-input custom-control-input"
                      id="exampleCheck1"
                      checked={this.state.isVideoApproved}
                      onChange={this.updateVideoState}
                    />
                    <label
                      className="form-check-label custom-control-label"
                      htmlFor="exampleCheck1"
                    >
                      Video and Location
                    </label>
                  </div>

                  <div className="form-group form-check custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="form-check-input custom-control-input"
                      id="exampleCheck3"
                      checked={this.state.isChartsApproved}
                      onChange={this.updateChartsState}
                    />
                    <label
                      className="form-check-label custom-control-label"
                      htmlFor="exampleCheck3"
                    >
                      Sensor Data
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-12 custom-form-modal-content custom-align">
                <div className="row">
                  <div className="col-8">
                    <div className="check-boxes">
                      <div className="form-group form-check custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="form-check-input custom-control-input"
                          id="exampleCheck10"
                          checked={this.state.isFormApproved}
                          onChange={this.updateFormState}
                        />
                        <label
                          className="form-check-label custom-control-label"
                          htmlFor="exampleCheck10"
                        >
                          I have gone through details and understand the Terms
                          and Conditions.
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <button
                      className={
                        "access-request-btn btn-cancel " +
                        (this.state.isFormApproved ? "" : "disabled")
                      }
                      onClick={e => this.updateRejectState(e)}
                      data-toggle="modal"
                      data-target="#exampleModal1"
                      disabled={!this.state.isFormApproved}
                    >
                      REJECT
                    </button>
                    <div
                      className="modal fade"
                      id="exampleModal1"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Access request is rejected successfully.
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <button
                      type="submit"
                      className={
                        "access-request-btn btn-access " +
                        (this.state.isFormApproved ? "" : "disabled")
                      }
                      data-toggle="modal"
                      data-target="#exampleModal"
                      disabled={!this.state.isFormApproved}
                    >
                      ACCEPT
                    </button>
                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Your request is approved and please refresh the
                              Car-details page.
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default userForm;
