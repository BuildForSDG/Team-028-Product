/* eslint-disable no-multi-str */
/* eslint-disable no-console */
/* eslint no-console: "error" */

import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DatePicker } from "antd";
import moment from "moment";
import serialize from "form-serialize";
import axios from "axios";
import { connect } from "react-redux";

const dateFormat = "YYYY/MM/DD";
class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      userId: "",
      organizationId: "",
      success: "",
      error: ""
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
   
  componentDidMount(){
     const userObj = JSON.parse(localStorage.getItem("userObj"));
    if (userObj) {
      this.setState(() => ({ userObj }));
     
    }
  }

  handleEditorChange(e) {
    this.setState({ description: e.target.getContent() });
  }

  handleClick(e) {
    e.preventDefault();
    const form = document.querySelector(`form[name="create-user"]`);
    const formFields = serialize(form, { hash: true }); // Make api call with form
    formFields.category=this.state.userObj.category;
    formFields.organizationId=this.state.userObj.organizationId;

       axios
      .post("https://eazsme-backend.herokuapp.com/organizationUser", formFields)
      .then((data) => {
        
        if ((data.data.status === "success")) {
          this.setState({ success: "User Successfully created!" });
        } else 
        if ((data.data.status === "exist")) {
          this.setState({ success: "User already exist!" });
        }else
        {
          this.setState({ error: "Error creating User" });
        }
      })
      .catch((error) => {
        this.setState({ error: "Error creating User" });
      });
  }

  render() {
    //const { success, error } = this.state;
    const success = this.state.success;
    const error = this.state.error;
    return (
      <Card.Body>
      
        <div className="content-text"><strong>Create a User and Assign Role</strong></div>
        <hr></hr>
        <Row>
      
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
          <form name="create-user" id="createUser">
                  <div class="form-row" controlId="firstName">
                    <div class="form-group col-md-6">
                      <label for="firstName">First Name</label>
                      <input type="text" class="form-control" id="firstName" name="firstName" />
                    </div>
                    <div class="form-group col-md-6" controlId="lastName">
                      <label for="lastName">Last Name</label>
                      <input type="text" class="form-control" id="lastName" name="lastName" />
                    </div>
                  </div>
                  <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="email">Email Address</label>
                    <input type="email" class="form-control" id="email" name="email" />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputAddress">Address</label>
                    <input type="text" class="form-control" id="inputAddress" name="userAddress" />
                  </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="phoneNumber">Phone</label>
                      <input type="phone" class="form-control" id="phoneNumber" name="phoneNumber" />
                    </div>
                     <div class="form-group col-md-2">
                      <label for="inputDate">Date</label><br></br>
                      <DatePicker defaultValue={moment("2015/01/01", dateFormat)} format={dateFormat} />
                    </div>
                  </div>
                 
                  <div class="form-row">
              
                   
                  </div>
                  <Form.Group>
               
                <hr></hr>

<h6 className="content-text">Create Login Details</h6>
<hr></hr>

<Row>
  <Col>
    <Form.Group controlId="password">
      <Form.Text className="text-warning font-weight-bold">
        Password including numbers, special characters is advised
      </Form.Text>
      <Form.Label className="font-weight-bold">
        Password<sup className="text-danger">*</sup>
      </Form.Label>
      <Form.Control
        type="password"
        placeholder="Password"
        name="password"
        onChange={this.handlePasswordChange}
        required
      />
    </Form.Group>
  </Col>
  <Col>
    <Form.Group controlId="password2">
      <Form.Text className="text-warning font-weight-bold">
        Password including numbers, special characters is advised
      </Form.Text>
      <Form.Label className="font-weight-bold">
        Confirm Password<sup className="text-danger">*</sup>
      </Form.Label>
      <Form.Control
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        onChange={this.handlePasswordChange}
        required
      />
    </Form.Group>
  </Col>
</Row>
<br></br>
              </Form.Group>
                  <div class="form-group">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="gridCheck" />
                      <label class="form-check-label" for="gridCheck">
                        Confirm adding this User
                      </label>
                    </div>
                  </div>
                  <Button className="user-btn" variant="primary" type="submit" onClick={this.handleClick}>
                  Create User
              </Button>
            </form>
          </Col>
        </Row>
      </Card.Body>
    );
  }
}
export default Create;
