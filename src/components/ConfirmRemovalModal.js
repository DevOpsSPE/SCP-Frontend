import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";
import swal from 'sweetalert'
import axios from "axios";
import {Redirect} from 'react-router-dom';

import { API_URL } from "../constants";

class ConfirmRemovalModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  deleteStudent = pk => {
    axios.delete(API_URL + pk).then(() => {
      this.props.resetState();
      this.toggle();
    });
    swal ("Success!", "Deleted your entry", "success")

  };

  call1 = pk => {
       if(localStorage.getItem("role")==="student")
        {
            swal({
  title: 'Hold On!',
  text: 'you are not admin to perform this operation!',
  icon: 'warning',
})           
            return <Redirect to="/mockSchedule"></Redirect>;
        }
        this.toggle()
  }

  render() {
    return (
      <Fragment>

        <Button color="danger" onClick={() => this.call1(this.props.pk)}>
          Remove
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Do you really want to delete the student?
          </ModalHeader>

          <ModalFooter>
            <Button type="button" onClick={() => this.toggle()}>
              Cancel
            </Button>
            <Button
              type="button"
              color="primary"
              onClick={() => this.deleteStudent(this.props.pk)}
            >
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default ConfirmRemovalModal;
