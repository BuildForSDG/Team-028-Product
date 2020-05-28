import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router";
import "../../styles/modal.css";

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        redirect: null
    };
    this.handleAbout = this.handleAbout.bind(this);
    this.closeAbout = this.closeAbout.bind(this);
  }

  handleAbout() {
    this.setState({ about: true });
  }

  closeAbout() {
    this.props.closeModal();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <>
        {/*** About Modal */}
        <Modal
          size="md"
          show={this.props.showModal}
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
                We believe Small and Medium Size Businessess aren't getting the finance they need to start and grow thier business. 
                this is why we strive  to review your organizations financial history so as to provide you the excellent service you
                deserve, this service enable you access funds recieved from the Government and internation bodies.
              </p>
              <hr/>
              <h1>WHY eazSME?</h1>
              <p>
                SMEs are crucial contributor to industry in emerging markets contributing up to 60% of total employment. However, 200 
                million SMEs lack access to affordable financial services and credit.
              </p>
              <p>
                This, among other factors are why we started eazSME to provide a platform through which SMEs can access investment funds
                from potential investors through a transparent and regulated process
              </p>
              <hr/>
              <h1>MEET OUR TEAM</h1>
              <p>
                We area a skilled team of Business Analyst, Software Developers, Project Managers who identified a gap in financing Small 
                and Medium Enterprises and have decided to bridge the gap. Our mission is to make investment funds accessbile to SMEs and 
                the utilization of the funds monitored and regulated.
              </p>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default About;
