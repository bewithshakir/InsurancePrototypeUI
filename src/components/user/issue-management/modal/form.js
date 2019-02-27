// Library imports
import React, { Component } from "react";
import Modal from "react-responsive-modal";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
class IssueModal extends Component {
  state = {
    openFlag: this.props.openFlag
  };

  onOpenModal = () => {
    this.setState({ openFlag: true });
  };
  componentWillReceiveProps = nextProps => {
    if (nextProps.openFlag !== this.props.openFlag) {
      //Perform some operation
      this.setState({ openFlag: nextProps.openFlag });
    }
  };
  onCloseModal = () => {
    this.setState({ openFlag: false });
    this.props.onCloseModal(false);
  };
  render = () => {
    return (
      <div style={styles}>
        <Modal
          open={this.state.openFlag}
          onClose={this.onCloseModal}
          classNames={{ modal: this.props.classList }}
          center
        >
          {this.props.content}
        </Modal>
      </div>
    );
  };
}

export default IssueModal;
