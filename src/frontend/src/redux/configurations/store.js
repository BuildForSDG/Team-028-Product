import { createStore, combineReducers } from "redux";
import { compose, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import  { devToolsEnhancer } from "redux-devtools-extension";


import {
  projectsReducer,
  requestsReducer,
  userReducer,
  projectProposalsReducer,
  disbursementsReducer,
  fundCategoriesReducer
} from "../reducers/reducers";

import {
  apiMiddleware
} from "../middlewares/middlewares";

const logger = createLogger();

const saveToLocalStorage = (state)=>{
  try{
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
  }
}

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state');

    if (serializedState === null) return undefined;

    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

const store = () => {
  const appStore = createStore(
    combineReducers({
      projects: projectsReducer,
      request: requestsReducer,
      user: userReducer,
      projectproposals: projectProposalsReducer,
      disbursements: disbursementsReducer,
      fundcategories: fundCategoriesReducer
    }),
    persistedState,
    compose(
      applyMiddleware(
        logger,
        apiMiddleware),
        devToolsEnhancer({
          trace: true
        })
      )
  );
  appStore.subscribe(()=>saveToLocalStorage(appStore.getState()));
  return appStore;
};

export default store;
