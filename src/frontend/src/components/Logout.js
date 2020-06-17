import React from "react";
import { Link } from "react-router-dom";

class Logout extends React.Component {
  componentDidMount() {
    localStorage.removeItem("userObj");
  }
  render() {
    return (
      <div className="text-center">
        <h4>
          You have logout &nbsp;&nbsp;<Link to="/">Click To Login Back</Link>
        </h4>
      </div>
    );
  }
}

export default Logout;
