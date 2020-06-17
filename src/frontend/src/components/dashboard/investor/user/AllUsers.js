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


class allUsers extends React.Component {
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
    const userObj = JSON.parse(localStorage.getItem("userObj"));
    if (userObj) {
      this.setState(() => ({ userObj }));
      console.log(userObj);
    }
  }

 
  //https://eazsme-backend.herokuapp.com/projects/category/
  async fetchData() {
    await axios
      .get( `https://eazsme-backend.herokuapp.com/users/category/${this.state.userObj.organizationId} `)
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
  
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
            
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Privilege</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index, arr) => {
              let count = arr.length;
              console.log({index});
                            return (
                <tr>
                  {/*<td key={index}>{item.projectCatId}</td>*/}
                  <td >{item.firstName}</td>
                  <td >{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.privilege}</td>
                   <td key={count++}>
                    <Link to={`/delete/${item.id}`}>Deactivate</Link>|
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
export default allUsers;