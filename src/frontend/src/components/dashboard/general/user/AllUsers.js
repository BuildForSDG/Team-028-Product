
import React from "react";
import { Card, Table } from "react-bootstrap";

import { Link } from "react-router-dom";


import * as Types from "../../../../redux/types";
import {fetch } from "../../../../redux/actionCreators";


class allUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { dispatch } = this.props;

    const fetchOrganizationUsers = fetch({
      url:  `/users/organization/${this.props.user.organizationId}`,
      method: "get",
      data: {organizationId: this.props.user.organizationId},
      onSuccess: Types.setOrganizationUsers
    });

    dispatch(fetchOrganizationUsers).then(()=>{
      this.setState({ data: this.props.organizationusers });
    });
  }

  render() {
    const data = this.state.data;
    return (
      <Card.Body>
  
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
            
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Privilege</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index, arr) => {
              let count = arr.length;
              return (
                <tr key={index}>
                  <td>{item.firstName}</td>
                  <td >{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.privilege}</td>
                   <td key={count++}>
                    <Link to={`/delete/${item.id}`}>Deactivate</Link>|
                   </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
       
      </Card.Body>
    );
  }
}
export default allUsers;