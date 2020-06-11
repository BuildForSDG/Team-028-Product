import * as states from "../configurations/states";
import * as Types from "../types";

export const smesReducer = (state = states.smes, action) => {
  switch (action.type) {
    case Types.sme: {
      return ({
        ...state,
        companyName: action.payload.companyName,
        category: action.payload.category,
        userId: action.payload.userId
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
        userId: action.payload.userId
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
        userId: action.payload.userId
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
        userId: action.payload.userId
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
        userId: action.payload.userId
      });
    }
    default: {
      return state;
    }
  }
};
