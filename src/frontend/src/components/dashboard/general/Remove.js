/* eslint-disable no-console */
/* eslint no-console: "error" */

import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import axios from "axios";
import serialize from "form-serialize";

class Remove extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      success: "",
      error: ""
    };

    this.deactivate = this.deactivate.bind(this);
  }

  async deactivate(e) {
    e.preventDefault();

    const form = document.querySelector(`form[name="deactivate"]`);
    const formFields = serialize(form, {hash: true});

    await axios.post("https://eazsme-backend.herokuapp.com/deactivate-user", formFields)
    .then((data) => {
      if(data.status === "success") {
        this.setState({success: "User successfully deactivated!"});
      }else {
        this.setState({error: "Error deactivatiing user"});
      }
    })
  }

  render() {
    const { success, error } = this.state;
    return (
      <Card.Body>
        
        <Row>
          {/* <Col md="4">
            <Image src="holder.js/100px250" fluid />
          </Col> */}
          <Col md="12">

          {success ? (
              <div className="text-bold text-success">
                <h5>{success}</h5>
              </div>
            ) : (
              <div className="text-bold text-success">
                <h5>{error}</h5>
              </div>
            )}
            <Form name="deactivate">
              <Form.Group controlId="email">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter user name" name="email" />
              </Form.Group>

              <Button className="user-btn" variant="primary" type="submit" onClick={this.deactivate}>
                Deactivate User
              </Button>
            </Form>
          </Col>
        </Row>
      </Card.Body>
    );
  }
}
export default Remove;
