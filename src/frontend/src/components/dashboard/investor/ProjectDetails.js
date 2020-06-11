/* eslint-disable no-multi-str */
/* eslint-disable no-console */
/* eslint no-console: "error" */
import React from "react";
import { Upload, message, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import reqwest from "reqwest";
// import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
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
  componentDidMount() {
    let projectproposals =  this.props.projectproposals;

    if (projectproposals.length < 1){
     projectproposals = JSON.parse(localStorage.getItem("proposals"));
    }
    
    const projects = projectproposals.filter(
      (project) => project.projectId === this.props.match.params.id
    );

    localStorage.setItem("proposals", JSON.stringify(projectproposals));
    this.setState({project: projects[0]});
  }
 
    render() {

    const dateCreated = new Date(`${this.state.project.dateCreated}`).toLocaleDateString();
    return (
      <>
      <div class="jumbotron p-4 p-md-5 text-dark rounded shadow-sm">
          
      <div class="container">
              <div class="row justify-content-start stripped">
                <div class="col-4">
                  Project Name: 
                </div>
                <div class="col-4">
                {this.state.project.projectName}
                </div>
              </div>
              <div class="row justify-content-start stripped">
                <div class="col-4">
                  Project ID: 
                </div>
                <div class="col-4">
                  {this.state.project.projectId}
                </div>
              </div>
              <div class="row justify-content-start stripped">
                <div class="col-4">
                  Application Date:
                </div>
                <div class="col-4">
                  {dateCreated}
                </div>
              </div>
              <div class="row justify-content-around">
                <div class="col-4">
                  Name of SME
                </div>
                <div class="col-4">
                  {this.state.project.companyName}
                </div>
              </div>
              <div class="row justify-content-between stripped">
                <div class="col-4">
                  SME ID.: 
                </div>
                <div class="col-4">
                  {this.state.project.organizationId}
                </div>
              </div>
              <div class="row justify-content-start stripped">
                <div class="col-4">
                  Amount Applied for: 
                </div>
                <div class="col-4">
                  N{this.state.project.fund}
                </div>
              </div>
            </div><br></br>
        <div class="container">
                <div class="row justify-content-start stripped">
                  <div class="col-4">
                    SME Address:
                  </div>
                  <div class="col-4">
                    {this.state.project.address}
                  </div>
                </div>
                <div class="row justify-content-center">
                  <div class="col-4">
                    Milestone:
                  </div>
                  <div class="col-4">
                  {this.state.project.status}
                  </div>
                </div>
                <div class="row justify-content-end stripped">
                  <div class="col-4">
                    How many previous completed project?
                  </div>
                  <div class="col-4">
                    N/A
                  </div>
                </div>
                <div class="row justify-content-around">
                  <div class="col-4">
                    Number of Staff:
                  </div>
                  <div class="col-4">
                    8 persons
                  </div>
                </div>
                <div class="row justify-content-between stripped">
                  <div class="col-3">
                    Project Description: 
                  </div>
                  <div class="col-9">
                    {this.state.project.description}
                  </div>
                </div>
                <div className="download">
                  <Button  type="primary">Download Proposal <DownloadOutlined /></Button> 
                </div>
              </div>
        </div>
      </>
    );
  }
}
export default ProjectDetails;
