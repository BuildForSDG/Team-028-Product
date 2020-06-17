/* eslint-disable array-callback-return */

/* eslint-disable no-console */
/* eslint no-console: "error" */

import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

export default class InvestorsAndFunding extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      searchData: "",
      foundData: [],
      valueChange: "",
      success: "",
      error: ""
    };

    this.fetchData = this.fetchData.bind(this);
   this.approveFunds=this.approveFunds.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios
      .get("https://eazsme-backend.herokuapp.com/funds/all")
      .then(({ data }) => {
              const  status  = data.status;
        const projects = data.data;
       
        console.log("p"+data);
        if (status === "success") {
          this.setState({ data: projects });          
        }
      })
      .catch((error) => console.log(error));
  }
  approveFunds() {
    axios
      .put("https://eazsme-backend.herokuapp.com/funds/update")
      .then(({ data }) => {
              const  status  = data.status;
        
        if (status === "success") {
          this.setState({ success: "Investment Approved" });          
        }else{
          this.setState({ error: "Error Approving Investment" }); 
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "Error Approving Investment" });  
      });
  }

  render() {
    const data = this.state.data;
    
    return (
      <Card.Body>
     
        <div className="update" style={{textAlign:"center"}}>
          <h6> Available Investments</h6>
              </div>
        <table class="table table-striped">
                <thead>
            <tr>
            <th>Organization</th>
             <th>Project Name</th>              
              <th>Amount</th>
              <th>Fund Receipt Date</th>
            {/*}  <th>View</th>
              <th>Approve</th>*/}
            </tr>
          </thead>
          <tbody>
            {        
            data.map((item, index, arr) => {
            let count = arr.length;
            console.log(data);
            for(let i=0; i<count-1; i++){
              return (
                <tr>
                  <td key={index}>{item[parseInt(i)].companyName}</td>
                  <td key={index}>{item[parseInt(i)].projectName}</td>
                  <td key={index}>{item[parseInt(i)].amount}</td>
                  <td key={index}>{item[parseInt(i)].dateInitiated}</td>
                  
                   {/*} <td key={count++}>
                      <Link onClick={this.approveFunds} to={`${item[parseInt(i)].projectId}`}>Approve</Link>
              </td>   */}        
                </tr>
              );
            }
            })
            
            }
          </tbody>

        </table>
      </Card.Body>
    );
  }
}
