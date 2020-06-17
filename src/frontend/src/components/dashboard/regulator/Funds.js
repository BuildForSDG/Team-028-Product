/* eslint-disable no-console */
/* eslint no-console: "error" */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Table, Tag, Space } from "antd";

export default class Funds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      funds: []
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const data = await axios.get("https://eazsme-backend.herokuapp.com/organization/:id");
    const funds = data.data.data;  
    this.setState({funds});
  }
    render() {
      const data = this.state.funds;
      return (
        <Card.Body>
          <div className="invest-fund">
            <h5 style={{textAlign:"center"}}>All Funds Application</h5>
          </div>
          <div className="update" style={{textAlign:"center"}}>
            <h5> *** Funds Application View *** </h5>         
          </div>
          <table class="table table-striped">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index, arr) => {
              return (
                <tr key={index}>
                  <td>{item.organizationId}</td>
                  <td>{item.fundCatId}</td>
                  <td>{item.amount}</td>
                  <td>{item.status}</td>
                  <td>
                    <Link to={`/view-project/${item.organizationId}`}>View Details</Link>
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