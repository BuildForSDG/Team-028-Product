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

let projectName="";
const dateFormat = "YYYY/MM/DD";
class CreateApplication extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        description: "",
        projectName:"",
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
        .post("http://localhost:4000/fund/apply")
        .then((data) => {
          if ((data.status === "success")) {
        this.setState({ success: "Application Successfully created!" });
              /*  this.setState({ data: data});*/
          } else {
            this.setState({ error: "Error creating Application" });
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
        <div className="content-text"><h5>Apply for Funds</h5></div>
        <Row>
          
          <Col md="12">
          <form name="create-fundApplication" id="createfundApplication">
                  <div class="form-row" controlId="ProjectId">
                    <div class="form-group col-md-12">
        <label for="inputTeam">Project name: <h4>{projectName}</h4></label>
                      
                    </div>
          </div>
          <div class="form-row" controlId="ProposalName">
                    <div class="form-group col-md-6">
                      <label for="ProposalName">Name of Project</label>
                      <input type="text" class="form-control" id="ProposalName" name="ProposalName" />
                    </div>                   
                    <div class="form-group col-md-6">
                   
                      <label for="startDate">Start Date</label>
                      <DatePicker id="startDate" defaultValue={moment("2020/01/01", dateFormat)} format={dateFormat} />
                     
                      <label for="endDate">End Date</label>
                      <DatePicker id="endDate" defaultValue={moment("2020/01/01", dateFormat)} format={dateFormat} />
                      
                    </div>   
                      </div>
          <Form.Label>Brief description of Project</Form.Label>
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
                      <div class="form-row" controlId="fileUpload">
                    <div class="form-group col-md-12">
                      <label for="fileUpload">Upload Project Proposal</label>
                      <input type="file" class="form-control" id="fileUpload" name="fileUpload" />
                    </div>                   
                   
                      </div>
                 <br></br>
                  <Button variant="primary" type="submit" onClick={this.handleClick}>
                  Create Application
              </Button>
            </form>
          </Col>
        </Row>
      </Card.Body>
    );
  }
}
export default CreateApplication;