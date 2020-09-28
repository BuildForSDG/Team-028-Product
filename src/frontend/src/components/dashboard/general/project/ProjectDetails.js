
import React from "react";
import { connect } from "react-redux";

import { fetch } from "../../../../redux/actionCreators";
import * as Types from "../../../../redux/types";


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
    const id = this.props.match.params.projectId;

    const { fetch } = this.props;

    fetch({
        url: `/project/${id}`,
        method: "get",
        data: null,
        onSuccess: Types.setProjectDetails
    }).then(()=>{
        const {project} = this.props;
        this.setState({ project });
    });
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

const mapDispatchToProps = (dispatch) =>{
    return {
        fetch : (data) => dispatch(fetch(data))
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.projectDetails
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
