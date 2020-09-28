
import React from "react";

import { Link } from "react-router-dom";

import { Form, Card, Table, Button }  from "react-bootstrap";

class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      searchData: ``,
      foundData: [],
      valueChange: ``
    };

    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const { projects } = this.props;
    
    const newResults = projects.filter((item) => {
      return item.fund === `funded`;
    });
    
    this.setState({ data: newResults });
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
    const data = this.state.data;
    const filterInput = data.filter((item) => item.projectName === event.target.value);
    this.setState({ valueChange: filterInput });
  }
  render() {
    const data = this.state.data;
    const foundData = this.state.foundData;
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
                  style={{ width: `250px`, float: `right`, marginRight: `10px`, marginBottom: `15px` }}
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
                  <tr key={index}>
                    <td>{item.projectName}</td>
                    <td>{item.description}</td>
                    <td>
                        {/* <Link to={{ pathname: `/sme/Projects/ProjectDetails/`, queryid: item.projectId  }}> View Details </Link>*/}
                         <Link to={`/${this.props.userCat}/view-project/${item.projectId}`}>View Details</Link>
                   </td>
                    <td key={count++}>
                   {/*   <Link to={`/sme/Funds/NewApplication/${item.projectId}`}>Apply</Link>*/}
                      <Link to={{ pathname: `/sme/funds/apply/`, query: item.projectId  }}> Apply </Link>
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
