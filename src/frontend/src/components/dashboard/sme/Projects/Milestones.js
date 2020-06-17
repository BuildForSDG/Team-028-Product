/* eslint-disable no-unused-vars */
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
import { DatePicker } from "antd";
import moment from "moment";
import Image from "react-bootstrap/Image";
import { Editor } from "@tinymce/tinymce-react";
import serialize from "form-serialize";
import axios from "axios";
const dateFormat = `YYYY/MM/DD`;
let url=``;

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
      success: ``,
      error: ``
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getActiveProjects = this.getActiveProjects.bind(this);
    this.projectSelect=React.createRef();
  }

  componentDidMount() {

    const userObj = JSON.parse(localStorage.getItem(`userObj`));
    console.log(`p`+userObj);
    if (userObj) {
      this.setState(() => ({ userObj }));
      const organizationId=userObj.organizationId;
      const form = document.querySelector(`form[name="create-mileston"]`);
const formFields = serialize(form, { hash: true }); 
formFields.organizationId=organizationId;
      url = (`https://eazsme-backend.herokuapp.com/fund/application/id`,formFields);
    }
   
    this.getActiveProjects();
  }

  async getActiveProjects() {
    await axios
      .get(url)
      .then((data) => {

        const projects = data.data.data;
  
        this.setState({projects}, () => {
          const select = this.projectSelect.current;

          const { categories } = this.state;
          const data = categories;

          // based on type of data is array
          for (let i = 0; i < data.length; i++) {
            const option = document.createElement(`option`);
            option.innerText = data[parseInt(i,10)].projectName;
            option.name = data[parseInt(i,10)].projectName;
            option.value = data[parseInt(i,10)].projectId;
            select.appendChild(option);
          }
        });

      })
      .catch((error) => console.log(error));
  }
  

  
  
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = (e) => {
    e.preventDefault();

    const fd = {
      name: this.state.name,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      description: this.state.description
    };
    // Make api call with form
    axios
      .post(`https://eazsme-backend.herokuapp.com/milestones`, fd)
      .then((data) => {
        console.log(data);
        if (data.status === `success`) {
          this.setState({
            success: `User Successfully created!`,
            projectName: ``
          });
        } else {
          this.setState({ error: `Error creating User` });
        }
      })
      .catch((error) => console.log(error));
  };
  render() {
    //const { description, name, startDate, endDate, success, error } = this.state;
    const success = this.state.success;
    const error = this.state.error;
    return (
      <Card.Body>
       
        <div className="content-text">
          <h5>Add Milestones to Funds Application</h5>
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
            <form name="create-mileston" id="createMilestones">
            <Form.Group controlId="projectId">
                <Form.Label>Select Project:</Form.Label>
                <Form.Control as="select" ref={this.projectSelect} name="projectId" 
                 onChange={(e) => this.setState({projectName: e.target.value})}>>
                    </Form.Control>

              </Form.Group>
              <div class="form-row">
                <div class="form-group col-md-6" controlId="startDate">
                  <label for="startDate">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    //defaultValue={moment("2020/01/01", dateFormat)}
                    value={this.state.startDate}
                    name="startDate"
                    //format={dateFormat}
                    onChange={this.handleChange}
                  />
                </div>
                <div class="form-group col-md-6" controlId="endDate">
                  <label for="endDate">End Date</label>
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
              <Form.Label>Description</Form.Label>
              <Editor
                controlId="description"
                apiKey="oym93hgea69gv4o5cjoxfc1baobo49f82d4ah9j66v3n955r"
                name="description"
                init={{
                  height: 200,
                  menubar: false,
                  plugins: [
                    `advlist autolink lists link image`,
                    `charmap print preview anchor help`,
                    `searchreplace visualblocks code`,
                    `insertdatetime media table paste wordcount`
                  ],
                  toolbar:
                    `undo redo | formatselect | bold italic | \
                    alignleft aligncenter alignright | \
                    bullist numlist outdent indent | help`
                }}
                onChange={this.handleChange}
              />
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
export default CreateMilestone;
