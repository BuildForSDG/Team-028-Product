/* eslint-disable no-multi-str */
/* eslint-disable no-console */
/* eslint no-console: "error" */
import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    this.fetchData = this.fetchData.bind(this);

    /*this.handlePagination = this.handlePagination.bind(this);*/
  }

  componentDidMount() {
    this.fetchData();
  }

  searchCategory(e) {
    e.preventDefault();

    const query = this.state.searchTerm;

    this.setState((prevState) => {
      let filteredCategories = prevState.projectcategories;
      if (query.trim() !== "") {
        filteredCategories = prevState.projectcategories.filter((element) => {
          return (
            element.categoryName.toLowerCase().includes(query.toLowerCase()) ||
            element.categoryDescription.toLowerCase().includes(query.toLowerCase())
          );
        });
      }
      return {
        filteredCategories
      };
    });
  }

  async fetchData() {
    await axios
      .get("https://eazsme-backend.herokuapp.com/milestones/all")
      .then(({ data }) => {
        const status = data.status;
        const result = data.data;

        if (status === "success") {
          this.setState({ data: result });
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    const data = this.state.data;
    return (
      <Card.Body>
        <div className="sachBody">
          <ul className="sach">
            <li>
              <Button
                style={{ float: "right", borderRadius: "5%", background: "orange" }}
                onClick={this.searchCategory}
                variant="defualt"
                type="submit"
              >
                {" "}
                Search
              </Button>
            </li>
            <li>
              <Form.Group controlId="searchId">
                <Form.Control
                  className="searchBar"
                  onChange={this.onChange}
                  style={{ width: "250px", float: "right", marginRight: "10px", marginBottom: "15px" }}
                  type="text"
                  placeholder="Enter Category name to search"
                  name="search"
                />
              </Form.Group>
            </li>
          </ul>
        </div>

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Application Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index, arr) => {
              let count = arr.length;
              return (
                <tr>
                  <td key={index}>{item.applicationId}</td>
                  <td key={index}>{item.name}</td>
                  <td key={index}>{item.description}</td>
                  <td key={index}>{item.startDate}</td>
                  <td key={index}>{item.endDate}</td>
                  <td key={index}>{item.progress}</td>
                  <td key={index}>{item.status}</td>
                  <td key={count++}>
                    <Link to={`/delete/${item.applicationId}`}>Delete</Link>|
                    <Link to={`/update/${item.applicationId}`}>Update</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>
    );
  }
}
export default View;
