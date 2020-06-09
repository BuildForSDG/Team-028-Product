/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable no-multi-str */
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

class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: [],
      success: ``,
      error: ``,
      data: []
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.categorySelect = React.createRef();
    this.getCategory = this.getCategory.bind(this);
  }

  componentDidMount() {
    this.getCategory();
  }

  async getCategory() {
    await axios
      .get(`https://localhost:4000/projects/category/`)
      .then(({ data }) => {
        const {status} = data;
        const cats = data.data;
        if(status === "success") {
          this.setState({data: data.push(cats)});
        }
        
      })
      .catch((error) => console.log(error));

    const select = this.categorySelect.current;

    const { data } = this.state;
    // based on type of data is array
    for (let i = 0; i < data.length; i++) {
      const option = document.createElement(`option`);
      option.name = data[parseInt(i)].categoryName;
      option.value = data[parseInt(i)].categoryName;
      select.appendChild(option);
    }
  }

  handleEditorChange(e) {
    this.setState({ description: e.target.getContent() });
  }

  async handleClick(e) {
    e.preventDefault();
    const form = document.querySelector(`form[name="create-project"]`);
    const formFields = serialize(form, { hash: true });
    await axios
      .post(`http://localhost:4000/projects`, formFields)
      .then(({data}) => {
        const {status} = data;
        if (status === `success`) {
          this.setState({ success: `User Successfully created!` });
        } else {
          this.setState({ error: `Error creating User` });
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
            {/**   <Form.Group controlId="catId">
                <Form.Label>Project ID:</Form.Label>
                <Form.Control type="text" placeholder="Project ID" name="projectId" />
            </Form.Group>*/}

              {/** Make a request for all the project category and populate select  store value in redux state*/}
              <Form.Group controlId="projectCatId">
                <Form.Label>Category Type:</Form.Label>
                <Form.Control as="select" ref={this.categorySelect} name="categoryCatId"></Form.Control>
              </Form.Group>

              <Form.Group controlId="projectName">
                <Form.Label>Project Name:</Form.Label>
                <Form.Control type="text" placeholder="Project Name" name="projectName" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Editor
                  apiKey="oym93hgea69gv4o5cjoxfc1baobo49f82d4ah9j66v3n955r"
                  initialValue={this.state.description}
                  init={{
                    height: 200,
                    menubar: false,
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
                  name="catDescription"
                />
              </Form.Group>

              <Form.Group controlId="createdBy">
                <Form.Label>Created By:</Form.Label>
                <Form.Control type="text" placeholder="Created by" name="createdBy" />
              </Form.Group>

              <Form.Group controlId="dateStarted">
                <Form.Label>Date Started:</Form.Label>
                <Form.Control type="date" placeholder="Date started" name="dateStarted" />
              </Form.Group>

              <Form.Group controlId="dateEnded">
                <Form.Label>Date Ended:</Form.Label>
                <Form.Control type="date" placeholder="Date ended" name="dateEnded" />
              </Form.Group>

              <Form.Group controlId="dateCreated">
                <Form.Label>Date Created:</Form.Label>
                <Form.Control type="date" placeholder="Date ended" name="dateCreated" />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={this.handleClick}>
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
