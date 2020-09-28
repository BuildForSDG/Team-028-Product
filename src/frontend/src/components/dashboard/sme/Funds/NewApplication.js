

import React from "react";
import { connect } from "react-redux";

import { Card, Form, Button, Row, Col} from "react-bootstrap";

import { Editor } from "@tinymce/tinymce-react";
import serialize from "form-serialize";

import { fetch } from "../../../../redux/actionCreators";
import * as Types from "../../../../redux/types";

class CreateApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizationId: "",
      projectId: "",
      description: "",
      projectName: "",
      dateStart: "",
      dateEnd: "",
      proposals: null,
      status: "",
      message: ""
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmitForm = this.submitForm.bind(this);
    this.selectedFileHandler = this.selectedFileHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.setState({ projectId: this.props.location.query, status: "", message:"" });
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
    this.setState({ description: e.target.getContent({format : "text"}) });
  };

  /**
   * Note; Organization Id is suppose to be retrieved from login details
   * A random number is set as organization id just for demonstration purpose
   */

  submitForm = (e) => {
    e.preventDefault();

    const { user, dispatch} = this.props;

    const form = document.querySelector(`form[name="create-fundApplication"]`);
    const formFields = serialize(form, { hash: true }); 
    formFields.projectId = this.state.projectId;
    formFields.organizationId = user.organizationId;
    formFields.description=this.state.description;

    const applyForFund = fetch({
      url: "/fund/apply",
      method: "post",
      data: formFields,
      onSuccess: ""
    });

    dispatch(applyForFund).then(()=>{
      const { status, message } = this.props.request;

      this.setState({ status ,message });
    });
  };

  render() {
    //const { projectName, dateStart, dateEnd, success, error } = this.state;
    const { status, message } = this.state;
    return (
      <Card.Body>
       
        <div className="content-text">
          <h5>Apply for Funds</h5>
        </div>
        <Row>
          <Col md="12">
          {status === "success" ? (
              <div className="text-bold text-success">
                <h5>{message}</h5>
              </div>
            ) : (
              <div className="text-bold text-success">
                <h5>{message}</h5>
              </div>
            )}
            <form name="create-fundApplication" id="createfundApplication">
              <div className="form-row" controlId="ProjectId">
                <div className="form-group col-md-12">
                  <label>
                    Project name: <h4>{this.state.projectName}</h4>
                  </label>
                </div>
              </div>
              <div className="form-row" controlId="projectName">
                <div className="form-group col-md-8">
                  <label htmlFor="projectName">Name of Project</label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectName"
                    name="projectName"
                    value={this.state.projectName}
                    onChange={this.handleChange}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label htmlFor="startDate">Start Date </label>
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
                <div className="form-group col-md-6">
                  <label htmlFor="endDate">End Date </label>
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
              <div className="form-row" controlId="proposals">
                <div className="form-group col-md-12">
                  <label htmlFor="proposals">Upload Project Proposal</label>
                  <input
                    type="file"
                    className="form-control"
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

const mapStateToProps = (state) => {
  return {
    request: state.request
  }
}

export default connect(mapStateToProps)(CreateApplication);
