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
import mapStateToLocals from "./stateToLocals";
import axios from "axios";

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
      redirect: null,
      success: "",
      error: ""
    };

    this.showRegistrationModal = this.showRegistrationModal.bind(this);
    this.closeRegistrationModal = this.closeRegistrationModal.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.mapStateToLGA = this.mapStateToLGA.bind(this);
    this.confPassword = React.createRef();
    this.lga = React.createRef();
    this._state = React.createRef();
    this.submitRegistration = this.submitRegistration.bind(this);

    this.showLoginModal = this.showLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.logFormText = React.createRef();

    this.showContactModal = this.showContactModal.bind(this);
    this.closeContactModal = this.closeContactModal.bind(this);

    this.showAboutModal = this.showAboutModal.bind(this);
    this.closeAboutModal = this.closeAboutModal.bind(this);
  }
  componentDidMount() {}

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
    const form = document.querySelector(`form[name="registration"]`);
    const formFields = serialize(form, { hash: true });
    console.log(formFields);
    axios
      .post("http://localhost:4000/register", formFields)
      .then(({ data }) => {
        const { status } = data;
        if (status === "success") {
          this.setState({ success: "User successfully signed up!" });
        } else {
          this.setState({ error: "Error signing up user" });
        }
      })
      .catch((error) => {
        /*console.log(error)*/
        this.setState({ error: "Error signing up user" });
        
      });
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

  async handleLogin(event) {
    event.preventDefault();
    const required = document.querySelectorAll(`input[required]`);
    // Check if all the fields are filled
    required.forEach((element) => {
      if (element.value === "") {
        this.logFormText.current.classList.remove("d-none");
        return;
      }
    });

    const form = document.querySelector(`form[name="login"]`);
    const formFields = serialize(form, { hash: true }); // Make api call with form
    await axios
      .post("http://localhost:4000/login", formFields)
      .then(({ data }) => {
        console.log(data);
        const { status, result } = data;      
       
        if (status === "success") {
          switch (result.category) {
            case "admin":
              this.props.history.push("/admin");
              break;
            case "sme":
              this.props.history.push("/sme");
              break;
            case "investor":
              this.props.history.push("/investor");
              break;
            case "regulator":
              this.props.history.push("/regulator");
              break;
            default:
              window.alert("You must be a ghost");
              break;
          }
        }else{
          /*display invalid credentials*/
          console.log(data);
          this.setState({ error: "Invalid Credentials" });
        }
      })
      .catch((error) => {console.log(error);
        this.setState({ error: "Invalid Credentials" });
      })
      ;
     
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
        <Registration
          showModal={this.state.showReg}
          closeModal={this.closeRegistrationModal}
          lga={this.lga}
          _state={this._state}
          register={this.submitRegistration}
          mapStateToLga={this.mapStateToLGA}
          handleBlur={this.handleBlur}
          handleConfirmPasswordChange={this.handleConfirmPasswordChange}
          handlePasswordChange={this.handlePasswordChange}
          success={this.state.success}
          error={this.state.error}
        />
        <Login
          showModal={this.state.showLog}
          closeModal={this.closeLoginModal}
          login={this.handleLogin}
          current={this.logFormText}
          success={this.state.success}
          error={this.state.error}
        />
        <Contact showModal={this.state.showContact} closeModal={this.closeContactModal} />
        <About showModal={this.state.showAbout} closeModal={this.closeAboutModal} />
      </Container>
    );
  }
}

export default withRouter(Nav);
