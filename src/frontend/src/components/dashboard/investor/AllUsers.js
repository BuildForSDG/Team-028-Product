import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

class AllUsers extends React.Component {
  render() {
    return (
      <>
        <div className="invest-Title">
        <div class="table-responsive">
          <table class="table">
          <table class="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Firt Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Phone No(s)</th>
                    <th scope="col">Department</th>
                    <th scope="col">Supervisor</th>
                    <th scope="col">Role</th>
                    <th scope="col">Date</th>
                    <th scope="col">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark Otto</td>
                    <td>Otto</td>
                    <td>080350000</td>
                    <td>Teller</td>
                    <td>Mr. Matthew Oji</td>
                    <td>Adviser</td>
                    <td>09-05-2020</td>
                    <th scope="col"><button type="button" class="btn-allUsers" data-toggle="modal" data-target="#exampleModal">
                      Edit
                    </button></th>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob Ahare</td>
                    <td>Ahare</td>
                    <td>0607000404, 0805586866</td>
                    <td>Customer Service</td>
                    <td>Ajaba Lawrence</td>
                    <td>Accountant</td>
                    <td>28-05-2020</td>
                    <th scope="col"><button type="button" class="btn-allUsers" data-toggle="modal" data-target="#exampleModal">
                      Edit
                    </button></th>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry Okota</td>
                    <td>Okota</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                    <th scope="col"><button type="button" class="btn-allUsers" data-toggle="modal" data-target="#exampleModal">
                      Edit
                    </button></th>
                    
                  </tr>
                </tbody>
              </table>
          </table>
        </div>
        </div>
      </>
    );
  }
}
export default AllUsers;