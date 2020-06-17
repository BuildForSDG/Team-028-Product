/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint no-console: "error" */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Table, Tag, Space } from "antd";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default class Investors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      filteredProjects: [],
      searchTerm: ""
    };

    this.fetchData = this.fetchData.bind(this);
    this.searchProjects = this.searchProjects.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  componentDidMount() {
    this.fetchData();
  }
  searchProjects(e){
    e.preventDefault();

    const query = this.state.searchTerm;

    this.setState((prevState) => {
      let filteredProjects = prevState.projects;
      if (query.trim() !== ""){
        filteredProjects = prevState.projects.filter((element) => {
          const description = element.description || "";
          const projectName =  element.projectName || "";

          return description.toLowerCase().includes(query.toLowerCase()) ||
          projectName.toLowerCase().includes(query.toLowerCase());
        });
      }
      return {
        filteredProjects
      };
    });
  }
  onChange(e){
    const value =  e.target.value;
    if (value.trim() === ""){
      this.setState({filteredProjects: this.state.projects, searchTerm: value});
    }else{
      this.setState({searchTerm: value});
    }
    
  }
  async fetchData() {
    const data = await axios.get("https://eazsme-backend.herokuapp.com/organization/:id");
    const projects = data.data.data;  
    this.setState({projects, filteredProjects: projects});
  }
    render() {
      const data = this.state.filteredProjects;
      return (
        <Card.Body>
          <div className="invest-fund">
            <h5 style={{textAlign:"center"}}>All Investors</h5>
          </div>
          <div className="update" style={{textAlign:"center"}}>
            <h5> *** Investors View *** </h5>         
          </div>
          <div className="sachBody">
        <ul className="sach">
          <li><Button style={{float:"right",borderRadius:"5%",background:"orange"}}  variant="default" type="submit" > Search</Button></li>
            <li><Form.Group controlId="searchId">
            <Form.Control className="searchBar" style={{ width:"250px", float:"right",marginRight:"10px",marginBottom:"15px" }} type="text" placeholder="Enter name to search" name="search" />
          </Form.Group></li>
          </ul>
        </div> 
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Category</th>
              <th>RC Number</th>
              <th>Incorperation Date</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index, arr) => {
              return (
                <tr key={index}>
                  <td>{item.companyName}</td>
                  <td>{item.category}</td>
                  <td>{item.RCNumber}</td>
                  <td>{item.dateIncorporated}</td>
                  <td>{item.email}</td>
                  <td>
                    <Link to={`/view-project/${item.organizationId}`}>View Details</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
          {/* <Table columns={columns} dataSource={data} /> */}
        </Card.Body>
      );
    }
  }