/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Table, Tag, Space } from "antd";

/*datasource*/
const data = [
    {
      key: "1",
      name: "Coco Plantation Setup",
      category: "Agriculture",
      Organization: "FCT Farmer",
      startDate: "2019-01-20",
      endDate: "2020-01-20",
      status:"In Progress",
    },
    {
      key: "2",
      name: "IOT for Lagos State",
      category: "Information Technology",
      Organization: "eazSME",
      startDate: "2020-01-20",
      endDate: "2020-12-20",
      status:"Completed: under review",
    },
    {
      key: "3",
      name: "5G networks installation",
      category: "ISP",
      Organization: "SWIFTY Networks",
      startDate: "2019-06-20",
      endDate: "2020-01-20",
      status:"Closed",
    },
  ];

const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      /* render: text => <a>{text}</a>,*/
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Organization",
      dataIndex: "Organization",
      key: "Organization",
    },
    {
        title: "Start Date",
        dataIndex: "startDate",
        key: "startDate",
      },
      {
        title: "End Date",
        dataIndex: "endDate",
        key: "endDate",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
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
  

export default class Projects extends Component {
  render() {
    return (
      <Card.Body>
        <div className="invest-fund">
          <h2 style={{textAlign:"center"}}>Funded Projects</h2>
        </div>
        <div className="update" style={{textAlign:"center"}}>
          <h4> *** Projects View *** </h4>         
        </div>
        <Table columns={columns} dataSource={data} />
      </Card.Body>
    );
  }
}
