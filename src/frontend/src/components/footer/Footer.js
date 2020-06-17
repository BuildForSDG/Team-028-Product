/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";


class Footer extends React.Component {
  render() {
    return (

      <footer class="pt-4 my-md-5 pt-md-5 border-top">
          <div class="row footer">
            <div class="col-12 col-md">
            <a href="#" className="dashboard-img" to="#">
              <img
                src={
                  "https://res.cloudinary.com/lordefid/image/upload/c_scale,h_50/v1590937828/Group_160_2x_wad30b.png"
                }
                alt="logo"
              />
            </a><br></br>
              <small class="-block mb-3 text-muted">&copy; 2020</small>
            </div>
            <div class="col-6 col-md">
              <h5>Features</h5>
              <ul class="list-unstyled text-small">
              <li><a class="text-muted" href="#">FAQ</a></li>
              <li><a class="text-muted" href="#">Testimonials</a></li>
                <li><a class="text-muted" href="#">Careers</a></li>
                <li><a class="text-muted" href="#">Financial News</a></li>
                <li><a class="text-muted" href="#">Financial Education</a></li>
                <li><a class="text-muted" href="#">Additional Features</a></li>
              </ul>
            </div>
            <div class="col-6 col-md">
              <h5>Resources</h5>
              <ul class="list-unstyled text-small">
                <li><a class="text-muted" href="#">Sample Proposals</a></li>
                <li><a class="text-muted" href="#">Investors Guide</a></li>
                <li><a class="text-muted" href="#">Regulators Guide</a></li>
                <li><a class="text-muted" href="#">Project Templates</a></li>
              </ul>
            </div>
            <div class="col-6 col-md">
              <h5>About</h5>
              <ul class="list-unstyled text-small">
                <li><a class="text-muted" href="#">Team</a></li>
                <li><a class="text-muted" href="#">Locations</a></li>
                <li><a class="text-muted" href="#">Privacy</a></li>
                <li><a class="text-muted" href="#">Terms</a></li>
              </ul>
            </div>
            <div class="col-6 col-md">
              <h5>Follow Us</h5>
              <ul class="list-unstyled text-small">
                <li><a href="https://www.facebook.com/signup" target="_blank" className="footer-img"><img src="https://res.cloudinary.com/lordefid/image/upload/v1590108539/facebook_dvbkhd.png"/></a></li>

                <li><a href="https://twitter.com/i/flow/signup" target="_blank" className="footer-img"><img src="https://res.cloudinary.com/lordefid/image/upload/v1590108539/twitter_e6e59l.png"/></a></li>

                <li><a href="https://www.linkedin.com/signup" target="_blank" className="footer-img"><img src="https://res.cloudinary.com/lordefid/image/upload/v1590108539/linkedin_b2x3ts.png"/></a></li>
              </ul>
            </div>
          </div>
          </footer>

    );
  }
}

export default Footer;
