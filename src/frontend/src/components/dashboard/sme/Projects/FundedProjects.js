/*eslint quotes: ["error", "backtick"]*/
/*eslint-env es6*/
/* eslint-disable no-unused-expressions */
/* eslint-disable no-multi-str */
/* eslint-disable no-console */
/* eslint no-console: "error" */
import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      searchData: ``,
      foundData: [],
      valueChange: ``
    };

    this.fetchData = this.fetchData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios
      .get(`http://localhost:4000/projects/all`)
      .then(({ data }) => {
        const  status  = data.status;
        const projects = data.data;
        if (status === `success`) {
          this.setState({ data: projects });
        }
      })
      .catch((error) => console.log(error));
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ searchData: event.target.value });
  }

  search(event) {
    event.preventDefault();
    const { data, searchData, foundData } = this.state;
    const one = document.querySelector(`table[name="one"]`);
    const all = document.querySelector(`table[name="all"]`);
    const item = data.filter((item) => item.projectName.toLocaleLowerCase() === searchData.toLocaleLowerCase());
    this.setState({ foundData: item });
    if (!foundData) {
      all.classList.remove(`d-none`);
      one.classList.add(`d-none`);
    } else {
      one.classList.remove(`d-none`);
      all.classList.add(`d-none`);
    }
  }

  handleSearch(event) {
    event.preventDefault();
    const  data  = this.state.data;
    const filterInput = data.filter((item) => item.projectName === event.target.value);
    this.setState({ valueChange: filterInput });
  }
  render() {
    const  data  = this.state.data;
    const  foundData  = this.state.foundData;
    return (
      <>
      <br></br>
        <div className="sachBody">
          <ul className="sach sme">
            <li>
              <Button
                style={{ float: `right`, borderRadius: `5%`, background: `orange` }}
                variant="default"
                type="submit"
                onClick={this.search}
              >
                {` `}
                Search
              </Button>
            </li>
            <li>
              <Form.Group controlId="searchId">
                <Form.Control
                  className="searchBar"
                  style={{ width: `250px`, float: `right`, marginRight: `10px`,marginBottom:`15px` }}
                  type="text"
                  placeholder="Enter project name to search"
                  name="search"
                  onChange={this.handleSearch}
                  defaultValue={this.state.valueChange}
                />
              </Form.Group>
            </li>
          </ul>
        </div>
        <Card.Body>
          <h4 className="fund-text2">Click on Apply to beging a New Application</h4>
          <Table striped bordered hover size="sm" className="d-none" name="one">
            <thead>
              <tr>
                <th>Project Id</th>
                <th>Category Id</th>
                <th>Project Name</th>
                <th>Project Description</th>
                <th>Created By</th>
                <th>Date Started</th>
                <th>Date Ended</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {foundData.map((item, index, arr) => {
                let count = arr.length;
                return (
                  <tr>
                    <td key={index}>{item.projectId}</td>
                    <td key={index}>{item.projectCatId}</td>
                    <td key={index}>{item.projectName}</td>
                    <td key={index}>{item.description}</td>
                    <td key={index}>{item.createdBy}</td>
                    <td key={index}>{item.dateStart}</td>
                    <td key={index}>{item.dateEnd}</td>
                    <td key={index}>{item.dateCreated}</td>
                    <td key={count++}>
                      <Link to={`/view-project/${item.projectId}`}>View Details</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Table striped bordered hover size="sm" name="all">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Project Description</th> 
                <th>View</th> 
                <th>Action</th>                
              </tr>
            </thead>
            <tbody>
              {data.map((item, index, arr) => {
                let count = arr.length;
                return (
                  <tr>
                    <td key={index}>{item.projectName}</td>
                    <td key={index}>{item.description}</td>
                    <td key={count++}>
                      <Link to={`/view-project/${item.projectId}`}>View Details</Link>
                    </td>
                    <td key={count++}>
                      <Link to={`/view-project/${item.projectId}`}>Apply</Link>
                    </td>
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
