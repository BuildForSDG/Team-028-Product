/* eslint-disable no-multi-str */
/* eslint-disable no-console */
/* eslint no-console: "error" */
import React from "react";
import { Upload, message, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import reqwest from "reqwest";
// import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import axios from "axios";


class FundDetails extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      fund: {

      }
    };
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }
  async fetchData() {
    const url = `https://eazsme-backend.herokuapp.com/funds/${this.props.match.params.id}`;
    
    const data = await axios.get(url);

    const project = data.data.data[0];

    this.setState({project});
  }
    render() {
      const date = new Date(`${this.state.fund.dateInitiated}`).toLocaleDateString();
    return (
      <>
      <div class="jumbotron p-4 p-md-5 text-dark rounded shadow-sm">
          
      <div class="container">
              <div class="row justify-content-start stripped">
                <div class="col-4">
                  Fund Amount: 
                </div>
                <div class="col-4">
                  {this.state.fund.amount}
                </div>
              </div>
              <div class="row justify-content-start stripped">
                <div class="col-4">
                  Fund Status:
                </div>
                <div class="col-4">
                  {this.state.fund.status}
                </div>
              </div>
              <div class="row justify-content-start stripped">
                <div class="col-4">
                  Date Initiated:
                </div>
                <div class="col-4">
                  {date};
                </div>
              </div>
              <div class="row justify-content-start stripped">
                <div class="col-6">
                  Add Payment Details
                </div>
                <div class="col-4">
                  <input type="text" placeholder="Enter bank teller details" />
                </div>
                <div class="col-2">
                  <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                </div>
              </div>
            </div>
            </div>
      </>
    );
  }
}
export default FundDetails;
