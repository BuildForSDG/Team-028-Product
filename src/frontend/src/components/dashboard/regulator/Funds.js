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
      category: "Loan",
      Amount: "N200,000,00",      
      Status: "Approved",
     
    },
    {
      key: "2",
      Organization: "eazSME",
      category: "Government SME Grant",
      Amount: "N5,000,000,00",      
      Status: "Disbursed",
    },
    {
      key: "3",
      Organization: "SWIFTY Networks",
      category: "Loan",
      Amount: "N500,000,00",      
      Status: "Rejected",
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
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
    },
    
      {
        title: "Status",
        dataIndex: "Status",
        key: "Status",
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

export default class Funds extends Component {
    render() {
      return (
        <Card.Body>
          <div className="invest-fund">
            <h5 style={{textAlign:"center"}}>All Funds Application</h5>
          </div>
          <div className="update" style={{textAlign:"center"}}>
            <h5> *** Funds Application View *** </h5>         
          </div>
          <Table columns={columns} dataSource={data} />
        </Card.Body>
      );
    }
  }