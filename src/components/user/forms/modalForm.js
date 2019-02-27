import React from "react";
import Modal from "react-responsive-modal";
import PropTypes from "prop-types";
import "../car-details/carDetail.scss";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class ModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.openPermissionForm = this.openPermissionForm.bind(this);
  }
  state = {
    open: false,
    vinnumber: 0
  };

  static contextTypes = {
    router: PropTypes.object
  };

  openPermissionForm() {
    //const vin = this.props.match.params.vin;
    const url = `/openform/${this.state.vinnumber}`;
    window.open(url, "_blank");
    // this.context.router.history.push(`/openform/${this.state.vinnumber}`);
  }

  onOpenModal = e => {
    this.setState({ vinnumber: e, open: true });
    //this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
    // Redirect to home page
    window.location = "/";
  };

  onModal = () => {
    //this.setState({ open: false });
  };
  render() {
    const { open } = this.state;
    return (
      <div style={styles}>
        <Modal
          open={open}
          onClose={this.onModal}
          closeOnEsc={false}
          showCloseIcon={false}
        >
          <div className="modal-content access-request-modal">
            {/* <div className="modal-header">
              <h4 className="modal-title" id="exampleModalLabel">
                Permission Access
              </h4>
            </div> */}
            <div className="modal-body access-request-modal-body">
              You do not have required rights to access the car details.
            </div>
            <div className="modal-footer">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <button
                      type="button"
                      className="access-request-btn btn-cancel"
                      data-dismiss="modal"
                      onClick={this.onCloseModal}
                    >
                      CANCEL
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button
                      type="button"
                      className="access-request-btn btn-access"
                      onClick={() => this.openPermissionForm()}
                    >
                      REQUEST ACCESS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ModalForm;
