import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";


export default class SmeAndProjects extends Component {
  render() {
    
    return (
      <Card.Body>
      <div className="sme-project">
        <h2 style={{textAlign:"center"}}>SMEs/Projects</h2>
      </div>
      <div className="update" style={{textAlign:"center"}}>
          <h4> *** New Request *** </h4>
          <p>Kuda Micro finance just signed in as an investor and needs to be verified</p>
        </div>
      <Table striped bordered hover variant="dark">
        {/* dummy data to be replaced with real data */}
      <thead>
          <tr>
            <th>Action</th>
            <th>Nos.</th>
            <th>Date</th>
            <th>Full Details</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>Pending Background Check</td>
              <td>3</td>
              <td>25/05/2020</td>
              <td> <button className="table-btn"> View Details</button> </td>
            </tr>
            <tr>
              <td>Checked/Approved</td>
              <td>12</td>
              <td>25/05/2020</td>
              <td> <button className="table-btn"> View Details</button> </td>
            </tr>
            <tr>
              <td>Checked/Not Approved</td>
              <td>15</td>
              <td>25/05/2020</td>
              <td> <button className="table-btn"> View Details</button> </td>
            </tr>
            <tr>
              <td>Recieved Projects</td>
              <td>16</td>
              <td>25/05/2020</td>
              <td> <button className="table-btn"> View Details</button> </td>
            </tr>
            <tr>
              <td>Feasible Projects</td>
              <td>9</td>
              <td>25/05/2020</td>
              <td> <button className="table-btn"> View Details</button> </td>
            </tr>
            <tr>
              <td>Projects approved for funding</td>
              <td>5</td>
              <td>25/05/2020</td>
              <td> <button className="table-btn"> View Details</button> </td>
            </tr>
            <tr>
              <td>Blacklisted</td>
              <td>1</td>
              <td>25/05/2020</td>
              <td> <button className="table-btn"> View Details</button> </td>
            </tr>
          </tbody>

      </Table>
    </Card.Body>
    );
  }
}
