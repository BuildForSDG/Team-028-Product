
import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Card, Button, Form} from "react-bootstrap";
import { smesReducer } from "../../../redux/reducers/reducers";


export default class SMEs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      smes: [],
      filteredSMEs: [],
      searchTerm: ""
    };

    this.searchSMEs = this.searchSMEs.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  componentDidMount() {
    const { smes } = this.props
    this.setState({ smes, filteredSMEs: smes });
  }
  searchSMEs(e){
    e.preventDefault();

    const query = this.state.searchTerm;

    this.setState((prevState) => {
      let filteredSMEs = prevState.smes;
      if (query.trim() !== ""){
        filteredSMEs = prevState.smes.filter((element) => {
          const address = element.address || "";
          const companyName =  element.companyName || "";

          return address.toLowerCase().includes(query.toLowerCase()) ||
          companyName.toLowerCase().includes(query.toLowerCase());
        });
      }
      return {
        filteredSMEs
      };
    });
  }
  onChange(e){
    const value =  e.target.value;
    if (value.trim() === ""){
      this.setState({filteredSMEs: this.state.smes, searchTerm: value});
    }else{
      this.setState({searchTerm: value});
    }
    
  }
    render() {
      const data = this.state.filteredSMEs;
      return (
        <Card.Body>
          <div className="invest-fund">
            <h5 style={{textAlign:"center"}}>All SMEs</h5>
          </div>
          <div className="update" style={{textAlign:"center"}}>
            <h5> *** SMEs View *** </h5>
          </div>
          <div className="sachBody">
        <ul className="sach">
          <li><Button style={{float:"right",borderRadius:"5%",background:"orange"}}  variant="default" type="submit" onClick={this.searchSMEs}> Search</Button></li>
            <li><Form.Group controlId="searchId">
            <Form.Control className="searchBar" style={{ width:"250px", float:"right",marginRight:"10px",marginBottom:"15px" }} type="text" placeholder="Enter name to search" name="search" onChange={this.onChange} />
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