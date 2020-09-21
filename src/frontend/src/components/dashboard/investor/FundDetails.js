/* eslint-disable no-multi-str */
/* eslint-disable no-console */
/* eslint no-console: "error" */
import React from "react";
import { connect } from "react-redux";

import axios from "axios";
import serialize from "form-serialize";

import { Card, Form, Row, Col, Button } from "react-bootstrap";

import { fetch } from "../../../redux/actionCreators";
import * as Types from "../../../redux/types";
class FundDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      funddetails: {},
      success: "",
      error: ""
    };
    this.handleSubmit =  this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const { fetch } = this.props;

    fetch({
        url:  `/funds/${this.props.match.params.id}`,
        method: "get",
        data: null,
        onSuccess: Types.setFundDetails
      }).then(()=>{
        this.setState({funddetails: this.props.funddetails});
      })

  }

  handleSubmit(e){
    e.preventDefault();
    const form = document.querySelector("form[name='update-payment']");
    const formFields = serialize(form, { hash: true });

    formFields.status = "payment_details_submitted";
    formFields.organizationId = this.props.user.organizationId;
    formFields.fundId = this.props.funddetails.fundId;

    axios
      .post("http://localhost:4000/payments", formFields)
      .then((data) => {
        if (data.data.status === "success") {
          this.setState({ 
            success: "Investment Initiated!",
            error:"",
           });
           setTimeout(() => {
            window.location.reload();
           }, 1000);
        } else {
          this.setState({ error: "Error updating payment details", success: "" });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message, success: "" });
      });

  }
    render() {
      const { funddetails } = this.state;

      let date = "";
      if (funddetails){
        date = new Date(`${funddetails.dateInitiated}`).toLocaleDateString();
      }

      const success = this.state.success;
      const error = this.state.error; 
    return (
      <>
      <div class="jumbotron p-4 p-md-5 text-dark rounded shadow-sm">
          
      <div class="container">
        <div class="row justify-content-start stripped">
          <div class="col-4">
            Fund Amount: 
          </div>
          <div class="col-4">
            {funddetails ? funddetails.amount : 0.00}
          </div>
        </div>
        <div class="row justify-content-start stripped">
          <div class="col-4">
            Fund Status:
          </div>
          <div class="col-4">
            {funddetails.status}
          </div>
        </div>
        <div class="row justify-content-start stripped">
          <div class="col-4">
            Date Initiated:
          </div>
          <div class="col-4">
            {date}
          </div>
        </div>
        <div class="row justify-content-start stripped">
          <div class="col-6">
            Add Payment Details
          </div>
        </div>
        <Card.Body>
        <Row>
          <Col>
            <Form name="update-payment"> 
             <Form.Group controlId="bankName">
                <Form.Label>Bank Name:</Form.Label>
                <Form.Control type="text" name="bankName" placeholder="Enter Bank Name"></Form.Control>
              </Form.Group>
              <Form.Group controlId="accountNumber">
                <Form.Label>Account Number:</Form.Label>
                <Form.Control type="number" name="accountNumber" placeholder="Enter Account Number"></Form.Control>
              </Form.Group>
              <Form.Group controlId="paidBy">
                <Form.Label>Depositor's Name:</Form.Label>
                <Form.Control type="text" name="paidBy" placeholder="Enter Depositor Name"></Form.Control>
              </Form.Group>
              <Form.Group controlId="tellerNo">
                <Form.Label>Transaction ID:</Form.Label>
                <Form.Control type="text" name="tellerNo" placeholder="Teller No or any Transaction ID"></Form.Control>
              </Form.Group>
              <Form.Group controlId="amount">
                <Form.Label>Amount Paid:</Form.Label>
                <Form.Control type="number" placeholder="Amount" name="amount" />
              </Form.Group>
              <Form.Group controlId="paymentDate">
                <Form.Label>Payment Date:</Form.Label>
                <Form.Control type="date" placeholder="Payment Date" name="paymentDate" />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                Submit
              </Button>
              {success ? (
              <div className="text-bold text-success">
                <h5>{success}</h5>
              </div>
            ) : (
              <div className="text-bold text-success">
                <h5>{error}</h5>
              </div>
            )}
            </Form>
          </Col>
        </Row>
      </Card.Body>
      </div>
    </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  funddetails: state.funddetails
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetch: (data) => dispatch(fetch(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FundDetails);
