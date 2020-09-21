/* eslint-disable no-console */
/* eslint no-console: "error" */

import React from "react";

import { Link } from "react-router-dom";

import { Form, Button} from "react-bootstrap"


class InvesmentHistory extends React.Component {
  componentDidMount() {
  }
  render() {
    const data = this.props.disbursements;
    return (
      <>
      <div className="sachBody">
        <ul className="sach">
          <li><Button style={{float:"right",borderRadius:"5%",background:"orange"}}  variant="default" type="submit" > Search</Button></li>
            <li><Form.Group controlId="searchId">
            <Form.Control className="searchBar" style={{ width:"250px", float:"right",marginRight:"10px" }} type="text" placeholder="Enter project name to search" name="search" />
          </Form.Group></li>
          </ul>
        </div>

      <div>
          <div className="invest-Title">List of Funded Projects</div>
        </div>

      <table class="table table-sm table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">SME Name</th>
            <th scope="col">Project Name</th>
            <th scope="col">Amount Disbursed</th>
            <th scope="col">status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
            {data.map((item, index, arr) => {
              return (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.disbursedTo}</td>
                  <td>{item.projectName}</td>
                  <td>{item.fund}</td>
                  <td>{item.status}</td>
                  <td>
                    <Link to={`/milestone/${item.projectId}`}>more details <svg class="bi bi-box-arrow-up-right" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M1.5 13A1.5 1.5 0 0 0 3 14.5h8a1.5 1.5 0 0 0 1.5-1.5V9a.5.5 0 0 0-1 0v4a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 0 0-1H3A1.5 1.5 0 0 0 1.5 5v8zm7-11a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.5H9a.5.5 0 0 1-.5-.5z"/>
              <path fill-rule="evenodd" d="M14.354 1.646a.5.5 0 0 1 0 .708l-8 8a.5.5 0 0 1-.708-.708l8-8a.5.5 0 0 1 .708 0z"/>
              </svg></Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
      </table>
      </>
    );
  }
}
export default InvesmentHistory;