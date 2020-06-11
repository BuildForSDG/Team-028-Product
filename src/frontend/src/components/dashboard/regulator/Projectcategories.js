/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint no-console: "error" */


import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Table, Tag, Space } from "antd";

/*datasource*/
const datas = [
    {
      key: "1",
      name: "Agriculture",
      date: "2020-01-20",
    },
    {
      key: "2",
      name: "Information Technology",
      date: "2020-02-20",
    },
    {
      key: "3",
      name: "ISP",
      date: "2019-06-20",
      
    },
  ];

const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      /*render: text => <a>{text}</a>,*/
    },
    {
      title: "Date Created",
      dataIndex: "date",
      key: "date",
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
  

export default class Projectcategories extends Component {
  render() {
    return (
      <Card.Body>
        <div className="invest-fund">
          <h2 style={{textAlign:"center"}}>Project Categories</h2>
        </div>
        <div className="update" style={{textAlign:"center"}}>
          <h4> *** Categories View *** </h4>         
        </div>
        <Table columns={columns} dataSource={datas} />;
      </Card.Body>
    );
  }
}
