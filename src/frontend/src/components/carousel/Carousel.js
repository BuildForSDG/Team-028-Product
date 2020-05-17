import React from "react";

class Carousel extends React.Component {
  render() {
    return (
      <div>
      <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
        </ol>
        {/* images would be replaced with the desired image */}
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://images.unsplash.com/photo-1561489396-888724a1543d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" class="d-block w-100" alt="..."/>
            <div class="carousel-caption d-none d-md-block">
              <h5>Transparency</h5>
              <p>This platform provides total transparency and accountability</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="https://images.unsplash.com/flagged/photo-1560790959-94da781aa017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" class="d-block w-100" alt="..."/>
            <div class="carousel-caption d-none d-md-block">
              <h5>Team work</h5>
              <p>We have an inclusive working style, all opinions matters.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="https://images.unsplash.com/photo-1570126646281-5ec88111777f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" class="d-block w-100" alt="..."/>
            <div class="carousel-caption d-none d-md-block">
              <h5>Condusive Working Enviroment</h5>
              <p>Our physical office is Condusive and humane.</p>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
</div>
      </div>
    );
  }
}

export default Carousel;
