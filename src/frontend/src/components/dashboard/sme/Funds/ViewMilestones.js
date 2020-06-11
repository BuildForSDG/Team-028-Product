/* eslint-disable no-unused-vars */
/* eslint-disable no-multi-str */
/* eslint-disable no-console */
/* eslint no-console: "error" */
import React from "react";
import { Link, BrowserRouter as Router, withRouter } from "react-router-dom";
import serialize from "form-serialize";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import UpdateMilestone from "./UpdateMilestone";

class ViewMilestones extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      description: "",
      data: [],
      success: "",
      error: "",
      showUpdate: false
    };

    this.showMilestoneModal = this.showMilestoneModal.bind(this);
    this.closeMilestoneModal = this.closeMilestoneModal.bind(this);
    this.handleMilestoneUpdate = this.handleMilestoneUpdate.bind(this);
    this.getActiveProjects = this.getActiveProjects.bind(this);
    this.projectSelect=React.createRef();
  }

  componentDidMount() {
    this.fetchData();
    this.getActiveProjects();
  }
  showMilestoneModal(event) {
    event.preventDefault();
    this.setState({ showUpdate: true });
  }

  closeMilestoneModal() {
    this.setState({ showUpdate: false });
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

  async fetchData() {
    await axios
      .get("https://eazsme-backend.herokuapp.com/milestones/all")
      .then(({ data }) => {
        const status = data.status;
        const result = data.data;
        if (status === "success") {
          this.setState({ data: result });
        }
      })
      .catch((error) => console.log(error));
  }

  handleMilestoneUpdate(event) {
    event.preventDefault();
    const form = document.querySelector("form[name=updateMilestone]");
    const formFields = serialize(form, { hash: true });

    axios
      .post("https://eazsme-backend.herokuapp.com/milestones/id", formFields)
      .then(({ data }) => {
        if (data.status === "success") {
          this.setState({ success: "Milestone successfully updated!" });
        } else {
          this.setState({ error: "Error Updating Milestone" });
        }
      })
      .catch((error) => {
        /*console.log(error)*/
        this.setState({ error: "Error Updating Milestone" });
      });
  }

  render() {
    const  success = this.state.success;
    const  error = this.state.success;
    const data = this.state.data;
    return (
      <Card.Body>
       
        <div className="content-text">
          <h5>Project Milestones</h5>
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
            <form name="viewMilestone" id="viewMilestone">
            <Form.Group controlId="projectId">
                <Form.Label>Select Project:</Form.Label>
                <Form.Control as="select" ref={this.projectSelect} name="projectId" 
                 onChange={(e) => this.setState({projectName: e.target.value})}>>
                                    </Form.Control>

              </Form.Group>

              <br></br>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Milestone Name</th>
                    <th>Description</th>
                    <th>State Date</th>
                    <th>End Date</th>
                    <th>Progress</th>
                    <th>Status</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index, arr) => {
                    return (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.startDate}</td>
                        <td>{item.endDate}</td>
                        <td>{item.Progress}</td>
                        <td>{item.Status}</td>
                        <td>
                          {/*<Link onClick={this.showMilestoneModal} to={`/view-project/${item.projectId}`}>Update</Link>*/}
                          <Router>
                            <Link onClick={this.showMilestoneModal} to="/sme/Funds/UpdateMilestone">
                              {" "}
                              Update{" "}
                            </Link>
                          </Router>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </form>
          </Col>
        </Row>
        <UpdateMilestone showModal={this.state.showUpdate} closeModal={this.closeMilestoneModal} />
      </Card.Body>
    );
  }
}

//export default ViewMilestones;
export default ViewMilestones;
