/* eslint-disable no-multi-str */
/* eslint-disable no-console */
/* eslint no-console: "error" */
import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Search from "antd/lib/transfer/search";

class View extends React.Component {
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
          return element.projectName.toLowerCase().includes(query.toLowerCase()) ||
          element.description.toLowerCase().includes(query.toLowerCase());
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
    const data = await axios.get("https://eazsme-backend.herokuapp.com/projects/all");
    const projects = data.data.data;  
    this.setState({projects, filteredProjects: projects});
  }

  render() {
    const data = this.state.filteredProjects;
    return (
      <Card.Body>
        {/* 8w>
        </div>  */}
        {/* <Table striped bordered hover size="sm"> */}
        <table class="table table-striped">
          <thead>
            <tr>
              {/* <th>Project Id</th>
              <th>Category Id</th> */}
              <th>Project Name</th>
              {/* <th>Category</th> */}
              <th>Project Description</th>
              {/* <th>Created By</th> */}
              <th>Date Started</th>
              <th>Date Ended</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index, arr) => {
              return (
                <tr key={index}>
                  {/* <td>{item.projectId}</td>
                  <td>{item.projectCatId}</td> */}
                  <td>{item.projectName}</td>
                  {/* <td>{item.category}</td> */}
                  <td>{item.description}</td>
                  {/* <td>{item.createdBy}</td> */}
                  <td>{item.dateStart}</td>
                  <td>{item.dateEnd}</td>
                  <td>
                    <Link to={`/view-project/${item.projectId}`}>View Details</Link>
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
export default View;
