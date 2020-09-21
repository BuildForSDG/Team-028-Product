import * as states from "../configurations/states";
import * as Types from "../types";


export const userReducer = (state = states.user, action) => {
  switch (action.type) {
    case Types.setUser: {
      return ({
        ...state,
        companyName: action.payload.companyName,
        category: action.payload.category,
        userId: action.payload.userId,
        organizationId: action.payload.organizationId,
        email: action.payload.email,
        lastFetch: Date.now()
      });
    }
    case Types.updateUserInvestments:
      return { ...state, investments: action.payload }
    default: {
      return state;
    }
  }
};

export const projectsReducer = (state = states.projects, action) => {
  switch (action.type) {
    case Types.setProjects: {
      return ({
        ...state,
        list: action.payload,
        lastFetch: Date.now()
      });
    }
    default: {
      return state;
    }
  }
};
export const projectProposalsReducer = (state = states.projectProposals, action) => {
  switch (action.type) {
    case Types.setProjectProposals: {
      return ({
        ...state,
        list: action.payload,
        lastFetch: Date.now()
      });
    }
    default: {
      return state;
    }
  }
};
export const fundCategoriesReducer = (state = states.fundCategories, action) => {
  switch (action.type) {
    case Types.setFundCategories: {
      return ({
        ...state,
        list: action.payload,
        lastFetch: Date.now()
      });
    }
    default: {
      return state;
    }
  }
};
export const disbursementsReducer = (state = states.disbursements, action) => {
  switch (action.type) {
    case Types.setDisbursements: {
      return ({
        ...state,
        list: action.payload,
        lastFetch: Date.now()
      });
    }
    default: {
      return state;
    }
  }
};


export const requestsReducer = (state = states.request, action) => {
  switch (action.type) {
    case Types.api_pending: {
      return Object.assign({}, state, { isPending: true });
    }
    case Types.api_success: {
      return Object.assign({},state, { isPending: false, ...action.payload });
    }
    case Types.api_failure: {
      return Object.assign({}, state,{ isPending: false, ...action.payload });
    }
    default: {
      return state;
    }
  }
};

export const fundDetailsReducer = (state = states.fundDetails, action) => {
  switch (action.type) {
    case Types.setFundDetails: {
      return Object.assign({}, state, { ...action.payload });
    }
    default: {
      return state;
    }
  }
};
