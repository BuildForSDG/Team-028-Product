
import React from "react";

import serialize from "form-serialize";

import { Card, Form, Button, Row, Col } from "react-bootstrap";

import { fetch } from "../../../redux/actionCreators";

import { connect } from "react-redux";

class Invest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "",
      message: "",
      description: "",
      projectName: "",
      organizationId:""
    };

    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.categorySelect = React.createRef();
    this.projectSelect=React.createRef();
  }

  componentDidMount() {
    this.getCategory();
    this.getActiveProjects();
  }


  getActiveProjects = () => {
    const select = this.projectSelect.current;

    const data = this.props.projects;

    for (let i = 0; i < data.length; i++) {
      const option = document.createElement("option");
      option.innerText = data[parseInt(i,10)].projectName;
      option.name = data[parseInt(i,10)].projectName;
      option.value = data[parseInt(i,10)].projectId;
      select.appendChild(option);
    }
  }
  getCategory = () => {
      const select = this.categorySelect.current;

      const data = this.props.fundcategories;

      for (let i = 0; i < data.length; i++) {
        const option = document.createElement("option");
        option.innerText = data[parseInt(i,10)].categoryName;
        option.name = data[parseInt(i,10)].categoryName;
        option.value = data[parseInt(i,10)].fundCatId;
        select.appendChild(option);
      }
  }

  handleEditorChange(content, editor) {
    this.setState({ description: content });
  }

  handleClick(e) {
    e.preventDefault();

    const form = document.querySelector(`form[name="create-investment"]`);
    const formFields = serialize(form, { hash: true });

    formFields.status = "investment initiated";

    const { user, dispatch } = this.props;
    formFields.organizationId = user.organizationId;

      const saveInvestment = fetch({
        url:  "/invest",
        method: "post",
        data: formFields,
        onSuccess: ""
      });

    dispatch(saveInvestment).then(()=>{
      const { status, message } = this.props.request;

      if (status === "success"){
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  }

  render() {
    const { status, message } = this.state;
    return (
      <Card.Body>
        <Row>
          <Col>
          {status ==="success" ? (
              <div className="text-bold text-success">
                <h5>{message}</h5>
              </div>
            ) : (
              <div className="text-bold text-success">
                <h5>{message}</h5>
              </div>
            )}
            <Form name="create-investment">
             <Form.Group controlId="fundCatId">
                <Form.Label>Category Type:</Form.Label>
                <Form.Control as="select" ref={this.categorySelect} name="fundCatId"></Form.Control>
              </Form.Group>
              <Form.Group controlId="projectId">
                <Form.Label>Select Project:</Form.Label>
                <Form.Control as="select" ref={this.projectSelect} name="projectId"
                 onChange={(e) => this.setState({projectName: e.target.value})}>
                    </Form.Control>

              </Form.Group>

              <Form.Group controlId="amount">
                <Form.Label>Amount Invested:</Form.Label>
                <Form.Control type="number" placeholder="Amount" name="amount" />
              </Form.Group>

              <Form.Group controlId="dateInitiated">
                <Form.Label>Date Initiated:</Form.Label>
                <Form.Control type="date" placeholder="Date Initiated" name="dateInitiated" />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={this.handleClick}>
                Invest
              </Button>
            </Form>
          </Col>
        </Row>
      </Card.Body>
    );
  }
}
const mapStateToProps = (state) => ({
  request: state.request
});

export default connect(mapStateToProps)(Invest);
