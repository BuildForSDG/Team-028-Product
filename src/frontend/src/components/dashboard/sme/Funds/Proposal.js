
import React from "react";


import { Card, Table, Button, Form} from "react-bootstrap";

import { Link } from "react-router-dom";
class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      existingApplications: [],
      filteredApplications: [],
      searchTerm: ""
    };

    this.searchApplications = this.searchApplications.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const {existingApplications} = this.props;

    this.setState({ existingApplications, filteredApplications: existingApplications });
  }

  searchApplications(e) {
    e.preventDefault();

    const query = this.state.searchTerm; 

    this.setState((prevState) => {
      let filteredApplications = prevState.existingApplications;
      if (query.trim() !== ``) {
        filteredApplications = prevState.existingApplications.filter((element) => {
          return (
            element.projectName.toLowerCase().includes(query.toLowerCase()) ||
            element.description.toLowerCase().includes(query.toLowerCase())
          );
        });
      }
      return {
        filteredApplications
      };
    });
  }
  onChange(e) {
    const value = e.target.value;
    if (value.trim() === ``) {
      this.setState({ filteredApplications: this.state.existingApplications, searchTerm: value });
    } else {
      this.setState({ searchTerm: value });
    }
  }

  render() {
    const data = this.state.filteredApplications;
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
                onClick={this.searchApplications}
              >
                {` `}
                Search
              </Button>
            </li>
            <li>
              <Form.Group controlId="searchId">
                <Form.Control
                  className="searchBar"
                  style={{ width: `250px`, float: `right`, marginRight: `10px`, marginBottom: `15px` }}
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
                <th>Amount Received</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index, arr) => {
                return (
                  <tr key={index}>
                    <td>{item.projectName}</td>
                    <td>{item.description}</td>
                    <td>{item.createdBy}</td>
                    <td>{item.dateStart}</td>
                    <td>{item.dateEnd}</td>
                   <td>
                      <Link to={`view-project/${item.projectId}`}>View Details</Link>
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
