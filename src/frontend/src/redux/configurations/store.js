import { createStore, combineReducers } from "redux";
import { compose, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import  { devToolsEnhancer } from "redux-devtools-extension"


import {
  smesReducer,
  investorsReducer,
  regulatorsReducer,
  projectsReducer,
  adminReducer,
  requestsReducer
} from "../reducers/reducers";
import { smes, investors, regulators, admins, projects, requests } from "./states";
import {
  // smeMiddleware,
  // regulatorMiddleware,
  // projectMiddleware,
  // investorMiddleware,
  // adminMiddleware,
  apiMiddleware
} from "../middlewares/middlewares";

const logger = createLogger();

const store = () => {
  const appStore = createStore(
    combineReducers({
      investor: investorsReducer,
      regulator: regulatorsReducer,
      project: projectsReducer,
      admin: adminReducer,
      sme: smesReducer,
      request: requestsReducer,
    }),
    {
      sme: smes,
      investor: investors,
      regulator: regulators,
      project: projects,
      admin: admins,
      request: requests
    },
    compose(
      applyMiddleware(
        // adminMiddleware,
        // investorMiddleware,
        // projectMiddleware,
        // regulatorMiddleware,
        // smeMiddleware,
        logger,
        apiMiddleware),
        devToolsEnhancer({
          trace: true
        })
      )
  );
  return appStore;
};
export default store;
