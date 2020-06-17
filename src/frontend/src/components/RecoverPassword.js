/* eslint-disable quotes */
/*eslint quotes: ["error", "backtick"]*/
/*eslint-env es6*/
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import formSerialize from "form-serialize";
import axios from "axios";

class RecoverPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      success: "",
      error: ""
    };
    this.recoverPassword = this.recoverPassword.bind(this);
  }

  async recoverPassword(event) {
    event.preventDefault();
    const email = document.querySelector(`input[type="email"]`).value;
    if(!email) {
        window.alert("email cannot be empty");
        return;
    }
    const form = document.querySelector(`form[name="recover-password"]`);
    const serializeForm = formSerialize(form, { hash: true });
    // Make a post request
    await axios
      .post("https://eazsme-backend.herokuapp.com/recover-password", serializeForm)
      .then(({ data }) => {
        const status  = data.status;
        if (status === "success") {
          this.setState({ success: "Chech Your email for password recovery steps" });
        } else {
          this.setState({ error: "Error creating password recovery steps" });
        }
      })
      .catch((error) => {
        // console.error(error);
        this.setState({ error: "Network related error" });
      });
  }
  render() {
    const success = this.state.success;
    const error = this.state.error;
    return (
      <div>
        <Form name="recover-password" className="recover-password">
          {success ? (
            <h4 className="text-bold text-success">{success}</h4>
          ) : (
            <h4 className="text-bold text-danger">{error}</h4>
          )}

          <h4>Please enter your email address</h4>
          <Form.Group controlId="recoverEmail">
            <Form.Label className="font-weight-bold">
              Email address<sup className="text-danger">*</sup>
            </Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" required />
          </Form.Group>
          <Button type="submit" className="pull-left" onClick={this.recoverPassword}>
            Recover Password
          </Button>
        </Form>
      </div>
    );
  }
}

export default RecoverPassword;
