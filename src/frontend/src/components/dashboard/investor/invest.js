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
import serialize from "form-serialize";
import axios from "axios";

class Invest extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      categories: [],
      success: ``,
      error: ``,
      description: ``
    };

    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.categorySelect = React.createRef();
    this.getCategory = this.getCategory.bind(this);
  }

  componentDidMount() {
    this.getCategory();
  }

  getCategory() {
    axios
      .get(`https://eazsme-backend.herokuapp.com/funds/category/all`)
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
            option.value = data[parseInt(i,10)].fundCatId;
            select.appendChild(option);
          }
        });
      })
      .catch((error) => console.log(error));
  }

  handleEditorChange(content, editor) {
    this.setState({ description: content });
  }

  handleClick(e) {
    e.preventDefault();

    const form = document.querySelector(`form[name="create-investment"]`);
    const formFields = serialize(form, { hash: true });
    
    formFields.status = `investment initiated`;
    formFields.organizationId = this.props.user.organizationId;
    
    axios
      .post(`https://eazsme-backend.herokuapp.com/invest`, formFields)
      .then((data) => {
        if (data.data.status === `success`) {
          this.setState({ 
            success: `Investment Initiated!`, 
            error:``,
           });
           setTimeout(() => {
            window.location.reload();
           }, 1000);
        } else {
          this.setState({ error: `Error creating Initiating Investment`, success: `` });
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
            <Form name="create-investment"> 
             <Form.Group controlId="fundCatId">
                <Form.Label>Category Type:</Form.Label>
                <Form.Control as="select" ref={this.categorySelect} name="fundCatId"></Form.Control>
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
        <Row>
          {success ? (
            <div className="text-bold text-success text-center">{success}</div>
          ) : (
            <div className="text-bold text-danger text-center">{error}</div>
          )}
        </Row>
      </Card.Body>
    );
  }
}
export default Invest;
