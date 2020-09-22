/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-multi-str */
/* eslint-disable no-console */
/* eslint no-console: "error" */
import React from "react";

import { Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetch } from "../../../../redux/actionCreators";
import * as Types from "../../../../redux/types";

class ProfileDetails extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      
      details: {
        firstName: "",
        lastName: "",
        otherName: "",
        email: "",
        phoneNumber:"",
        companyName: "",
        RCNumber: "",
        dateIncorporated: "",
        coyEmail: "",
        BVN: "",
        Address:""
      }
    };

    this.fetchData = this.fetchData.bind(this);
  }



  componentDidMount() {

    this.fetchData();
  }
  fetchData() {
    
    const { email } = this.props.user;
    const { dispatch } = this.props;

    const fetchProfileDetails = fetch({
      url:  `/userdetails?email=${email}`,
      method: "get",
      data: {email},
      onSuccess: Types.updateUserProfile
    });
    dispatch(fetchProfileDetails).then(()=>{
      this.setState({ details: this.props.details[0] });
    });
  }
    render() {
    return (
      <>
      <div class="jumbotron p-4 p-md-5 text-dark rounded shadow-sm">
          <Row>
            <Col md="3" className="">
            <div class="text-center">
            <img src="https://res.cloudinary.com/lordefid/image/upload/c_scale,h_100/v1591025399/images_j7kyno.png" class="rounded" alt="..." fluid />
          </div>
            </Col>
            <Col>
            <div>
            </div>
            <div className="profile-title-text"> <strong >Admin Details</strong></div>
            <div class="form-row" controlId="userFirstName">
                    <div class="form-group col-md-4">
                      <label for="inputEmail4">First Name: </label>
                      <div class="col-4">{this.state.details.firstName}</div>
                     </div>
                    <div class="form-group col-md-4">
                      <label for="inputEmail4">Last Name: </label>
                      <div class="col-4">{this.state.details.lastName}</div>
                    </div>
                    <div class="form-group col-md-4 ">
                      <label for="inputEmail4">Other Name: </label>
                      <div class="col-4">{this.state.details.otherName}</div>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="inputEmail4">Reg. Date: </label>
                      <div class="col-4">{this.state.details.dateIncorporated}</div>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="inputEmail4">Phone No: </label>
                      <div class="col-4">{this.state.details.phoneNumber}</div>
                    </div>
                    <div class="form-group col-md-4 ">
                      <label for="inputEmail4">Email:   </label>
                      <div class="col-4">{this.state.details.email}</div>
                    </div>
                  </div>
                  <Row>
                    <Col md="12">
                      <div class="text-right">
                     
                            <Link to="/investor/EditProfile"> Edit Profile</Link>
                       
                      </div>
                    </Col>
                  </Row>
            </Col>
          </Row>
        </div>

        <div class="row mb-2">
          <div class="col-md-6">
            <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
                <strong class="d-inline-block mb-2 profile-title-text">More Info</strong>
                <Col>
                <div class="form-row" controlId="companyName">
                        <div class="form-group col-md-12">
                          <label for="inputAddress1">Address: </label>
                          <div class="col-4">{this.state.details.Address}</div>
                        </div>
                       
                      
                    </div>
                  </Col>
                  

                  <strong class="profile-title-text full">Manage Password</strong>
                  <Row>
                        <div class="form-group col-md-4">
                          <label for="inputEmail4">Old Password: </label>
                            <input type="text" class="" data="" id="inputCompanyPhone" class="form-control" value="" disabled />
                        </div>
                        <div class="form-group col-md-4">
                          <label for="inputEmail4">New Password: </label>
                            <input type="text" class="" data="" id="inputCompanyPhone" class="form-control" value="" disabled />
                        </div>
                        <div class="form-group col-md-4">
                          <label for="inputEmail4">Confirm Password: </label>
                            <input type="text" class="" data="" id="inputCompanyPhone" class="form-control" value="" disabled />
                        </div>
                      
                        {/* <div class="form-group col-md-6">
                          <Form.Check
                            type="checkbox"
                            label="Confirm Change?"
                            className="font-weight-bold terms-text"
                            name="termsOfCondition"/><br></br>
                        </div> */}
                        {/* <div class="form-group col-md-6 text-center">
                        <Button variant="success" type="submit" className="btn-block" onClick={this.upadtePassword}>
                          Update
                        </Button>
                        </div> */}
                    </Row>
                  </div>

            </div>
          </div>
          <div class="col-md-6">
            <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div class="col p-4 d-flex flex-column position-static">
                <strong class="d-inline-block mb-2 profile-title-text">Investor Details</strong>
              <Col>
            <div class="form-row" controlId="companyName">
                    <div class="form-group col-md-12">
                      <label for="inputEmail4">Company Name: </label>
                      <div class="col-4">{this.state.details.companyName}</div>
                    </div>
                    
                    <div class="form-group col-md-4">
                      <label for="inputEmail4">Incorporation Date: </label>
                      <div class="col-4">{this.state.details.dateIncorporated}</div>
                    </div>
                    
                    <div class="form-group col-md-4">
                      <label for="inputEmail4">Email Address:   </label>
                      <div class="col-4">{this.state.details.coyEmail}</div>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="inputEmail4">Company Phone: </label>
                      <div class="col-4">{this.state.details.coyEmail}</div>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="inputEmail4">RCC No: </label>
                      <div class="col-4">{this.state.details.RCNumber}</div>
                    </div>
                   
                    <div class="form-group col-md-4">
                      <label for="inputEmail4">Company BVN: </label>
                      <div class="col-4">{this.state.details.BVN}</div>
                    </div>
                    <div class="form-group col-md-12">
                      <label for="inputEmail4">Company Address: </label>
                      <div class="col-4">{this.state.details.address}</div>
                        <br></br>
                        <br></br>
                    </div>
                  </div>
                </Col>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state)=>{
  return {
    details: state.user.profile
  }
}
export default connect(mapStateToProps)(ProfileDetails);
