
import React from "react";
import { connect } from "react-redux";

import { Card, Form, Button, Row, Col } from "react-bootstrap";

import { Editor } from "@tinymce/tinymce-react";
import { moment } from "moment"
import serialize from "form-serialize";
import axios from "axios";

import { fetch } from "../../../../redux/actionCreators";
import * as Types from "../../../../redux/types";

const dateFormat = "YYYY/MM/DD";

class CreateMilestone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      userD: [],
      description: ``,
      name: ``,
      startDate: null,
      endDate: ``,
      status: ``,
      message: ``,
      projectId: ``
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.getActiveProjects = this.getActiveProjects.bind(this);
    this.projectSelect=React.createRef();
  }


  componentDidMount() {
    this.getActiveProjects();
  }

  getActiveProjects() {
    const { projects } = this.props;

    const fundedProjects = projects.filter((item) => {
      return item.fund === `funded`;
    });

    this.setState({projects: fundedProjects}, () => {
      const select = this.projectSelect.current;

      const { projects } = this.state;
      const data = projects;

      // based on type of data is array
      for (let i = 0; i < data.length; i++) {
        const option = document.createElement(`option`);
        option.innerText = data[parseInt(i,10)].projectName;
        option.name = data[parseInt(i,10)].projectName;
        option.value = data[parseInt(i,10)].projectId;
        select.appendChild(option);
      }
    });
  }

  handleEditorChange(e) {
    this.setState({ description: e.target.getContent({format : "text"}) });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = (e) => {
    e.preventDefault();

    const form = document.querySelector(`form[name="create-milestone"]`);
    const formFields = serialize(form, { hash: true }); 
    
    formFields.description=this.state.description;
    formFields.applicationId=this.state.projectId;

    const { dispatch } = this.props
    
    const createProjectMilestone = fetch({
      url: "/milestones",
      method: "post",
      data: formFields,
      onSuccess: ""
    });

    dispatch(createProjectMilestone).then(()=>{
        const { status, message } = this.props.request;
          this.setState({
            status, message,
            projectName: ``
          });
    });
  };
  render() {
    const { status, message } = this.state;
    return (
      <Card.Body>
       
        <div className="content-text">
          <h5>Add Milestones to Funds Application</h5>
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
            <form name="create-milestone" id="createMilestones">
            <Form.Group controlId="projectId">
                <Form.Label>Select Project:</Form.Label>
                <Form.Control as="select" ref={this.projectSelect} name="projectId"
                 onChange={(e) => this.setState({projectId: e.target.value})}>
                    </Form.Control>

              </Form.Group>
              <div className="form-row">

              <div className="form-group col-md-8">
                  <label htmlFor="name">Name of Milestone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                  />
                </div>
                <div className="form-group col-md-6" controlId="startDate">
                  <label htmlFor="startDate">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    // defaultValue={moment("2020/01/01", dateFormat)}
                    value={this.state.startDate}
                    name="startDate"
                    //format={dateFormat}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group col-md-6" controlId="endDate">
                  <label htmlFor="endDate">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    value={this.state.endDate}
                    name="endDate"
                    //format={dateFormat}
                    //defaultValue={moment("2020/01/01", dateFormat)}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
             
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Editor
                  apiKey="oym93hgea69gv4o5cjoxfc1baobo49f82d4ah9j66v3n955r"
                  initialValue={this.state.description}
                  init={{
                    height: 200,
                    menubar: false,
                    FORCED_ROOT_BLOCK: ``,
                    FORCE_BR_NEWLINES: true,
                      plugins: [
                      `advlist autolink lists link image`,
                      `charmap print preview anchor help`,
                      `searchreplace visualblocks code`,
                      `insertdatetime media table paste wordcount`
                    ],
                    toolbar: `undo redo | formatselect | bold italic | \
                    alignleft aligncenter alignright | \
                    bullist numlist outdent indent | help`
                  }}
                  onChange={this.handleEditorChange}
                  name="description"
                  outputFormat="text"
                />
              </Form.Group>

              <br></br>
              <Button className="user-btn" variant="primary" type="submit" onClick={this.handleClick}>
                Create Milestone
              </Button>
            </form>
          </Col>
        </Row>
      </Card.Body>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    request: state.request
  }
}

export default connect(mapStateToProps)(CreateMilestone);
