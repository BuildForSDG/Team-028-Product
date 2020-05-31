import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

class TotalInvestments extends React.Component {
  render() {
    return (
      <>
        <div className="invest-Title">
          See how much you've invested
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">SMEs</th>
              <th scope="col">Date</th>
              <th scope="col">Amount(#)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Tubers Ventures</td>
              <td>20-03-2020</td>
              <td>2,000,000</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Mobility Enterprises</td>
              <td>02-05-20202</td>
              <td>60,000,000</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Zee Nig. Limited</td>
              <td>29-05-2020</td>
              <td>500,000</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th scope="col">Total</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col">62,500,000</th>
            </tr>
          </thead>
        </table>
      </>
    );
  }
}
export default TotalInvestments;