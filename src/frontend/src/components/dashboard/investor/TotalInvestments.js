/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import axios from "axios";

class TotalInvestments extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      investments: []
    };
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }
  async fetchData() {
    const url = `https://eazsme-backend.herokuapp.com/funds/${this.props.user.organizationId}`;
    
    const data = await axios.get(url);
    const investments = data.data.data;

    this.setState({investments});
  }
  sumInvestments(arr){
    return arr.reduce((acc, investment) => {
      const value = parseInt(investment.amount, 10) || 0;
      return acc + value;
    },0);
  }
  render() {
    const data = this.state.investments;
    const Total = this.sumInvestments(data);
    return (
      <>
        <div className="invest-Title">
          See how much you've invested
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Status</th>
              <th scope="col">Date Initiated</th>
              <th scope="col">Amount(#)</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index, arr) => {
              return (
                <tr key={index}>
                  <td>{index+1}</td>
                  
                  <td>{item.status}</td>
                  <td>{item.dateInitiated}</td>
                  <td>{item.amount}</td>
                  <td>
                    <Link to={`/update-investment/${item.fundId}`}>update payment details</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <thead>
            <tr>
              <th scope="col">Total</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col">{Total}</th>
              <th scope="col"></th>
            </tr>
          </thead>
        </table>
      </>
    );
  }
}
export default TotalInvestments;