/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Table, Tag, Space } from "antd";


/*datasource*/
const data = [
    {
      key: "1",
      firstName: "Moses",
      lastName: "Joe",
      Email: "mosesnwaeze@yahoo.com",      
      Organization: "eazSME",
      Phone: "348054683765",
    },
    {
        key: "2",
        firstName: "Emilia",
        lastName: "John",
        Email: "emilia@yahoo.com",      
        Organization: "eazSME",
        Phone: "2348059383765",
    },
    {
        key: "3",
        firstName: "Onyedikachi",
        lastName: "Kachi",
        Email: "kachi@yahoo.com",      
        Organization: "eazSME",
        Phone: "2348034683765",
    },
    
  ];

const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      /* render: text => <a>{text}</a>,*/
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
        title: "Organization",
        dataIndex: "Organization",
        key: "Organization",
      },
      {
        title: "Phone",
        dataIndex: "Phone",
        key: "Phone",
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

export default class Users extends Component {
    render() {
      return (
        <Card.Body>
          <div className="invest-fund">
            <h2 style={{textAlign:"center"}}>All Users</h2>
          </div>
          <div className="update" style={{textAlign:"center"}}>
            <h4> *** Users View *** </h4>         
          </div>
          <Table columns={columns} dataSource={data} />
        </Card.Body>
      );
    }
  }