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
        description: "",
        data: [],
        success: "",
        error: "",
        showUpdate: false
      };
         
      this.showMilestoneModal = this.showMilestoneModal.bind(this);
      this.closeMilestoneModal = this.closeMilestoneModal.bind(this);
      this.handleMilestoneUpdate = this.handleMilestoneUpdate.bind(this);
    }
   
    componentDidMount() {
      this.fetchData();
    }
    showMilestoneModal(event) {      
      event.preventDefault();
      this.setState({ showUpdate: true });
    }  
    
    closeMilestoneModal() {
      this.setState({ showUpdate: false });
    }
   
    async fetchData() {
      await axios
        .get("http://localhost:4000/milestones/all")
        .then(({ data }) => {
          const status = data.status;
          const result  = data.data;
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
        .post("http://localhost:4000/milestones/id", formFields)
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
    const data = this.state.data;
    const success= this.state.success;
    const error= this.state.error;
    return ( 
           
      <Card.Body>
        {success ? (
          <Form.Text className="text-bold text-success">{success}</Form.Text>
        ) : (
          <Form.Text className="text-bold text-danger">{error}</Form.Text>
        )}
        <div className="content-text"><h5>Project Milestones</h5></div>
        <Row>
          
          <Col md="12">
          <form name="viewMilestone" id="viewMilestone">
                  <div class="form-row" controlId="ProjectId">
                    <div class="form-group col-md-12">
                    <label for="ProjectId">Select Project</label>
                      <select id="ProjectId" class="form-control" name="ProjectId">
                        <option selected>Choose...</option>
                        <option>Fertilizer Distribution</option>
                        <option>Maize Farming</option>
                        <option>Project 1</option>
                        <option>Project 2</option>
                        
                      </select>
                    </div>
          </div>
          
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
                  
                  <td>{item.milestoneName}</td>
                  <td>{item.description}</td>
                  <td>{item.startdate}</td>
                  <td>{item.enddate}</td>
                  <td>{item.Progress}</td>
                  <td>{item.Status}</td>
                  <td>
              {/*<Link onClick={this.showMilestoneModal} to={`/view-project/${item.projectId}`}>Update</Link>*/}
          <Router>
                   
                    <Link onClick={this.showMilestoneModal} to="/sme/Funds/UpdateMilestone" > Update </Link>
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