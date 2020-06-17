/* eslint-disable no-multi-str */
/* eslint-disable no-console */
/* eslint no-console: "error" */
import React from "react";
import { Upload, message} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import reqwest from "reqwest";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import axios from "axios";
import serialize from "form-serialize";
import Button from "react-bootstrap/Button";


class FundDetails extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      fund: {},
      success: "",
      error: ""
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleSubmit =  this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }
  async fetchData() {
    const url = `https://eazsme-backend.herokuapp.com/funds/${this.props.match.params.id}`;
    
    const data = await axios.get(url);

    const fund = data.data.data;

    this.setState({fund});
  }

  handleSubmit(e){
    e.preventDefault();
    const form = document.querySelector("form[name='update-payment']");
    const formFields = serialize(form, { hash: true });
    
    formFields.status = "payment_details_submitted";
    formFields.organizationId = this.props.user.organizationId;
    formFields.fundId = this.state.fund.fundId;

    axios
      .post("https://eazsme-backend.herokuapp.com/payments", formFields)
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
      const date = new Date(`${this.state.fund.dateInitiated}`).toLocaleDateString();
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
            {this.state.fund.amount}
          </div>
        </div>
        <div class="row justify-content-start stripped">
          <div class="col-4">
            Fund Status:
          </div>
          <div class="col-4">
            {this.state.fund.status}
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
export default FundDetails;
