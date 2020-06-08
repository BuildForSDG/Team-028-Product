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
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {}

  async handleClick(e) {
    e.preventDefault();
    const form = document.querySelector(`form[name="milestone"]`);
    const formFields = serialize(form, { hash: true });
    await axios
      .post(`http://localhost:4000/milestones`, formFields)
      .then(({ data }) => {
        const { status } = data;
        const { message } = data;
        if (status === `success`) {
          this.setState({ success: `User Successfully created!` });
        } else {
          this.setState({ error: message });
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
            <Form name="milestone">
              <Form.Group controlId="applicationId">
                <Form.Label>Application ID:</Form.Label>
                <Form.Control type="text" name="applicationId" placeholder="Application ID" />
              </Form.Group>

              <Form.Group controlId="name">
                <Form.Label>Application Name:</Form.Label>
                <Form.Control type="text" placeholder="Application Name" name="name" />
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
                  name="description"
                />
              </Form.Group>

              <Form.Group controlId="startDate">
                <Form.Label>Start Date:</Form.Label>
                <Form.Control type="date" placeholder="Start Date" name="startDate" />
              </Form.Group>

              <Form.Group controlId="endDate">
                <Form.Label>End Date:</Form.Label>
                <Form.Control type="date" placeholder="End Date" name="endDate" />
              </Form.Group>

              <Form.Group controlId="progress">
                <Form.Label>Progress:</Form.Label>
                <Form.Control type="text" placeholder="Progress" name="progress" />
              </Form.Group>

              <Form.Group controlId="status">
                <Form.Label>Status:</Form.Label>
                <Form.Control as="select" name="status">
                  <option>::select</option>
                  <option value="pending">Pending</option>
                  <option value="inProgress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="closed">Closed</option>
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit" onClick={this.handleClick}>
                Create Milestone
              </Button>
            </Form>
          </Col>
        </Row>
      </Card.Body>
    );
  }
}
export default Create;
