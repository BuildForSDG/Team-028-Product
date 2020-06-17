import React from "react";
import Container from "react-bootstrap/Container";

class Content extends React.Component {
  render() {
    return (
      <Container>
          <div className="album py-5 bg-light">
          <div className="container">
            <h3>Our Achievements</h3><br></br>
            <div className="row">
              <div className="col-md-4">
                <div className="card mb-4 shadow-sm contents">
                  <div className="card-body">
                    <p className="card-text"><strong>2020 Award Winning Site</strong>  for
                      Credibility and Transparency, presented by the honourable 
                    Minister of Information and Technology...</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        {/* <button type="button" class="btn btn-sm btn-outline-secondary">View</button> */}
                      </div>
                      <small className="text-muted" id="muted-text">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4 shadow-sm content">
                  <div className="card-body">
                    <p className="card-text"><strong>We have reached our 100th Recipient</strong> of Investment Funds
                    and <strong>99.9%</strong> monitored and completed projects. We are still counting..</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        {/* <button type="button" class="btn btn-sm btn-outline-secondary">View</button> */}
                      </div>
                      <small className="text-muted" id="muted-text">12 hrs ago</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4 shadow-sm contents">
                  <div className="card-body">
                    <p className="card-text">
                   <strong>From the East to the West, North and South</strong>  we
                       bridge the gap between Small and Medium Size
                      Enterprises and Investors...
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        {/* <button type="button" class="btn btn-sm btn-outline-secondary">View</button> */}
                      </div>
                      <small className="text-muted" id="muted-text">9 days ago</small>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
            <hr className="content-separator"></hr>
          </div>
          <div className="container sp-container">
            <div className="sponsors-text">Our Sponsors</div>
            <ul className="sponsors">
              <li className="sp-links"><a href="https://www.facebook.com" target="_blank"><img
                      src="https://res.cloudinary.com/lordefid/image/upload/c_scale,h_30/v1589732622/Group_157_rzbgqx.png"
                      alt="facebook-logo"
                      /></a></li>

              <li className="sp-links"><a href="https://andela.com" target="_blank"><img
                      src="https://res.cloudinary.com/lordefid/image/upload/c_scale,h_30/v1589732608/Andella_gmanxz.png"
                      alt="andela-logo"
                    /></a></li>
              <li className="sp-links"><a href="https://www.firstbanknigeria.com" target="_blank"><img
                        src="https://res.cloudinary.com/lordefid/image/upload/c_scale,h_30/v1589732623/FirstBank_Logo_coyuui.jpg"
                        alt="firstbank-logo"
                      /></a></li>
              <li className="sp-links"><a href="https://www.unionbankng.com" target="_blank"><img
                        src="https://res.cloudinary.com/lordefid/image/upload/c_scale,h_30/v1592007281/Union-Bank-Of-Nigeria_xbrbn7.jpg"
                      /></a></li>
            </ul>
          </div>
        </Container>
      
    );
  }
}

export default Content;
