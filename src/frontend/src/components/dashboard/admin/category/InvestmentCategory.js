/* eslint-disable no-multi-str */
/*eslint quotes: ["error", "backtick"]*/
/*eslint-env es6*/
/* eslint-disable no-console */
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
        description: ``,
      success: ``,
      error: ``
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleEditorChange(e) {
    this.setState({ description: e.target.getContent() });
  }
 // https://eazsme-backend.herokuapp.com  https://eazsme-backend.herokuapp.com/projects/category
  async handleClick(e) {
    e.preventDefault();
    const form = document.querySelector(`form[name="create-fundcategory"]`);
    const formFields = serialize(form, { hash: true }); // Make api call with form
    formFields.description=this.state.description;
    console.log(formFields);
    await axios
      .post(`https://eazsme-backend.herokuapp.com/funds/category`, formFields)
      .then(({ data }) => {
        const { status } = data;
        if (status === `success`) {
          this.setState({ success: `Investment Category Successfully created!` });
        } else {
          this.setState({ error: `Error creating investment category` });
        }
      })
      .catch((error) => {
        
        this.setState({ error: `Error creating investment category` });
      console.log(error);});
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
            <Form name="create-fundcategory">
              <Form.Group controlId="categoryName">
                <Form.Label>Investment Category Name:</Form.Label>
                <Form.Control type="text" placeholder="Category Name" name="categoryName" />
              </Form.Group>

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
                />
              </Form.Group>

           {/** <Form.Group controlId="createdBy">
                <Form.Label>Created By</Form.Label>
                <Form.Control type="text" placeholder="Created By:" name="createdBy" />
              </Form.Group>*/}   

              <Button className="user-btn" variant="primary" type="submit" onClick={this.handleClick}>
                Create Investment Category
              </Button>
            </Form>
          </Col>
        </Row>
      </Card.Body>
    );
  }
}
export default Create;
