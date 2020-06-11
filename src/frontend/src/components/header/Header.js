/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/heading-has-content */
import React from "react";
import Nav from "./Nav";
import app from "../../App";
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
    
  }

  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark fixed-top navbar1">
            <Link className="navbar-brand" to="#">
              <img src={"https://res.cloudinary.com/lordefid/image/upload/c_scale,h_50/v1590937828/Group_160_2x_wad30b.png"} alt="logo" />
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
                  <Link className="nav-link disabled" to="#" tabIndex="-1" aria-disabled="true"></Link>
                </li>
              </ul>
              <div className="mt-2 mt-md-0 navi-links">
                <Nav />
              </div>
            </div>
          </nav>
        </header>
      </div>
      
    );
  }
}

export default Header;
