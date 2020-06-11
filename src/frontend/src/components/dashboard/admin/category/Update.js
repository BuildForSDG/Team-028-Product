/* eslint-disable quotes */
/* eslint-disable no-multi-str */
/* eslint-disable no-console */
/* eslint no-console: "error" */
/*eslint quotes: ["error", "double"]*/
/*eslint-env es6*/

import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import serialize from "form-serialize";

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      catID: "",
      data: {},
      success: "",
      error: ""
    };

    this.submitUpdate = this.submitUpdate.bind(this);
    this.getCategoryId = this.getCategoryId.bind(this);
  }

  componentDidMount() {
    this.getCategoryId();
  }

  async getCategoryId(e) {
    e.preventDefault();
    const { categoryId } = this.props.match;
    await axios
      .get("https://eazsme-backend.herokuapp.com/projects/category/" + categoryId)
      .then((data) => {
        if (data.status === "success") {
          this.setState({ catID: data.projectCatId });
          this.setState({ data });
        }
      })
      .catch((error) => console.log(error));
  }

  async submitUpdate(e) {
    e.preventDefault();
    const form = document.querySelector(`form[name="update"]`);
    const formFields = serialize(form, { hash: true });
    const { catID } = this.state;
    await axios
      .patch("https://eazsme-backend.herokuapp.com/projects/category/" + catID, formFields)
      .then((data) => {
        if (data.status === "success") {
          this.setState({ success: "Update was successful!" });
        } else {
          this.setState({ error: "Error performing update" });
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    const data = this.state.data;
    const success = this.state.success;
    const error = this.state.error;
    const projectCatId = data.projectCatId;
    const categoryName = data.categoryName;
    const categoryDescription = data.categoryDescription;
    const createdBy = data.createdBy;
    return (
      <Card.Body>
        {success ? (
          <div className="text-bold text-success">
            <h5>{success}</h5>
          </div>
        ) : (
          <div className="text-bold text-success">
            <h5>{error}</h5>
          </div>
        )}
        <Row>
          <Col>
            <Form name="update">
              <Form.Group controlId="catId">
                <Form.Label>Category Id:</Form.Label>
                <Form.Control type="text" name="projectCatId" defaultValue={projectCatId} />
              </Form.Group>

              <Form.Group controlId="catName">
                <Form.Label>Category Name:</Form.Label>
                <Form.Control type="text" name="categoryName" defaultValue={categoryName} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Editor
                  apiKey="oym93hgea69gv4o5cjoxfc1baobo49f82d4ah9j66v3n955r"
                  initialValue={categoryDescription}
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
                  name="categoryDescription"
                />
              </Form.Group>

              <Form.Group controlId="createdBy">
                <Form.Label>Created By:</Form.Label>
                <Form.Control type="text" name="createdBy" defaultValue={createdBy} />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={this.submitUpdate}>
                Update Project Category
              </Button>
            </Form>
          </Col>
        </Row>
      </Card.Body>
    );
  }
}
export default Update;
