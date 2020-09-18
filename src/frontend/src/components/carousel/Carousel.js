/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";


class Carousel extends React.Component {
  render() {
    return (
        <div className="">
              <div id="myCarousel" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                  <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                  <li data-target="#myCarousel" data-slide-to="1"></li>
                  <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                  <img src="https://res.cloudinary.com/lordefid/image/upload/v1589989860/carousel-3_j2auen.jpg" className="d-block w-100" alt="..."/>
                      {/* <img src="https://res.cloudinary.com/abulkhair/image/upload/v1591031757/carousel1_kguken.webp"className="d-block w-100" alt="..."/> */}
                    <div className="container">
                      <div className="carousel-caption text-left text1">
                        <h1>Financial Leverage.</h1>
                  <p>We are ever ready to give you advice and guidance on acquiring and maximizing   funds to 
                  attain that business growth you have always dreamt about. We are your your instrument to a better financial prospect. 
                  </p>
                  <p><a className="btn btn-lg btn-primary" href="#" role="button">Read more</a></p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
            <img src="https://cdn.pixabay.com/photo/2015/11/01/19/44/money-1017463_1280.jpg" className="d-block w-100" alt="..."/>
                {/* <img src="https://res.cloudinary.com/abulkhair/image/upload/v1591031758/carousel2_slbzfm.webp" className="d-block w-100" alt="..."/> */}
              <div className="container">
                <div className="carousel-caption">
                  <h1>We Build Bridges</h1>
                  <p>eaZSME builds bridges that connects businesses directly with a network of investors providing them with access to fast and flexible growth capital.</p>
                  <p><a className="btn btn-lg btn-primary" href="#" role="button">Learn more</a></p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
            <img src="https://res.cloudinary.com/lordefid/image/upload/v1589989872/carousel-1_e7h7w8.jpg" className="d-block w-100" alt="..."/>
                {/* <img src="https://res.cloudinary.com/abulkhair/image/upload/v1591031758/carousel3_vea5e5.webp" className="d-block w-100" alt="..."/> */}
              <div className="container">
                <div className="carousel-caption text-right">
                  <h1>Community Friendly</h1>
                  <p>We aim at providing a better prospect for people in our commuinties to have equal opportunities at acquiring that capital that will bring out the financial giants in them.</p>
                  <p><a className="btn btn-lg btn-primary" href="#" role="button">Browse gallery</a></p>
                </div>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
        </div>
    );
  }
}

export default Carousel;
