

import React from "react";
import { Link} from "react-router-dom";



import { Card, Table, Form, Col, Row} from "react-bootstrap";
import UpdateMilestone from "./UpdateMilestone";

import serialize from "form-serialize";

import { fetch } from "../../../../redux/actionCreators";
import * as Types from "../../../../redux/types";

class ViewMilestones extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      milestones: [],
      description: ``,
      data: [],
      success: ``,
      error: ``,
      showUpdate: false,
      milestoneId: null
    };

    this.showMilestoneModal = this.showMilestoneModal.bind(this);
    this.closeMilestoneModal = this.closeMilestoneModal.bind(this);
    this.handleMilestoneUpdate = this.handleMilestoneUpdate.bind(this);
    this.getMilestones = this.getMilestones.bind(this);
    this.getActiveProjects = this.getActiveProjects.bind(this);
    this.projectSelect=React.createRef();
   
  }

  componentDidMount() {
    this.getActiveProjects();
  }

  showMilestoneModal(event, milestoneId) {

    event.preventDefault();
    this.setState({ showUpdate: true, milestoneId });
  }

  closeMilestoneModal() {
    this.setState({ showUpdate: false });
  }
  getMilestones(e){
  
    const name=e.target.value;

    const { dispatch } = this.props;
    const filterMilestonsesByProjectName = fetch({
      url: `milestones/${name}`,
      method: "get",
      data: null,
      onSuccess: ""
    });

    dispatch(filterMilestonsesByProjectName);
  }

  getActiveProjects() {

    const select = this.projectSelect.current;

    const { projects } = this.props;
    const data = projects;

    const defaultOption = document.createElement(`option`);
    defaultOption.innerText = "select";
    defaultOption.name = "select";
    defaultOption.value = -1;
    select.appendChild(defaultOption);

    // based on type of data is array
    for (let i = 0; i < data.length; i++) {
      const option = document.createElement(`option`);
      option.innerText = data[parseInt(i,10)].projectName;
      option.name = data[parseInt(i,10)].projectName;
      option.value = data[parseInt(i,10)].projectId;
      select.appendChild(option);
    }
  }

  handleMilestoneUpdate(event) {
    event.preventDefault();

    const form = document.querySelector(`form[name=updateMilestone]`);
    const formFields = serialize(form, { hash: true });
    formFields.id = this.state.milestoneId;

    const { dispatch } = this.props;
    const updateMilestone = fetch({
      url: `/milestones/id`,
      method: "put",
      data: formFields,
      onSuccess: ""
    });

    dispatch(updateMilestone);
  }

  render() {
    const  success = this.state.success;
    const  error = this.state.success;
    const data = this.props.milestones;
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
                <Form.Control as="select" ref={this.projectSelect} name="projectId" onChange={this.getMilestones}
                >
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
                          <Link onClick={(e)=> this.showMilestoneModal(e,item.id)} to="" value={item.milestoneId}>
                            {` `}
                            Update{` `}
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </form>
          </Col>
        </Row>
        <UpdateMilestone showModal={this.state.showUpdate} closeModal={this.closeMilestoneModal} handleMilestoneUpdate={this.handleMilestoneUpdate} />
      </Card.Body>
    );
  }
}

//export default ViewMilestones;
export default ViewMilestones;
