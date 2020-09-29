
import React from "react";
import { Link, BrowserRouter as Router, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import serialize from "form-serialize";


import About from "./About";
import Contact from "./Contact";
import Login from "./Login";
import Registration from "./Registration";
import "../../styles/modal.css";
import mapStateToLocals from "./stateToLocals";

import "../../styles/modal.css";

import {fetch } from "../../redux/actionCreators";

import * as Types from "../../redux/types";

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

      loginStatus: "",
      loginMessage: "",
      signupStatus: "",
      signupMessage: ""
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
    this.setState({ success: "" });
    this.setState({ error: "" });
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
    const formElements = document.querySelector(`form[name="registration"]`).elements;
    const userData = {};

    for (let i = 0; i < formElements.length; i++) {
      const item = formElements.item(parseInt(i));
      userData[item.name] = item.value;
    }

    const { fetch } = this.props;

    fetch({
      url: "/register",
      method: "post",
      data: formFields,
      onSuccess: ""
    }).then( ()=>{
      const { status, message } =  this.props.request;

      this.setState({signupStatus: status, signupMessage: message});

      if (status === "success") {
        form.reset();
        window.alert("User successfully signed up!");
      }
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
    const userName = document.querySelector(`input[type="email"]`).value;
    const password = document.querySelector(`input[type="password"]`).value;

    if (userName === "admin" && password === "admin") {
      this.props.history.push("/admin");
    } else {
      const form = document.querySelector(`form[name="login"]`);
      const formFields = serialize(form, { hash: true });

      const { fetch } = this.props;

      fetch({
        url: "/login",
        method: "post",
        data: formFields,
        onSuccess: Types.setUser
      }).then( ()=>{
        const { status, message } = this.props.request;

        this.setState({loginStatus: status, loginMessage: message});
        if (status === "success"){
          const { user } =  this.props;

          if (user.category === undefined || user.category === "") return;
          this.props.history.push("/"+ user.category);
        }
      });
    }
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
          status={this.state.signupStatus}
          message={this.state.signupMessage}
        />
        <Login
          showModal={this.state.showLog}
          closeModal={this.closeLoginModal}
          login={this.handleLogin}
          current={this.logFormText}
          status={this.state.loginStatus}
          message={this.state.loginMessage}
        />
        <Contact showModal={this.state.showContact} closeModal={this.closeContactModal} />
        <About showModal={this.state.showAbout} closeModal={this.closeAboutModal} />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    request: state.request
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetch: (data) => dispatch(fetch(data)),
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
