import * as states from "../configurations/states";
import * as Types from "../types";

export const smesReducer = (state = states.smes, action) => {
  switch (action.type) {
    case Types.sme: {
      return ({
        ...state,
        companyName: action.payload.companyName,
        category: action.payload.category,
        userId: action.payload.userId,
        userData: action.payload.userData,
        lastFetch: Date.now()
      });
    }
    default: {
      return state;
    }
  }
};

export const investorsReducer = (state = states.investors, action) => {
  switch (action.type) {
    case Types.investor: {
      return ({
        ...state,
        companyName: action.payload.companyName,
        category: action.payload.category,
        userId: action.payload.userId,
        userData: action.payload.userData,
        lastFetch: Date.now()
      });
    }
    default: {
      return state;
    }
  }
};

export const regulatorsReducer = (state = states.regulators, action) => {
  switch (action.type) {
    case Types.regulator: {
      return ({
        ...state,
        companyName: action.payload.companyName,
        category: action.payload.category,
        userId: action.payload.userId,
        userData: action.payload.userData,
        lastFetch: Date.now()
      });
    }
    default: {
      return state;
    }
  }
};

export const projectsReducer = (state = states.regulators, action) => {
  switch (action.type) {
    case Types.admin: {
      return ({
        ...state,
        companyName: action.payload.companyName,
        category: action.payload.category,
        userId: action.payload.userId,
        userData: action.payload.userData,
        lastFetch: Date.now()
      });
    }
    default: {
      return state;
    }
  }
};

export const adminReducer = (state = states.regulators, action) => {
  switch (action.type) {
    case Types.admin: {
      return ({
        ...state,
        companyName: action.payload.companyName,
        category: action.payload.category,
        userId: action.payload.userId,
        userData: action.payload.userData,
        lastFetch: Date.now()
      });
    }
    default: {
      return state;
    }
  }
};

export const requestsReducer = (state = states.requests, action) => {
  switch (action.type) {
    case Types.api_pending: {
      return Object.assign({}, state, {isPending: true});
    }
    case Types.api_success: {
      return Object.assign({},state, {isPending: false});
    }
    case Types.api_failure: {
      return Object.assign({}, state,{isPending: false});
    }
    default: {
      return state;
    }
  }
};
