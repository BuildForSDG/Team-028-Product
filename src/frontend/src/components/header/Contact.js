/* eslint-disable quotes */
/*eslint quotes: ["error", "double"]*/
/*eslint-env es6*/

import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router";
import "../../styles/modal.css";

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null
    };
    this.handleContact = this.handleContact.bind(this);
    this.closeContact = this.closeContact.bind(this);
  }

  submitContact(e) {
    e.preventDefault();
    const required = document.querySelectorAll(`input[required]`);
    // Check if all the fields are filled
    required.forEach((element) => {
      if (element.value === "") {
        this.logFormText.current.classList.remove("d-none");
        return;
      }
    });
  }

  closeContact() {
    this.props.closeModal();
  }

  handleContact(e) {
    this.setState({ show: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <>
        {/*** Contact Modal */}
        <Modal
          size="xl"
          show={this.props.showModal}
          onHide={this.closeContact}
          dialogClassName="modal-90w"
          aria-labelledby="login"
          bsPrefix="modal"
        >
          <Modal.Header closeButton bsPrefix="modal-header">
            <Row>
              <Col className="text-center pr-1">
                <Modal.Title id="login" className="text-light">
                  Contact us, use the form below.
                </Modal.Title>
              </Col>
            </Row>
          </Modal.Header>
          <Modal.Body bsPrefix="modal-body">
            <form action="" name="contact">
              <Row>
                <Col>
                  <Form.Group controlId="formBasicText1">
                    <Form.Label className="font-weight-bold">
                      Full Name<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter full name" required name="fullName" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicText2">
                    <Form.Label className="font-weight-bold">
                      Email Address<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control type="email" placeholder="Enter mail address" required name="email" />
                  </Form.Group>
                </Col>
              </Row>

              <Col lg="12">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label className="font-weight-bold">
                    Message<sup className="text-danger">*</sup>
                  </Form.Label>
                  <Form.Control as="textarea" rows="7" cols="" required name="address" />
                </Form.Group>
              </Col>

              <Button variant="success" type="submit" className="btn-block" onClick={this.submitContact}>
                Submit
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Contact;
