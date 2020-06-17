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


class ProposalDetails extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      proposal: {
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
    
    const proposals = projectproposals.filter(
      (proposal) => proposal.applicationId === this.props.match.params.id
    );

    localStorage.setItem("proposals", JSON.stringify(projectproposals));
    this.setState({proposal: proposals[0]});
  }
 
    render() {
    const startDate = new Date(`${this.state.proposal.dateStart}`).toLocaleDateString();
    const endDate = new Date(`${this.state.proposal.dateEnd}`).toLocaleDateString();
    const milestoneStart = new Date(`${this.state.proposal.milestoneStart}`).toLocaleDateString();
    const milestoneEnd = new Date(`${this.state.proposal.milestoneEnd}`).toLocaleDateString();
    return (
      <>
      <div class="jumbotron p-4 p-md-5 text-dark rounded shadow-sm">
          
      <div class="container">
              <div class="row justify-content-start stripped">
                <div class="col-4">
                  Project Name: 
                </div>
                <div class="col-4">
                {this.state.proposal.projectName}
                </div>
              </div>
              <div class="row justify-content-start stripped">
                <div class="col-4">
                  Project ID: 
                </div>
                <div class="col-4">
                  {this.state.proposal.projectId}
                </div>
              </div>
              <div class="row justify-content-start stripped">
                  <div class="col-4">
                    Project Description: 
                  </div>
                  <div class="col-8">
                    {this.state.proposal.description}
                  </div>
                </div>
              <div class="row justify-content-start stripped">
                <div class="col-4">
                  Start Date:
                </div>
                <div class="col-4">
                  {startDate}
                </div>
              </div>
              <div class="row justify-content-start stripped">
                <div class="col-4">
                  End Date:
                </div>
                <div class="col-4">
                  {endDate}
                </div>
              </div>
        </div>
        <br/>
        <div class="container">
              <div class="row justify-content-start stripped">
                <div class="col-4">
                  Name of SME
                </div>
                <div class="col-8">
                  {this.state.proposal.companyName}
                </div>
              </div>
              <div class="row justify-content-start stripped">
                <div class="col-4">
                  Organization Address
                </div>
                <div class="col-8">
                  {this.state.proposal.address}
                </div>
              </div>
              <div class="row justify-content-start stripped">
                <div class="col-4">
                  Amount Applied for: 
                </div>
                <div class="col-8">
                  N{this.state.proposal.fund}
                </div>
              </div>
            </div><br></br>
        <div class="container">
                <div class="row justify-content-start stripped">
                  <div class="col-4">
                    Milestone: 
                  </div>
                  <div class="col-4">
                  {this.state.proposal.milestoneName}
                  </div>
                </div>
                <div class="row justify-content-start stripped">
                  <div class="col-4">
                    Start: 
                  </div>
                  <div class="col-4">
                  {milestoneStart}
                  </div>
                </div>
                <div class="row justify-content-start stripped">
                  <div class="col-4">
                    End: 
                  </div>
                  <div class="col-4">
                  {milestoneEnd}
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
                <div className="download">
                  <Button  type="primary" href={this.state.proposal.filepath}>Download Proposal <DownloadOutlined /></Button> 
                </div>
              </div>
        </div>
      </>
    );
  }
}
export default ProposalDetails;
