/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/heading-has-content */
import React from "react";
import Nav from "./Nav";
import app from "../../App";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { adminAction } from "../../redux/actionCreators";

class Header extends React.Component {
  async progName() {
    const header = document.querySelector("[data-app-name]");
    if (!header) {
      return;
    }
    const programName = await app();
    header.textContent = programName;
  }

  componentDidMount() {
    this.progName();
    const status = this.props.admin.login;
    status === true ? this.setState({ status: "true" }) : this.setState({ status: "false" });
  }

  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark fixed-top navbar1">
            <Link className="navbar-brand" to="#">
              <img src={"./logo.png"} alt="logo" />
            </Link>
            <button
              className="navbar-toggler mobile-nav"
              type="button"
              data-toggle="collapse"
              data-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="#">
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#"></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link disabled" to="#" tabindex="-1" aria-disabled="true"></Link>
                </li>
              </ul>
              <div class="mt-2 mt-md-0 navi-links">
                <Nav />
              </div>
            </div>
          </nav>
        </header>
      </div>
      // <Container classNameName="header" fluid>
      //   <div classNameName="nav-links">
      //   <Row classNameName="menu">
      //     {/** logo */}
      //     <Col md="auto" id="img" classNameName="mr-4 ml-3">
      //       <Link to="/home">
      //         <img src={"./logo.png"} alt="logo" />
      //       </Link>
      //     </Col>

      //     {/* * App name
      //     <Col md="auto" classNameName=" pt-3 app-name">
      //       <h2 data-app-name></h2>
      //     </Col> */}

      //     {/*** Navigation */}
      //     <Col md="8" classNameName="nav  pt-5 h4" id="navigation">
      //       <Nav />
      //     </Col>

      //     {/** user setting */}
      //     {/* <Col md="1"></Col> */}
      //   </Row>
      //   </div>
      // </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    admin: state.admin
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      logout: (eve) => adminAction(eve)
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
