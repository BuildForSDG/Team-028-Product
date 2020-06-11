/* eslint-disable no-multi-str */
/* eslint-disable no-unused-vars */
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
        projects: [],
        eligibilityCreteria: "",
        success: "",
        error: "",
        projectName:""
      };
      this.handleEditorChange = this.handleEditorChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.projectSelect = React.createRef();
      this.getActiveProjects = this.getActiveProjects.bind(this);
    
    }
  
    handleEditorChange(e) {
      this.setState({ eligibilityCreteria: e.target.getContent() });
    }
   

    componentDidMount() {
      this.getActiveProjects();
    }
  
    getActiveProjects() {
      axios
        .get("https://eazsme-backend.herokuapp.com/projects/all")
        .then((data) => {
        
          const projects = data.data.data;    
          this.setState({projects}, () => {
            const select = this.projectSelect.current;
  
            const { projects } = this.state;
            const data = projects;
  
            // based on type of data is array
            for (let i = 0; i < data.length; i++) {
              const option = document.createElement("option");
              option.innerText = data[parseInt(i,10)].projectName;
              option.name = data[parseInt(i,10)].projectName;
              option.value = data[parseInt(i,10)].projectId;
              select.appendChild(option);
            }
          });
        })
        .catch((error) => console.log(error));
    }
  
    handleClick(e) {
      e.preventDefault();
      // Make api call with form
   
      const form = document.querySelector("form[name=create-eligibility]");
      const formFields = serialize(form, { hash: true });
      formFields.eligibilityCreteria=this.state.eligibilityCreteria;
      formFields.projectName=this.state.projectName;
      console.log(formFields);
     
     axios
        .post("https://eazsme-backend.herokuapp.com/eligibility", formFields)
        .then((data) => {
        
          if ((data.data.status === "success")) {
        this.setState({ success: "Eligibility Successfully created!" });
            
          } else {
            this.setState({ error: "Error creating criteria" });
          }
        })
        .catch((error) => {
        console.log(error);
        this.setState({ error: "Error creating criteria" });
        }
        );
    }

render() {
    const success= this.state.success;
    const error= this.state.error;
    return (
      <Card.Body>
       
        <div className="content-text"><h6>Add Eligibility Criteria to Projects</h6></div>
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
          <form name="create-eligibility" id="createEligibility">
             <Form.Group controlId="projectId">
                <Form.Label>Select Project:</Form.Label>
                <Form.Control as="select" ref={this.projectSelect} name="projectId" 
                 onChange={(e) => this.setState({projectName: e.target.value})}>>
                    </Form.Control>

              </Form.Group>

              <Form.Group controlId="eligibilityCreteria">
                <Form.Label>Criteria Details</Form.Label>
                <Editor
                  apiKey="oym93hgea69gv4o5cjoxfc1baobo49f82d4ah9j66v3n955r"
                  initialValue={this.state.eligibilityCreteria}
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
                  name="eligibilityCreteria"
                  onChange={this.handleEditorChange}
                
                />
              </Form.Group>

                 <br></br>
                  <Button className="user-btn" variant="primary" type="submit" onClick={this.handleClick}>
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