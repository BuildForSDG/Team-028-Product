/* eslint-disable no-unused-expressions */
/* eslint-disable react/require-render-return */
import React from "react";

import Carousel from "./carousel/Carousel";
import Content from "./content/Content";
import Footer from "./footer/Footer";
import Header from "./header/Header";


import Container from "react-bootstrap/Container";

class App extends React.Component {
  render() {
    return (
      <>
        <Container fluid className="wrapper">
          <Header />
          <Carousel />
          <Content />
          <Footer />
        </Container>
      </>
    );
  }
}

export default App;
