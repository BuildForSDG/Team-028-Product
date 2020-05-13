import * as states from "../configurations/states";
import * as Types from "../types";

export const smesReducer = (state = states.smes, action) => {
  return state;
};

export const investorsReducer = (state = states.investors, action) => {
  return state;
};

export const regulatorsReducer = (state = states.regulators, action) => {
  return state;
};

export const projectsReducer = (state = states.regulators, action) => {
  return state;
};

export const adminReducer = (state = states.regulators, action) => {
  switch (action.type) {
    case Types.admin: {
      return ({
        ...state,
        name: action.payload.name,
        login: action.payload.login
      });
    }
    default: {
      return state;
    }
  }
};
