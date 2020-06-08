/* eslint-disable no-unused-vars */
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


class CreateEligibility extends React.Component {
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
      // Make api call with form
      
      axios
        .post("http://localhost:4000/create-eligibility")
        .then((data) => {
          if ((data.status === "success")) {
        this.setState({ success: "User Successfully created!" });
              /*  this.setState({ data: data});*/
          } else {
            this.setState({ error: "Error creating User" });
          }
        })
        .catch((error) => console.log(error));
    }

render() {
    const success= this.state.success;
    const error= this.state.error;
    return (
      <Card.Body>
        {success ? (
          <Form.Text className="text-bold text-success">{success}</Form.Text>
        ) : (
          <Form.Text className="text-bold text-danger">{error}</Form.Text>
        )}
        <div className="content-text"><h6>Add Eligibility Criteria to Projects</h6></div>
        <Row>
          
          <Col md="12">
          <form name="create-eligibility" id="createEligibility">
                  <div class="form-row" controlId="ProjectId">
                    <div class="form-group col-md-12">
                    <label for="inputTeam">Select Project</label>
                      <select id="inputState" class="form-control" name="userTeam">
                        <option selected>Choose...</option>
                        <option>Fertilizer Distribution</option>
                        <option>Maize Farming</option>
                        <option>Project 1</option>
                        <option>Project 2</option>
                        
                      </select>
                    </div>
          </div>
          <Form.Label>Criteria details</Form.Label>
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
                />
                 <br></br>
                  <Button variant="primary" type="submit" onClick={this.handleClick}>
                  Create Criteria
              </Button>
            </form>
          </Col>
        </Row>
      </Card.Body>
    );
  }
}
export default CreateEligibility;