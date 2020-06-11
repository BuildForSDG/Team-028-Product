/* eslint-disable no-unused-vars */
/* eslint-disable no-multi-str */
/* eslint-disable no-console */
/* eslint no-console: "error" */
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import axios from "axios";
import { Modal } from "antd";
import "../../../../styles/modal.css";
const dateFormat = "YYYY/MM/DD";

class UpdateMilestone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      success: "",
      error: "",
      redirect: null
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.closeMilestone = this.closeMilestone.bind(this);
    this.handleMilestoneUpdate = this.handleMilestoneUpdate.bind(this);
  }

  closeMilestone() {
    this.props.closeModal();
  }

  handleMilestoneUpdate(event) {
    this.props.updateMilestone(event);
  }

  handleEditorChange(e) {
    this.setState({ description: e.target.getContent() });
  }
  handleClick(e) {
    e.preventDefault();
    // Make api call with form
    axios
      .post("https://eazsme-backend.herokuapp.com/milestones/id")
      .then((data) => {
        if (data.status === "success") {
          this.setState({ success: "Milestoned Successfully Updated!" });
          /*  this.setState({ data: data});*/
        } else {
          this.setState({ error: "Error Updating Milestone" });
        }
      })
      .catch((error) => console.log(error));
  }
  render() {
    const success = this.props.success;
    const error = this.props.error;

    return (
      <>
        {/** Update Modal */}
        <Modal
          size="md"
          show={this.props.showModal}
          onHide={this.closeMilestone}
          dialogClassName="modal-70w"
          aria-labelledby="UpdateMilestone"
          bsPrefix="modal"
        >
          <Modal.Header closeButton bsPrefix="modal-header">
            <Modal.Title id="UpdateMilestone" className="text-light">
              Update Milestones
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {success ? (
              <div className="text-bold text-success">
                <h5>{success}</h5>
              </div>
            ) : (
              <div className="text-bold text-success">
                <h5>{error}</h5>
              </div>
            )}

            <Form name="updateMilestone">
              <Form.Text className="text-danger h4 d-none" bsPrefix="form-text">
                Fields mark * are required
              </Form.Text>
              <h5 className="form-section-text">Milestone Tracker</h5>
              <hr></hr>
              <Row>
                <Col>
                  <Form.Group controlId="Progress">
                    <Form.Label className="font-weight-bold">
                      Enter Progress<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter Milestone Project" required name="Progress" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="status">
                    <Form.Label className="font-weight-bold">
                      Last Name<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter Milestone Status" required name="status" />
                  </Form.Group>
                </Col>
              </Row>
              <br></br>

              <Button variant="success" type="submit" className="btn-block" onClick={this.handleClick}>
                Update Milestone
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default UpdateMilestone;
