
/* eslint-disable no-multi-str */
/* eslint-disable no-console */
/* eslint no-console: "error" */
/*eslint quotes: ["error", "backtick"]*/
/*eslint-env es6*/
/* eslint no-console: "error" */



import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Editor } from "@tinymce/tinymce-react";
import serialize from "form-serialize";
import axios from "axios";

class CreateApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizationId: ``,
      projectId: ``,
      description: ``,
      projectName: ``,
      dateStart: ``,
      dateEnd: ``,
      proposals: null,
      success: ``,
      error: ``
      
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmitForm = this.submitForm.bind(this);
    this.selectedFileHandler = this.selectedFileHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.setState({ projectId: this.props.location.query });
   
      const userObj = JSON.parse(localStorage.getItem(`userObj`));
   if (userObj) {
     this.setState(() => ({ userObj }));
     
   }
 }


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  selectedFileHandler = (e) => {
    this.setState({
      proposals: e.target.files[0]
     
    });
    console.log( e.target.files[0]);
  };

  handleEditorChange = (e) => {
    this.setState({ description: e.target.getContent() });
  };

  /**
   * Note; Organization Id is suppose to be retrieved from login details
   * A random number is set as organization id just for demonstration purpose
   */

  submitForm = (e) => {
    e.preventDefault();
const form = document.querySelector(`form[name="create-fundApplication"]`);
const formFields = serialize(form, { hash: true }); 
formFields.projectId=this.state.projectId;
formFields.organizationId=this.state.userObj.organizationId;
formFields.description=this.state.description;

    axios
      .post(`https://eazsme-backend.herokuapp.com/fund/apply`, formFields)
      .then((res) => {
        let response = res.data;
        console.log(response.status);
        // then print response status
        if (response.status === `success`) {
          this.setState({ 
            success: `Application Created!`, 
            error:``,
           });
        } else {
          this.setState({ error: `Error creating Application` });
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    //const { projectName, dateStart, dateEnd, success, error } = this.state;
    const success = this.state.success;
    const error = this.state.error;
    return (
      <Card.Body>
       
        <div className="content-text">
          <h5>Apply for Funds</h5>
        </div>
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
            <form name="create-fundApplication" id="createfundApplication">
              <div class="form-row" controlId="ProjectId">
                <div class="form-group col-md-12">
                  <label for="inputTeam">
                    Project name: <h4>{this.state.projectName}</h4>
                  </label>
                </div>
              </div>
              <div class="form-row" controlId="projectName">
                <div class="form-group col-md-8">
                  <label for="projectName">Name of Project</label>
                  <input
                    type="text"
                    class="form-control"
                    id="projectName"
                    name="projectName"
                    value={this.state.projectName}
                    onChange={this.handleChange}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="startDate">Start Date </label>
                  <input
                    type="date"
                    id="dateStart"
                    name="dateStart"
                    value={this.state.dateStart}
                    // defaultValue={moment("2020/01/01", dateFormat)}
                    // format={dateFormat}
                    onChange={this.handleChange}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="endDate">End Date </label>
                  <input
                    type="date"
                    id="dateEnd"
                    name="dateEnd"
                    value={this.state.dateEnd}
                    // defaultValue={moment("2020/01/01", dateFormat)}
                    // format={dateFormat}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <Form.Label>Brief description of Project</Form.Label>
              <Editor
                controlId="description"
                name="description"
                apiKey="oym93hgea69gv4o5cjoxfc1baobo49f82d4ah9j66v3n955r"
                initialValue={this.state.description}
                onChange={this.handleEditorChange}
                init={{
                  height: 200,
                  menubar: false,
                  plugins: [
                    `charmap print preview anchor help`,
                    `searchreplace visualblocks code`,
                    `insertdatetime media table paste wordcount`
                  ],
                  toolbar:
                    `undo redo | formatselect | bold italic | \
                    alignleft aligncenter alignright | \
                    bullist numlist outdent indent | help`
                }}
              />
              <br></br>
              <div class="form-row" controlId="proposals">
                <div class="form-group col-md-12">
                  <label for="proposals">Upload Project Proposal</label>
                  <input
                    type="file"
                    class="form-control"
                    id="proposals"
                    name="proposals"
                    onChange={this.selectedFileHandler}
                  />
                </div>
              </div>
              <br></br>
              <Button variant="primary" type="submit" onClick={this.handleSubmitForm}>
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
