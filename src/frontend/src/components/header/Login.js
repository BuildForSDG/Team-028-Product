
import React from "react";
import { Modal, Form, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      success: "",
      error: ""
    };
    this.closeLogin = this.closeLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  handleLogin() {
    this.setState({ show: true });
  }

  closeLogin() {
    this.props.closeModal();
  }

  submitLogin(event) {
    this.props.login(event);
  }

  render() {
    const { status, message } = this.props;
    return (
      <>
        {/*** Login Modal */}
        <Modal
          size="md"
          show={this.props.showModal}
          onHide={this.closeLogin}
          dialogClassName="modal-90w"
          aria-labelledby="login"
          bsPrefix="modal"
        >
          <Modal.Header closeButton bsPrefix="modal-header">
            <Row>
              <Col className="text-center pr-1">
                <Modal.Title id="login" className="text-light">
                  Login
                </Modal.Title>
              </Col>
            </Row>
          </Modal.Header>
          <Modal.Body bsPrefix="modal-body">
            {status === "success" ? (
              <div className="text-bold text-success text-center">
                <h5>{message}</h5>
              </div>
            ) : (
              <div className="text-center">
                <h5 className="text-danger">Login Failed</h5>
              </div>
            )}
            <Form name="login">
              <Form.Text className="text-danger h4 d-none" bsPrefix="form-text" ref={this.props.current}>
                Fields mark * are required
              </Form.Text>
              <Form.Group controlId="formBasicEmail1">
                <Form.Label className="font-weight-bold">
                  Email address<sup className="text-danger">*</sup>
                </Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" required />
              </Form.Group>

              <Form.Group controlId="formBasicPassword1">
                <Form.Label className="font-weight-bold">
                  Password<sup className="text-danger">*</sup>
                </Form.Label>
                <Form.Control type="password" placeholder="Password" required name="password" />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Remember Me!"
                  defaultChecked="checked"
                  className="font-weight-bold"
                  name="rememberMe"
                  ref={this.rememberMe}
                />
              </Form.Group>
              <Button variant="success" type="submit" className="btn-block" onClick={this.submitLogin}>
                Login
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Row>
              <Col md="auto" className="ml-4 font-weight-bold">
                Not a member?&nbsp;
                <Link to="/">Sign Up</Link>
                &nbsp;&nbsp; Forget&nbsp;
                <Link to="/recover-password">Password?</Link>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Login;
