
import React from "react";
import axios from "axios";

class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      project: {
        dateCreated: "",
        projectName: "",
        projectId: "",
        address: "",
        companyName: "",
        organizationId: "",
        fund: "",
        description: "",
        status: ""
      }
    };
  }
  async componentDidMount() {
    const id=this.props.match.params.projectId;
    const url = `https://eazsme-backend.herokuapp.com/project/${id}`;
   
    const data = await axios.get(url);

    const project = data.data.data;

    this.setState({ project });
  }

  render() {
    const dateCreated = new Date(`${this.state.project.dateCreated}`).toLocaleDateString();
    return (
      <>
        <div class="jumbotron p-4 p-md-5 text-dark rounded shadow-sm">
          <div class="container">
            <div class="row justify-content-start stripped">
              <div class="col-4">Project Name:</div>
              <div class="col-4">{this.state.project.projectName}</div>
            </div>
            <div class="row justify-content-start stripped">
              <div class="col-4">Project ID:</div>
              <div class="col-4">{this.state.project.projectId}</div>
            </div>
            <div class="row justify-content-start stripped">
              <div class="col-4">Date Created:</div>
              <div class="col-4">{dateCreated}</div>
            </div>
            <div class="row justify-content-start stripped">
              <div class="col-4">Amount Deposited:</div>
              <div class="col-4">N{this.state.project.fund}</div>
            </div>
          </div>
          <br></br>
          <div class="container">
            <div class="row justify-content-between stripped">
              <div class="col-3">Project Description:</div>
              <div class="col-9">{this.state.project.description}</div>
            </div>
            <div class="row justify-content-between stripped">
              <div class="col-3">Project Category:</div>
              <div class="col-9">{this.state.project.categoryName}</div>
            </div>
            <div class="row justify-content-between stripped">
              <div class="col-4">Eligibility Criteria:</div>
              <div class="col-8">{this.state.project.eligibility}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default ProjectDetails;
