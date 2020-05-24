/* eslint-disable no-console */
/* eslint-disable quotes */
/*eslint quotes: ["error", "double"]*/
/*eslint-env es6*/
/* eslint no-console: "error" */
import React from "react";
import { Link, BrowserRouter as Router, withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import serialize from "form-serialize";
import "../../styles/modal.css";
import About from "./About";
import Contact from "./Contact";
import Login from "./Login";
import Registration from "./Registration";
import "../../styles/modal.css";
import { Redirect } from "react-router";
import mapStateToLocals from "./stateToLocals";
import getTown from "./localsToTown";
import getTowns from "./localsToTown";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showReg: false,
      showLog: false,
      showContact: false,
      showAbout: false,
      Password: "",
      confirmPassword: "",
      redirect: null
    };

    this.showRegistrationModal = this.showRegistrationModal.bind(this);
    this.closeRegistrationModal = this.closeRegistrationModal.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.mapStateToLGA = this.mapStateToLGA.bind(this);
    this.mapLGAToTown = this.mapLGAToTown.bind(this);
    this.confPassword = React.createRef();
    this.lga = React.createRef();
    this.town = React.createRef();
    this._state = React.createRef();

    this.showLoginModal = this.showLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.logFormText = React.createRef();

    this.showContactModal = this.showContactModal.bind(this);
    this.closeContactModal = this.closeContactModal.bind(this);

    this.showAboutModal = this.showAboutModal.bind(this);
    this.closeAboutModal = this.closeAboutModal.bind(this);
  }
  componentDidMount() {
    if (!localStorage.getItem("email") && !localStorage.getItem("password")) {
      // make api call with email as username and password
    }
  }

  showRegistrationModal(event) {
    event.preventDefault();
    this.setState({ showReg: true });
  }
  closeRegistrationModal() {
    this.setState({ showReg: false });
  }
  handleBlur(event) {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      this.confPassword.current.classList.remove("d-none");
    }
  }
  submitRegistration(event) {
    event.preventDefault();
    /** const elements = document.querySelector(`form[name="registration"]`).elements;
    const requiredFields = {};
    for (let index = 0; index < elements.length; index++) {
      const item = elements.item(index);
      requiredFields[item.name] = item.value;
    } ***/

    const required = document.querySelectorAll(`input[required]`);
    // Check if all the fields are filled
    required.forEach((element) => {
      if (element.value === "") {
        // this.logFormText.current.classList.remove("d-none");
        return;
      }
    });

    const form = document.querySelector(`form[name="registration"]`);
    const formFields = serialize(form, { hash: true }); // Make api call with form
    console.log(formFields);
  }

  mapStateToLGA(event) {
    event.preventDefault();
    const select = this.lga.current;

    // Check if the select has options if it does remove the options
    if (select.options.length > 0) {
      let i,
        L = select.options.length - 1;
      for (i = L; i >= 0; i--) {
        select.remove(i);
      }
    }

    const st = event.target.value;
    const lgas = mapStateToLocals(st);

    for (let index = 0; index < lgas.length; index++) {
      const option = document.createElement("option");
      const element = lgas[parseInt(index)];
      option.setAttribute("name", element);
      option.setAttribute("id", element);
      option.textContent = element;
      select.appendChild(option);
    }
  }

  mapLGAToTown(event) {
    event.preventDefault();
    const select = this.town.current;

    // Check if the select has options if it does remove the options
    if (select.options !== 0) {
      let i,
        L = select.options.length - 1;
      for (i = L; i >= 0; i--) {
        select.remove(i);
      }
    }

    /***const lga = this.lga.current;
    const state = this._state.current;
    const lgaValue = lga.options[lga.selectedIndex].value;
    const stateValue = state.options[state.selectedIndex].value;

    const towns = getTowns(stateValue, lgaValue);

    for (let index = 0; index < towns.length; index++) {
      const option = document.createElement("option");
      const element = towns[index];
      option.setAttribute("name", element);
      option.setAttribute("id", element);
      option.textContent = element;
      select.appendChild(option);
    }***/
  }
  handleConfirmPasswordChange(event) {
    event.preventDefault();
    this.setState({ confirmPassword: event.target.value });
  }
  handlePasswordChange(event) {
    event.preventDefault();
    this.setState({ password: event.target.value });
  }



  showLoginModal(event) {
    event.preventDefault();
    this.setState({ showLog: true });
  }
  closeLoginModal() {
    this.setState({ showLog: false });
  }
  handleLogin(event) {
    event.preventDefault();
    const required = document.querySelectorAll(`input[required]`);
    // Check if all the fields are filled
    required.forEach((element) => {
      if (element.value === "") {
        this.logFormText.current.classList.remove("d-none");
        return;
      }
      console.log("click");
      this.setState({ redirect: "/sme" });
    });

    const form = document.querySelector(`form[name="login"]`);
    const formFields = serialize(form, { hash: true }); // Make api call with form

    localStorage.setItem("email", formFields.emaill);
    localStorage.setItem("password", formFields.password);
  }

  showContactModal(event) {
    event.preventDefault();
    this.setState({ showContact: true });
  }
  closeContactModal() {
    this.setState({ showContact: false });
  }

  showAboutModal(event) {
    event.preventDefault();
    this.setState({ showAbout: true });
  }
  closeAboutModal() {
    this.setState({ showAbout: false });
  }

  

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <Container className="navbar">
        <ul className="nav">
          <Router>
            <li className="nav-item">
              <Link className="nav-link" onClick={this.showRegistrationModal} to="">
                Register
              </Link>
            </li>
            <li>
              <Link className="nav-link" onClick={this.showLoginModal} to="">
                Login
              </Link>
            </li>
            <li>
              <Link to="" onClick={this.showContactModal} className="nav-link">
                Contact
              </Link>
            </li>
            <li>
              <Link onClick={this.showAboutModal} to="" className="nav-link">
                About
              </Link>
            </li>
          </Router>
        </ul>
        {/*** Login Modal */}
        <Modal
          size="md"
          show={this.state.show}
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
            <Form name="login">
              <Form.Text className="text-danger h4 d-none" bsPrefix="form-text" ref={this.logFormText}>
                Fields mark * are required
              </Form.Text>
              <Form.Group controlId="formBasicEmail1">
                <Form.Label className="font-weight-bold">
                  Email address<sup className="text-danger">*</sup>
                </Form.Label>
                <Form.Control type="email" placeholder="Enter email" required name="email" />
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
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Row>
              <Col md="1" className="mr-4">
                <Button type="submit" variant="danger" onClick={this.closeLogin}>
                  Cancel
                </Button>
              </Col>
              <Col md="auto" className="ml-4 font-weight-bold">
                Not a member?&nbsp;
                <Router>
                  <Link to="/signup">Sign Up</Link>
                  &nbsp;&nbsp; Forget &nbsp;
                  <Link to="/recover-password">Password?</Link>
                </Router>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>

           {/*** About Modal */}
          <Modal
          size="lg"
          show={this.state.about}
          onHide={this.closeAbout}
          dialogClassName="modal-90w"
          aria-labelledby="login"
          bsPrefix="modal"
        >
          <Modal.Header closeButton bsPrefix="modal-header">
            <Row>
              <Col className="text-center pr-1">
                <Modal.Title id="login" className="text-light">
                  WE ARE eazSME
                </Modal.Title>
              </Col>
            </Row>
          </Modal.Header>
          <Modal.Body bsPrefix="modal-body">
            <div>
              <p>
               We believe most Small and Medium Size Businesses aren't getting the finance they need to start and grow their
               business. This is why we strive to review your organization's financial history, and provide you with the excellent service
               you deserve to access funds received from Government and International bodies.

              </p>
              <hr></hr>
              <Row>
                <Col>
                <Modal.Title id="login" className="text-light">
                WHY eazSME?
                </Modal.Title>               
                   <p>
                   SMEs are a crucial contributor to industry in emerging markets, 
                   contributing up to 60% of total employment.
                   However, 200 million SMEs lack access to affordable financial services and credit.                                                          
                   </p>                 
                </Col>
                <Col>
                <br/>
                   <p>
                   So we started eazSME to provide a platform through which SMEs can access investment funds
                    from potential investors through a transparent and regulated process.                                    
                   </p>                 
                </Col>               
              </Row>
            </div>
            <hr></hr>
            <div>
            <Modal.Title id="login" className="text-light">
                MEET OUR TEAM
                </Modal.Title>   
              <p>
              We are a skilled team of Business Analyst, Software Developers, Project Managers who identified a gap in financing
              Small and Medium Business Enterprises and have decided to bridge the gap. Our Mission is to make investement funds 
              accessible to SMEs and the utilization of the funds monitored and regulated.
              </p>
              <hr></hr>
              <Row>
                <Col> 
                <figure>
                  <img src={"./Emilia.png"} alt=""/>
                <figcaption>Emilia Anochirionye; Technical Team Lead
                </figcaption>
              </figure>             
                            
                </Col>
                <Col>                   
                <figure>
                  <img src={"./Emilia.png"} alt=""/>
                <figcaption>Emilia Anochirionye; Technical Team Lead
                </figcaption>
              </figure>                       
                </Col>
                <Col>                   
                <figure>
                  <img src={"./Emilia.png"} alt=""/>
                <figcaption>Emilia Anochirionye;
                   Technical Team Lead
                </figcaption>
              </figure>                      
                </Col> 
              
                                         
              </Row>
            </div>
           
          </Modal.Body>
                 
        </Modal>

         {/*** Contact Modal */}
        <Modal
          size="lg"
          show={this.state.contact}
          onHide={this.closeContact}
          dialogClassName="modal-90w"
          aria-labelledby="login"
          bsPrefix="modal"
        >
          <Modal.Header closeButton bsPrefix="modal-header">
            <Row>
              <Col className="text-center pr-1">
                <Modal.Title id="login" className="text-light">
                  Contact us, use the form below.
                </Modal.Title>
              </Col>
            </Row>
          </Modal.Header>
          <Modal.Body bsPrefix="modal-body">
            <form action="" name="contact">
            <Row>
                <Col>
                  <Form.Group controlId="formBasicText1">
                    <Form.Label className="font-weight-bold">
                      Full Name<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter full name" required name="fullName" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicText2">
                    <Form.Label className="font-weight-bold">
                      Email Address<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control type="email" placeholder="Enter mail address" required name="email" />
                  </Form.Group>
                </Col>
              </Row>

              <Col lg="12">
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label className="font-weight-bold">
                      Message<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control as="textarea" rows="7" cols="" required name="address" />
                  </Form.Group>
                </Col>

                <Button variant="success" type="submit" className="btn-block" onClick={this.submitContact}>
                Submit
              </Button>
            </form>
            
          </Modal.Body>
        </Modal>


        {/** Registration Modal */}
        <Modal
          size="xl"
          show={this.state.regShow}
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
            <Form name="registration">
              <Form.Text className="text-danger h4 d-none" bsPrefix="form-text">
                Fields mark * are required
              </Form.Text>

              <Row>
                <Col>
                  <Form.Group controlId="formBasicText1">
                    <Form.Label className="font-weight-bold">
                      First Name<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" required name="firstName" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicText2">
                    <Form.Label className="font-weight-bold">
                      Last Name<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" required name="lastName" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="formBasicText3">
                    <Form.Label className="font-weight-bold">Other Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter other name" name="otherName" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicSelect">
                    <Form.Label className="font-weight-bold">
                      Select Type<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control as="select" required name="type">
                      <option value="sme">SME</option>
                      <option value="investor">Investor</option>
                      <option value="regulator">Regulator</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="formBasicText4">
                    <Form.Label className="font-weight-bold">
                      Name Of Organization<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter Name of Organization" required name="orgName" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicEmail2">
                    <Form.Label className="font-weight-bold">
                      Email address<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required name="email" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="formBasicPassword2">
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
                      onChange={this.handlePasswordChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicPassword3">
                    <Form.Label className="font-weight-bold">Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm password"
                      name="confirmPassword"
                      onChange={this.handleConfirmPasswordChange}
                      onBlur={this.handleBlur}
                    />
                    <Form.Text
                      className="text-danger font-weight-bold d-none h5"
                      bsPrefix="form-text"
                      ref={this.confPassword}
                    >
                      Password doesnt match
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="formBasicCAC">
                    <Form.Label className="font-weight-bold">
                      CAC Number<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter CAC Number" name="cac" required />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="formBasicPhoneNum">
                    <Form.Label className="font-weight-bold">
                      Phone Number<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter Phone Number" name="phoneNumber" required />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Text className="font-weight-bold h4 text-light">Business Address</Form.Text>
                </Col>
              </Row>

              <Row>
                <Col md="6">
                  <Form.Group controlId="formBasicSelect2">
                    <Form.Label className="font-weight-bold">
                      Select State<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control as="select" required ref={this._state} onChange={this.mapStateToLGA} name="state">
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

                <Col md="3">
                  <Form.Group controlId="formBasicSelect3">
                    <Form.Label className="font-weight-bold">
                      LGA<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      required
                      ref={this.lga}
                      onChange={this.mapLGAToTown}
                      name="lga"
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col md="3">
                  <Form.Group controlId="formBasicSelect4">
                    <Form.Label className="font-weight-bold">
                      Town/Village<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      required
                      ref={this.town}
                      onChange={this.mapLGAToTown}
                      name="town"
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="formBasicPostal">
                    <Form.Label className="font-weight-bold">Postal Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter Phone Number" name="phoneNumber" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicLandmark">
                    <Form.Label className="font-weight-bold">Nearest Landmark</Form.Label>
                    <Form.Control type="text" placeholder="Enter Phone Number" name="landmark" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md="6">
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label className="font-weight-bold">
                      Address<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control as="textarea" rows="7" cols="" required name="address" />
                  </Form.Group>
                </Col>

                <Col md="auto">
                  <Form.Group controlId="exampleForm.Date">
                    <Form.Label className="font-weight-bold">
                      Date Registered<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control type="date" required name="dateRegistered" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md="auto">{/**Implemet terms and conditon later */}</Col>
                <Col>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Agreed to terms and condition?"
                      className="font-weight-bold"
                      name="termsOfCondition"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Button variant="success" type="submit" className="btn-block" onClick={this.submitRegistration}>
                    Register
                  </Button>
                </Col>
                <Col>
                  <Button type="submit" variant="danger" onClick={this.closeRegistration} className="btn-block">
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    );
  }
}

export default withRouter(Nav);
