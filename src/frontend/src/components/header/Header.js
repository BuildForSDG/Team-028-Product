import React from "react";
import Nav from "./Nav";
import app from "../../App";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { adminAction } from "../../redux/actionCreators";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    const item = event.target;
    const { status } = this.state;
    if (status === "true") {
      this.setState({ status: "false" });
      this.props.logout(false);
      item.textContent = "Logout";
    } else {
      this.setState({ status: "true" });
      this.props.logout(true);
      item.textContent = "Login";
    }
  }

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
      <header className="header">
        <div className="row row-no-gutter">
          <div className="col-md-4">{/*** Logo **/}</div>
          <div className="col-md-4">
            <h2 data-app-name></h2>
            <h3>Welcome {this.props.admin.name}</h3>
            <h3>
              Is Login: {this.state.status}{" "}
              <button type="button" onClick={this.logout}>
                Logout
              </button>
            </h3>
          </div>
          <div className="col-md-4">{/** user info **/}</div>
        </div>
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <Nav />
          </div>
        </div>
      </header>
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
