/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Table, Tag, Space } from "antd";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


/*datasource*/
const data = [
    {
      key: "1",
      Organization: "FCT Farmer",
      category: "Agriculture",
      RCNumber: "RC0304CH",      
      Incorporation: "2019-01-20",
      Email: "fctfarm@gmail.com",
    },
    {
      key: "2",
      Organization: "eazSME",
      category: "Information Technology",
      RCNumber: "RC030447",      
      Incorporation: "2020-07-20",
      Email: "eazSME@info.net",
    },
    {
      key: "3",
      Organization: "SWIFTY Networks",
      category: "ISP",
      RCNumber: "RC058447",      
      Incorporation: "2008-07-20",
      Email: "swiftynet@info.net",
    },
  ];

const columns = [
    {
      title: "Company Name",
      dataIndex: "Organization",
      key: "Organization",
      /* render: text => <a>{text}</a>,*/
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "RCNumber",
      dataIndex: "RCNumber",
      key: "RCNumber",
    },
    {
        title: "Incorporation Date",
        dataIndex: "Incorporation",
        key: "Incorporation",
      },
      {
        title: "Company Email",
        dataIndex: "Email",
        key: "Email",
      },
     {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
                <Link to="#"> View Details</Link>
        </Space>
      ),
    },
  ];

export default class SMEs extends Component {
    render() {
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
          <li><Button style={{float:"right",borderRadius:"5%",background:"orange"}}  variant="default" type="submit" > Search</Button></li>
            <li><Form.Group controlId="searchId">
            <Form.Control className="searchBar" style={{ width:"250px", float:"right",marginRight:"10px",marginBottom:"15px" }} type="text" placeholder="Enter project name to search" name="search" />
          </Form.Group></li>
          </ul>
        </div> 
          <Table columns={columns} dataSource={data} />
        </Card.Body>
      );
    }
  }