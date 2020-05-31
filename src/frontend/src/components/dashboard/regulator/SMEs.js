/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Table, Tag, Space } from "antd";


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
            <h2 style={{textAlign:"center"}}>All SMEs</h2>
          </div>
          <div className="update" style={{textAlign:"center"}}>
            <h4> *** SMEs View *** </h4>         
          </div>
          <Table columns={columns} dataSource={data} />
        </Card.Body>
      );
    }
  }