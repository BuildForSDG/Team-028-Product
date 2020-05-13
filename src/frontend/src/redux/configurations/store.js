import { createStore, combineReducers } from "redux";
import { compose, applyMiddleware } from "redux";
import { smesReducer, investorsReducer, regulatorsReducer, projectsReducer, adminReducer } from "../reducers/reducers";
import { smes, investors, regulators, admins, projects } from "./states";
import {
  smeMiddleware,
  regulatorMiddleware,
  projectMiddleware,
  investorMiddleware,
  adminMiddleware
} from "../middlewares/middlewares";
const store = () => {
  const appStore = createStore(
    combineReducers({
      investor: investorsReducer,
      regulator: regulatorsReducer,
      project: projectsReducer,
      admin: adminReducer,
      sme: smesReducer
    }),
    {
      sme: smes,
      investor: investors,
      regulator: regulators,
      project: projects,
      admin: admins
    },
    compose(applyMiddleware(adminMiddleware, investorMiddleware, projectMiddleware, regulatorMiddleware, smeMiddleware))
  );
  return appStore;
};
export default store;
