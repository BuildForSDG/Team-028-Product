

import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Card, Button, Form} from "react-bootstrap";

export default class Investors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      investors: [],
      filteredInvestors: [],
      searchTerm: ""
    };
    this.searchInvestors = this.searchInvestors.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  componentDidMount() {
    const { investors } = this.props
    this.setState({ investors, filteredInvestors: investors });
  }
  searchInvestors(e){
    e.preventDefault();

    const query = this.state.searchTerm;

    this.setState((prevState) => {
      let filteredInvestors = prevState.investors;
      if (query.trim() !== ""){
        filteredInvestors = prevState.investors.filter((element) => {
          const address = element.address  || "";
          const companyName =  element.companyName || "";

          return address.toLowerCase().includes(query.toLowerCase()) ||
                companyName.toLowerCase().includes(query.toLowerCase());
        });
      }
      return {
        filteredInvestors
      };
    });
  }
  onChange(e){
    const value =  e.target.value;
    if (value.trim() === ""){
      this.setState({filteredInvestors: this.state.investors, searchTerm: value});
    }else{
      this.setState({searchTerm: value});
    }
    
  }
    render() {
      const data = this.state.filteredInvestors;
      return (
        <Card.Body>
          <div className="invest-fund">
            <h5 style={{textAlign:"center"}}>All Investors</h5>
          </div>
          <div className="update" style={{textAlign:"center"}}>
            <h5> *** Investors View *** </h5>         
          </div>
          <div className="sachBody">
        <ul className="sach">
          <li><Button style={{float:"right",borderRadius:"5%",background:"orange"}}  variant="default" type="submit" onClick={this.searchInvestors} > Search</Button></li>
            <li><Form.Group controlId="searchId">
            <Form.Control className="searchBar" onChange={this.onChange} style={{ width:"250px", float:"right",marginRight:"10px",marginBottom:"15px" }} type="text" placeholder="Enter name to search" name="search" />
          </Form.Group></li>
          </ul>
        </div> 
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Category</th>
              <th>RC Number</th>
              <th>Address</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index, arr) => {
              return (
                <tr key={index}>
                  <td>{item.companyName}</td>
                  <td>{item.category}</td>
                  <td>{item.RCNumber}</td>
                  <td>{item.address}</td>
                  <td>{item.email}</td>
                  <td>
                    <Link to={`/view-company/${item.organizationId}`}>View Details</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
          {/* <Table columns={columns} dataSource={data} /> */}
        </Card.Body>
      );
    }
  }