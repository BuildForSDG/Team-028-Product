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
    default: {
      return state;
    }
  }
};

export const projectsReducer = (state = states.projects, action) => {
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
