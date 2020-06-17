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
      projects: [],
      categories: [],
      success: ``,
      error: ``,
      description: ``,
      projectName: ``,
      organizationId:``
    };

    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.categorySelect = React.createRef();
    this.projectSelect=React.createRef();
    this.getCategory = this.getCategory.bind(this);
    this.getActiveProjects = this.getActiveProjects.bind(this);
  }

  componentDidMount() {
    this.getCategory();
    this.getActiveProjects();
    const userObj = JSON.parse(localStorage.getItem(`userObj`));
    if (userObj) {
      this.setState(() => ({ userObj }));
     
    }
  }


  getActiveProjects() {
    axios
      .get(`https://eazsme-backend.herokuapp.com/projects/all`)
      .then((data) => {
      
        const projects = data.data.data;    
        this.setState({projects}, () => {
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
      })
      .catch((error) => console.log(error));
  }

  
  getCategory() {
    axios
      .get(`https://eazsme-backend.herokuapp.com/funds/category/all`)
      .then((data) => {
        const categories = data.data.data;
  console.log(categories);
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
    formFields.organizationId = this.state.userObj.organizationId;
    //formFields.projectName=this.state.projectName;

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
      .catch((error) => {
        this.setState({ error: error.message, success: `` });
      });
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
            <Form name="create-investment"> 
             <Form.Group controlId="fundCatId">
                <Form.Label>Category Type:</Form.Label>
                <Form.Control as="select" ref={this.categorySelect} name="fundCatId"></Form.Control>
              </Form.Group>
              <Form.Group controlId="projectId">
                <Form.Label>Select Project:</Form.Label>
                <Form.Control as="select" ref={this.projectSelect} name="projectId" 
                 onChange={(e) => this.setState({projectName: e.target.value})}>>
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
        <Row>
    
        </Row>
      </Card.Body>
    );
  }
}
export default Invest;
