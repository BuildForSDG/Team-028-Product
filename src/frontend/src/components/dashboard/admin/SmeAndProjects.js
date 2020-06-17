/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable no-console */
/* eslint no-console: "error" */

import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Link } from "react-router-dom";


export default class SmeAndProjects extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      id: "",
      searchData: "",
      foundData: [],
      valueChange: "",
      success: "",
      error: ""
    };

    this.fetchData = this.fetchData.bind(this);
    this.approveApplication = this.approveApplication.bind(this);
    //this.search = this.search.bind(this);
    //this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }
  approveApplication(){
    console.log(this.state.id);
    axios
    .put(`https://eazsme-backend.herokuapp.com/fund/update/${this.state.id}`)
    .then(({ data }) => {
      console.log(data);
      const  status  = data.status;
    
      if (status === "success") {
        this.setState({ success: "Fund Application Approved"});
        
      }
    })
    .catch((error) => console.log(error));
  }

  fetchData() {
    axios
      .get("https://eazsme-backend.herokuapp.com/fund/applications/all")
      .then(({ data }) => {
        console.log(data);
        const  status  = data.status;
        const projects = data.data;
        if (status === "success") {
          this.setState({ data: projects });
          
        }
      })
      .catch((error) => console.log(error));
  }


  render() {
    const data = this.state.data;
    return (
      <Card.Body>
      <div className="sme-project">
        <strong style={{textAlign:"center"}}>SMEs Projects</strong>
      </div>
      <div className="update" style={{textAlign:"center"}}>
          <em> List of Funds Related Projects </em>
        
        </div>
      <table class="table table-striped">
      <thead>
          <tr>
          <th>Application Code</th>
            <th>Project Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {data.map((item, index, arr) => {
            let count = arr.length;
              return (
                <tr>
                  <td > {this.state.id=item.id}</td>
                  <td key={index}>{item.projectName}</td>
                  <td key={index}>{item.description}</td>
                  <td key={index}>{item.dateStart}</td>
                  <td key={index}>{item.dateEnd}</td>
                  <td key={index}>
                   
                    <Link  onClick={this.approveApplication} to="">Approve</Link>
                  </td>
                </tr>
                
              );
            })}
          </tbody>

      </table>
    </Card.Body>
    );
  }
}
