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

  searchCategory(e){
    e.preventDefault();

    const query = this.state.searchTerm;

    this.setState((prevState) => {
      let filteredCategories = prevState.projectcategories;
      if (query.trim() !== ""){
        filteredCategories = prevState.projectcategories.filter((element) => {
          return element.categoryName.toLowerCase().includes(query.toLowerCase()) ||
          element.categoryDescription.toLowerCase().includes(query.toLowerCase());
        });
      }
      return {
        filteredCategories
      };
    });
  }

  async fetchData() {
    await axios
      .get("http://localhost:4000/projects/category/")
      .then(({ data }) => {
        const status = data.status;
        const result  = data.data;
        console.log("result"+data);
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
          <li><Button style={{float:"right",borderRadius:"5%",background:"orange"}}  variant="default" type="submit" > Search</Button></li>
            <li><Form.Group controlId="searchId">
            <Form.Control className="searchBar" style={{ width:"250px", float:"right",marginRight:"10px" }} type="text" placeholder="Enter project name to search" name="search" />
          </Form.Group></li>
          </ul>
        </div> 

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
            
              <th>Category Name</th>
              <th>Category Description</th>
              <th>Created By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index, arr) => {
              let count = arr.length;
              return (
                <tr>
                  <td key={index}>{item.projectCatId}</td>
                  <td key={index}>{item.categoryName}</td>
                  <td key={index}>{item.categoryDescription}</td>
                  <td key={index}>{item.createdBy}</td>
                  <td key={count++}>
                    <Link to={`/delete/${item.projectCatId}`}>Delete</Link>|
                    <Link to={`/update/${item.projectCatId}`}>Update</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item active>{12}</Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item disabled>{14}</Pagination.Item>

          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </Card.Body>
    );
  }
}
export default View;