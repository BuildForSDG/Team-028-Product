import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./styles/index.css";
import "./components/dashboard/Dashboard.css";
import App from "./components/App";
import { Provider } from "react-redux";
import history from "./history";
import { Switch, Route, Router } from "react-router-dom";
import store from "./redux/configurations/store";
import RecoverPassword from "./components/RecoverPassword";
import Logout from "./components/Logout";
import SmeDashboard from "./components/dashboard/sme/SmeDashboard";
import RegulatorDashboard from "./components/dashboard/regulator/RegulatorDashboard";
import AdminDashboard from "./components/dashboard/admin/AdminDashboard";
import InvestorDashboard from "./components/dashboard/investor/InvestorDashboard";

/*const history = createHistory();*/
const stores = store();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={stores}>
      <Router history={history}>
        <Switch>
          <Route component={App} exact path="/" />
          <Route component={RecoverPassword} path="/recover-password" />
          <Route component={SmeDashboard} path="/sme" />
          <Route component={RegulatorDashboard} path="/regulator" />
          <Route component={AdminDashboard} path="/admin" />
          <Route component={InvestorDashboard} path="/investor" />
          <Route component={Logout} path="/logout" />
        </Switch>
      </Router>{" "}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
