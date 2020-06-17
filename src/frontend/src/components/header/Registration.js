/* eslint-disable quotes */
/*eslint quotes: ["error", "double"]*/
/*eslint-env es6*/
/* eslint-disable no-console */
/* eslint no-console: "error" */

import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../../styles/modal.css";

const validEmailRegex = RegExp(
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  
);

class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,

      email: null,
      password: null,
      companyEmail: null,
      confirmPassword: null,
      errors: {
        email: "",
        companyEmail: "",
        password: "",
        confirmPassword: ""
      }
    };

    this.closeRegistration = this.closeRegistration.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this);
    this.mapStateToLGA = this.mapStateToLGA.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      // case 'fullName':
      //   errors.fullName =
      //     value.length < 5
      //       ? 'Full Name must be at least 5 characters long!'
      //       : '';
      //   break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "companyEmail":
        errors.companyEmail = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password = value.length < 8 ? "Password must be at least 8 characters long!" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleConfirmPassword = (e) => {
    //const { name, value } = e.target;
    let errors = this.state.errors;

    if (e.target.value !== this.state.password) {
      errors.confirmPassword = "Password not matched";
    } else {
      errors.confirmPassword = "";
    }
    //this.setState({ errors, [name]: value });
    this.setState({ confirmPassword: e.target.value });
  };
  closeRegistration() {
    this.props.closeModal();
  }

  submitRegistration(event) {
    this.props.register(event);
  }

  mapStateToLGA(event) {
    this.props.mapStateToLga(event);
  }

  handleBlur(event) {
    this.props.handleBlur(event);
  }

  handleConfirmPasswordChange(event) {
    this.props.handleConfirmPasswordChange(event);
  }

  handlePasswordChange(event) {
    this.props.handlePasswordChange(event);
  }

  render() {
    const success = this.props.success;
    const error = this.props.error;
    const { errors } = this.state;
    return (
      <>
        {/** Registration Modal */}
        <Modal
          size="xl"
          show={this.props.showModal}
          onHide={this.closeRegistration}
          dialogClassName="modal-90w"
          aria-labelledby="registration"
          bsPrefix="modal"
        >
          <Modal.Header closeButton bsPrefix="modal-header">
            <Modal.Title id="registration" className="text-light">
              Registration
            </Modal.Title>
          </Modal.Header>
          <Modal.Body bsPrefix="modal-body">
            {success ? (
              <div className="text-bold text-success text-center">
                <h5>{success}</h5>
              </div>
            ) : (
              <div className="text-bold text-danger text-center">
                <h5>{error}</h5>
              </div>
            )}

            <Form name="registration">
              <Form.Text className="text-danger h4 d-none" bsPrefix="form-text">
                Fields mark * are required
              </Form.Text>
              <h5 className="form-section-text">Bio-Data</h5>
              <hr></hr>
              <Row>
                <Col>
                  <Form.Group controlId="firstName">
                    <Form.Label className="font-weight-bold">
                      First Name<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" required name="firstName" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="lastName">
                    <Form.Label className="font-weight-bold">
                      Last Name<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" required name="lastName" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="otherName">
                    <Form.Label className="font-weight-bold">Other Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter other name" name="otherName" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="phoneNumber">
                    <Form.Label className="font-weight-bold">
                      Phone Number <sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter phone number" required name="phoneNumber1" />

                    {/* <Form.Label className="font-weight-bold">
                      Position Held<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control as="select" required name="type">
                      <option value="sme">Select Position</option>
                      <option value="sme">Director</option>
                      <option value="investor">Deputy Director</option>
                      <option value="regulator">Manager</option>
                      <option value="regulator">Supervisor</option>
                      <option value="regulator">Junior Staff</option>
                    </Form.Control> */}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="email">
                    <Form.Label className="font-weight-bold">
                      Email<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      onChange={this.handleChange}
                      noValidate
                    />
                    {errors.email.length > 0 && <span className="text-danger">{errors.email}</span>}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="address1">
                    <Form.Label className="font-weight-bold">
                      Address<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="2"
                      cols="2"
                      required
                      name="address"
                      maxLength="200"
                      placeholder="Address text here..."
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="state">
                    <Form.Label className="font-weight-bold">
                      Select State<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      required
                      ref={this.props._state}
                      onChange={this.mapStateToLGA}
                      name="state"
                    >
                      <option>::Select</option>
                      <option value="Abia">Abia</option>
                      <option value="Abuja">Abuja</option>
                      <option value="Adamawa">Adamawa</option>
                      <option value="Akwa Ibom">Akwa Ibom</option>
                      <option value="Anambra">Anambra</option>
                      <option value="Bauchi">Bauchi</option>
                      <option value="Bayelsa">Bayelsa</option>
                      <option value="Benue">Benue</option>
                      <option value="Borno">Borno</option>
                      <option value="Cross River">Cross River</option>
                      <option value="Delta">Delta</option>
                      <option value="Ebonyi">Ebonyi</option>
                      <option value="Enugu">Enugu</option>
                      <option value="Edo">Edo</option>
                      <option value="Ekiti">Ekiti</option>
                      <option value="Gombe">Gombe</option>
                      <option value="Imo">Imo</option>
                      <option value="Jigawa">Jigawa</option>
                      <option value="Kaduna">Kaduna</option>
                      <option value="Kano">Kano</option>
                      <option value="Katsina">Katsina</option>
                      <option value="Kebbi">Kebbi</option>
                      <option value="Kogi">Kogi</option>
                      <option value="Kebbi">Kebbi</option>
                      <option value="Lagos">Lagos</option>
                      <option value="Nasarawa">Nasarawa</option>
                      <option value="Niger">Niger</option>
                      <option value="Ogun">Ogun</option>
                      <option value="Ondo">Ondo</option>
                      <option value="Osun">Osun</option>
                      <option value="Oyo">Oyo</option>
                      <option value="Plateau">Plateau</option>
                      <option value="Rivers">Rivers</option>
                      <option value="Taraba">Taraba</option>
                      <option value="Yobe">Yobe</option>
                      <option value="Zamfara">Zamfara</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group controlId="formBasicSelect3">
                    <Form.Label className="font-weight-bold">
                      LGA<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      required
                      ref={this.props.lga}
                      onChange={this.mapLGAToTown}
                      name="lga"
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <hr></hr>
              <h5 className="form-section-text">Organization Details</h5>
              <hr></hr>
              <Row>
                <Col>
                  <Form.Group controlId="companyName">
                    <Form.Label className="font-weight-bold">
                      Comapany Name<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter name of company" required name="companyName" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicCAC">
                    <Form.Label className="font-weight-bold">
                      BVN Number<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Bank verification number" name="bvn" required />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Form.Group controlId="userCat">
                    <Form.Label className="font-weight-bold">
                      User Category<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control as="select" required name="userType">
                      <option>::select</option>
                      <option value="investor">Investor</option>
                      <option value="regulator">Regulator</option>
                      <option value="sme">SMEs</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group controlId="formBasicText2">
                    <Form.Label className="font-weight-bold">
                      RC Number<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter RCC Number" required name="rccNumber" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="formBasicEmail2">
                    <Form.Label className="font-weight-bold">
                      Company Email<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="companyEmail"
                      onChange={this.handleChange}
                    />
                    {errors.companyEmail.length > 0 && <span className="text-danger">{errors.companyEmail}</span>}
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="companyPhone">
                    <Form.Label className="font-weight-bold">
                      Company Phone<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter Phone Number" name="companyPhone" required />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label className="font-weight-bold ">
                      Company Address<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      cols=""
                      required
                      name="companyAddress"
                      maxLength="200"
                      placeholder="Company Address..."
                    />
                  </Form.Group>
                </Col>
              </Row>

              <hr></hr>

              <h5 className="form-section-text">Create Password</h5>
              <hr></hr>
              <Row>
                <Col>
                  <Form.Group controlId="password1">
                    <Form.Text className="text-warning font-weight-bold">
                      Password including numbers, special characters is advised
                    </Form.Text>
                    <Form.Label className="font-weight-bold">
                      Password<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      // onChange={this.handlePasswordChange}
                      // required
                      onChange={this.handleChange}
                      noValidate
                    />
                    {errors.password.length > 0 && <span className="text-danger">{errors.password}</span>}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="password2">
                    <Form.Text className="text-warning font-weight-bold">
                      Password including numbers, special characters is advised
                    </Form.Text>
                    <Form.Label className="font-weight-bold">
                      Confirm Password<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      onChange={this.handleConfirmPassword}
                      noValidate
                    />
                    {errors.confirmPassword.length > 0 && <span className="text-danger">{errors.confirmPassword}</span>}
                  </Form.Group>
                </Col>
              </Row>
              <br></br>

              {/**Implemet terms and conditon later */}
              <Form.Check
                type="checkbox"
                label="Agreed to terms and conditions?"
                className="font-weight-bold terms-text"
                name="termsOfCondition"
              />
              <br></br>

              <Button variant="success" type="submit" className="btn-block" onClick={this.submitRegistration}>
                Register
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Registration;
