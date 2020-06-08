/* eslint-disable no-console */
/* eslint no-console: "error" */

import React from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";

class Delete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      success: "",
      error: ""
    };

    this.deactivate = this.deactivate.bind(this);
  }

  componentDidMount() {
    this.deactivate();
  }

  async deactivate() {
    const milestoneId = this.props.match.milestoneId;

    await axios.delete("http://localhost:4000/milestone/" + milestoneId).then(({ data }) => {
      const  status  = data.status;
      if (status === "success") {
        this.setState({ success: "User successfully deactivated!" });
      } else {
        this.setState({ error: "Error deactivatiing user" });
      }
    });
  }

  render() {
    const success = this.state.success;
    const error = this.state.error;
    return (
      <Card.Body>
        {success ? (
          <div className="text-bold text-success">
            <h5>{success}</h5>
          </div>
        ) : (
          <div className="text-bold text-success">
            <h5>{error}</h5>
          </div>
        )}
      </Card.Body>
    );
  }
}
export default Delete;
