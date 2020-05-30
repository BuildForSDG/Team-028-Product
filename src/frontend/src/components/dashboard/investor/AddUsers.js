import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

const dateFormat = "YYYY/MM/DD";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

class Addusers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.name === "isGoing" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {  
    return (
      <form>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputEmail4">First Name</label>
            <input type="text" class="form-control" id="inputFirstName" />
          </div>
          <div class="form-group col-md-6">
            <label for="InputName">Last Name</label>
            <input type="text" class="form-control" id="inputName" />
          </div>
        </div>
        <div class="form-group">
          <label for="inputAddress">Email Address</label>
          <input type="email" class="form-control" id="inputEmail"  />
        </div>
        <div class="form-group">
          <label for="inputAddress">Address</label>
          <input type="text" class="form-control" id="inputAddress"  />
        </div>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="inputPhone">Phone</label>
            <input type="phone" class="form-control" id="inputPhone" />
          </div>
          <div class="form-group col-md-4">
            <label for="inputPhone2">Phone Number 2</label>
            <input type="phone" class="form-control" id="inputPhone2" />
          </div>
          <div class="form-group col-md-4">
            <label for="inputState">Assign Team</label>
            <select id="inputState" class="form-control">
              <option selected>Choose...</option>
              <option>Team 1</option>
              <option>Team 2</option>
              <option>Team 3</option>
              <option>Team 4</option>
              <option>Team5</option>
            </select>
          </div>
        </div>
        <div class="form-row">
        <div class="form-group col-md-6">
            <label for="inputState">Assign Supervisor</label>
            <select id="inputState" class="form-control">
              <option selected>Choose...</option>
              <option>Mr. John Rock</option>
              <option>Dr. Iket Ubong</option>
              <option>James Brown</option>
              <option>Mrs Mary Adewale</option>
              <option>Miss Angela Obi</option>
            </select>
          </div>
          <div class="form-group col-md-2">
            <label for="inputDate">Date</label><br></br>
            <DatePicker defaultValue={moment("2015/01/01", dateFormat)} format={dateFormat} />
          </div>
          <div class="form-group col-md-4">
            <label for="inputState">Assign Role</label>
            <select id="inputState" class="form-control">
              <option selected>Choose...</option>
              <option>Accountant</option>
              <option>Adviser</option>
              <option>Field Agent</option>
              <option>Manager</option>
              <option>Supervisor</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck" />
            <label class="form-check-label" for="gridCheck">
              Confirm adding this User
            </label>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Add User</button>
      </form>
    );
  }
}

export default Addusers;