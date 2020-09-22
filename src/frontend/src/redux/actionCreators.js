import * as Types from "./types";
export const setUser = (payload) => ({
  type: Types.setUser,
  payload,
});

export const fetch = (payload)=>({
  type: Types.api_pending,
  payload
});

export const setProjectProposals = (payload)=>({
  type: Types.setProjectProposals,
  payload
});

export const setDisbursements = (payload)=>({
  type: Types.setDisbursements,
  payload
});

export const setProjects = (payload)=>({
  type: Types.setProjects,
  payload
});

export const setFundCategories = (payload)=>({
  type: Types.setFundCategories,
  payload
});

export const setFundDetails = (payload)=>({
  type: Types.setFundDetails,
  payload
});

export  const setOrganizationUsers = (payload) => ({
  type: Types.setOrganizationUsers,
  payload
});