import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
// import { ReactRouter as Router } from 'react-router';

class Nav extends React.Component {
  render() {
    return (
      <ul className="nav nav-pills nav-justified">
        <Router>
          <li className="active">
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about-us">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/testimonies">Testimonies</Link>
          </li>
          <li>
            <Link to="/awards">Awards</Link>
          </li>
        </Router>
      </ul>
    );
  }
}

export default Nav;
