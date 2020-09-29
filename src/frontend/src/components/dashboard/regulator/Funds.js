
import React, { Component } from "react";

import Card from "react-bootstrap/Card";

export default class Funds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fundapplications: []
    };
  }

  componentDidMount() {
    const { fundapplications } = this.props;
    this.setState({fundapplications});
  }
  render() {
    const data = this.state.fundapplications;
    return (
      <Card.Body>
        <div className="invest-fund">
          <h5 style={{ textAlign: "center" }}>All Fund Applications</h5>
        </div>
        <div className="update" style={{ textAlign: "center" }}>
          <h5> *** Funds Application View *** </h5>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Project Name</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date Initiated</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index} >
                  <td>{item.companyName}</td>
                  <td>{item.projectName}</td>
                  <td>{item.amount}</td>
                  <td>{item.status}</td>
                  <td>{item.dateInitiated}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card.Body>
    );
  }
}
