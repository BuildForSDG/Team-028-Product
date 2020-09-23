import React from "react";
import { Link } from "react-router-dom";

class Logout extends React.Component {
  componentDidMount() {
    localStorage.removeItem("state");

    this.props.history.push("/");

    setTimeout(()=>window.location.reload(), 300);
  }
  render() {
    return (
      <div className="text-center">
        <h4>
          You have logged out &nbsp;&nbsp;<Link to="/">Go back to homepage</Link>
        </h4>
      </div>
    );
  }
}

export default Logout;
