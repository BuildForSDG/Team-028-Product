/* eslint-disable no-unused-expressions */
/* eslint-disable react/require-render-return */
import React from "react";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import Carousel from "./carousel/Carousel";
import Content from "./content/Content";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import store from "../redux/configurations/store";

const history = createBrowserHistory();
const stores = store();
class App extends React.Component {
  render() {
    return (
      <Provider store={stores}>
        <Router history={history}>
          <div className="container-fluid no-gutter">
            <Header />
            <Carousel />
            <Content />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
