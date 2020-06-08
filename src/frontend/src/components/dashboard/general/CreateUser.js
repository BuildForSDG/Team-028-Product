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
import Image from "react-bootstrap/Image";
import { Editor } from "@tinymce/tinymce-react";
import serialize from "form-serialize";
import axios from "axios";

const dateFormat = "YYYY/MM/DD";
class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      success: "",
      error: ""
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleEditorChange(e) {
    this.setState({ description: e.target.getContent() });
  }

  handleClick(e) {
    e.preventDefault();
    const form = document.querySelector(`form[name="create-user"]`);
    const formFields = serialize(form, { hash: true }); // Make api call with form
    console.log(formFields);
    axios
      .post("http://localhost:4000/create-user", formFields)
      .then((data) => {
        if ((data.status === "success")) {
          this.setState({ success: "User Successfully created!" });
        } else {
          this.setState({ error: "Error creating User" });
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { success, error } = this.state;
    return (
      <Card.Body>
        {success ? (
          <Form.Text className="text-bold text-success">{success}</Form.Text>
        ) : (
          <Form.Text className="text-bold text-danger">{error}</Form.Text>
        )}
        <div className="content-text"><strong>Create a User and Assign Role</strong></div>
        <hr></hr>
        <Row>
          {/* <Col md="3" className="img-holder">
          <div class="text-center">
            <img src="https://res.cloudinary.com/lordefid/image/upload/c_scale,h_200/v1567112037/220190826_163351912_r9yfcl.jpg" class="rounded" alt="..." fluid />
          </div>
          </Col> */}
          <Col md="12">
          <form name="create-user" id="createUser">
                  <div class="form-row" controlId="userFirstName">
                    <div class="form-group col-md-6">
                      <label for="inputEmail4">First Name</label>
                      <input type="text" class="form-control" id="inputFirstName" name="userFirstName" />
                    </div>
                    <div class="form-group col-md-6" controlId="userLastName">
                      <label for="InputName">Last Name</label>
                      <input type="text" class="form-control" id="inputName" name="userLastName" />
                    </div>
                  </div>
                  <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="inputAddress">Email Address</label>
                    <input type="email" class="form-control" id="inputEmail" name="userEmail" />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputAddress">Address</label>
                    <input type="text" class="form-control" id="inputAddress" name="userAddress" />
                  </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputPhone">Phone</label>
                      <input type="phone" class="form-control" id="inputPhone" name="userPhone" />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputTeam">Assign Project to Supervise</label>
                      <select id="inputState" class="form-control" name="userTeam">
                        <option selected>Choose...</option>
                        <option>Project 1</option>
                        <option>Project 2</option>
                        
                      </select>
                    </div>
                  </div>
                  <div class="form-row">
                  <div class="form-group col-md-6">
                      <label for="inputState">Assign Supervisor</label>
                      <select id="inputState" class="form-control">
                        <option selected>Choose...</option>
                        <option>Mr. John Rock</option>
                        <option>Dr. Iket Ubong</option>
                        <option>James Brown</option>
                        <option>Mrs Mary Adewale</option>
                        <option>Miss Angela Obi</option>
                      </select>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="inputState">Assign Role</label>
                      <select id="inputState" class="form-control">
                        <option selected>Choose...</option>
                        <option>Accountant</option>
                        <option>Adviser</option>
                        <option>Field Agent</option>
                        <option>Manager</option>
                        <option>Supervisor</option>
                      </select>
                    </div>
                    <div class="form-group col-md-2">
                      <label for="inputDate">Date</label><br></br>
                      <DatePicker defaultValue={moment("2015/01/01", dateFormat)} format={dateFormat} />
                    </div>
                  </div>
                  <Form.Group>
                <Form.Label>Task details</Form.Label>
                <Editor
                  apiKey="oym93hgea69gv4o5cjoxfc1baobo49f82d4ah9j66v3n955r"
                  initialValue={this.state.description}
                  init={{
                    height: 200,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image",
                      "charmap print preview anchor help",
                      "searchreplace visualblocks code",
                      "insertdatetime media table paste wordcount"
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic | \
                    alignleft aligncenter alignright | \
                    bullist numlist outdent indent | help"
                  }}
                  onChange={this.handleEditorChange}
                  name="description"
                /><br></br>

<h6 className="content-text">Create Login Details</h6>
<hr></hr>
<Row>
  <Col md="12">
    
    <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username for Login"
                  name="userName"
                 
                />
    </Form.Group>
  </Col>
  
</Row>
<Row>
  <Col>
    <Form.Group controlId="password1">
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
                  <Button variant="primary" type="submit" onClick={this.handleClick}>
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
