/* eslint-disable no-console */
/* eslint no-console: "error" */
/* eslint-disable no-multi-str */
/*eslint quotes: ["error", "backtick"]*/
/*eslint-env es6*/

import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Editor } from "@tinymce/tinymce-react";
import serialize from "form-serialize";
import axios from "axios";

class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      success: ``,
      error: ``,
      data: []
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.categorySelect = React.createRef();
  }

  componentDidMount() {
    this.getCategory();
  }

  async getCategory() {
    await axios
      .get(`https://eazsme-backend.herokuapp.com/projects/category/`)
      .then((data) => {

        const categories = data.data.data;
  
        this.setState({categories}, () => {
          const select = this.categorySelect.current;

          const { categories } = this.state;
          const data = categories;

          // based on type of data is array
          for (let i = 0; i < data.length; i++) {
            const option = document.createElement(`option`);
            option.innerText = data[parseInt(i,10)].categoryName;
            option.name = data[parseInt(i,10)].categoryName;
            option.value = data[parseInt(i,10)].projectCatId;
            select.appendChild(option);
          }
        });

      })
      .catch((error) => console.log(error));
  }
  

  handleEditorChange(e) {
    this.setState({ description: e.target.getContent() });
   
  }

  async handleClick(e) {
    e.preventDefault();
    const form = document.querySelector(`form[name="create-project"]`);
    const formFields = serialize(form, { hash: true });
    formFields.description=this.state.description;
    console.log(formFields);
      await axios
      .post(`https://eazsme-backend.herokuapp.com/projects`, formFields)
      .then((data) => {
         
        if ((data.data.status === `success`)) {
          this.setState({ success: `Project Successfully created!` });
        } else {
          this.setState({ error: `Error creating project` });
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    const success = this.state.success;
    const error = this.state.error;
    return (
      <Card.Body>
        
        <Row>
          <Col>

          {success ? (
              <div className="text-bold text-success">
                <h5>{success}</h5>
              </div>
            ) : (
              <div className="text-bold text-success">
                <h5>{error}</h5>
              </div>
            )}
            <Form name="create-project">
             {/** <Form.Group controlId="catId">
                <Form.Label>Project ID:</Form.Label>
                <Form.Control type="text" placeholder="Project ID" name="projectId" />
              </Form.Group>

              {/** Make a request for all the project category and populate select  store value in redux state*/}
              <Form.Group controlId="projectCatId">
                <Form.Label>Category Type:</Form.Label>
                <Form.Control as="select" ref={this.categorySelect} name="projectCatId"></Form.Control>
              </Form.Group>

              <Form.Group controlId="projectName">
                <Form.Label>Project Name:</Form.Label>
                <Form.Control type="text" placeholder="Project Name" name="projectName" />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Editor
                  apiKey="oym93hgea69gv4o5cjoxfc1baobo49f82d4ah9j66v3n955r"
                  initialValue={this.state.description}
                  init={{
                    height: 200,
                    menubar: false,
                    forcedRootBlock: ``,
                    forceBrNewlines: true,
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
                  name="description"
                  onChange={this.handleEditorChange}
                
                />
              </Form.Group>

              <Form.Group controlId="dateStart">
                <Form.Label>Date Started:</Form.Label>
                <Form.Control type="date" placeholder="Date started" name="dateStart" />
              </Form.Group>

              <Form.Group controlId="dateEnd">
                <Form.Label>Date Ended:</Form.Label>
                <Form.Control type="date" placeholder="Date ended" name="dateEnd" />
              </Form.Group>

              <Button className="user-btn" variant="primary" type="submit" onClick={this.handleClick}>
                Create Project
              </Button>
            </Form>
          </Col>
        </Row>
      </Card.Body>
    );
  }
}
export default Create;
