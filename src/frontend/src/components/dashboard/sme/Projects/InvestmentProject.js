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

  fetchData() {
    axios
    //.get(`https://eazsme-backend.herokuapp.com/projects/all`)
      .get("https://eazsme-backend.herokuapp.com/projects/all")
      .then(({ data }) => {
        const status = data.status;
        const results = data.data;

        if (status === "success") {
          let newResults = results.filter((items) => {
            // convert date string to Date
            let st = items.dateEnd; //
            let dt = new Date(st);
            let expireDate = new Date();

            // compare date to determine and return projects opened for applications
            return expireDate < dt;
             //console.log(expireDate < dt)
          });

          this.setState({ projects: newResults });
        }
      })
      .catch((error) => console.log(error));
  }

  searchProjects(e) {
    e.preventDefault();

    const query = this.state.searchTerm;

    this.setState((prevState) => {
      let filteredProjects = prevState.projects;
      if (query.trim() !== "") {
        filteredProjects = prevState.projects.filter((element) => {
          return (
            element.projectName.toLowerCase().includes(query.toLowerCase()) ||
            element.description.toLowerCase().includes(query.toLowerCase())
          );
        });
      }
      return {
        filteredProjects
      };
    });
  }
  onChange(e) {
    const value = e.target.value;
    if (value.trim() === "") {
      this.setState({ filteredProjects: this.state.projects, searchTerm: value });
    } else {
      this.setState({ searchTerm: value });
    }
  }

  render() {
    const data = this.state.projects;
    let filterData = data.map((obj) => {});
    return (
      <>
        <br></br>
        <div className="sachBody">
          <ul className="sach sme">
            <li>
              <Button
                style={{ float: "right", borderRadius: "5%", background: "orange" }}
                variant="default"
                type="submit"
                onClick={this.searchProjects}
              >
                {" "}
                Search
              </Button>
            </li>
            <li>
              <Form.Group controlId="searchId">
                <Form.Control
                  className="searchBar"
                  style={{ width: "250px", float: "right", marginRight: "10px", marginBottom: "15px" }}
                  type="text"
                  placeholder="Enter project name to search"
                  name="search"
                  onChange={this.onChange}
                />
              </Form.Group>
            </li>
          </ul>
        </div>
        <Card.Body>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Project Description</th>
                <th>Created By</th>
                <th>Date Started</th>
                <th>Date Ended</th>
                <th>Fund</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.projectName}</td>
                    <td>{item.description}</td>
                    <td>{item.createdBy}</td>
                    <td>{item.dateStart}</td>
                    <td>{item.dateEnd}</td>
                    <td>{item.fund}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </>
    );
  }
}
export default View;
