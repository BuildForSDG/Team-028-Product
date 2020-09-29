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

export  const setMilestones = (payload) => ({
  type: Types.setMilestones,
  payload
});

export  const setFundApplicationsList = (payload) => ({
  type: Types.setFundApplicationsList,
  payload
});

export  const setProjectDetails = (payload) => ({
  type: Types.setProjectDetails,
  payload
});

export  const setSMEsList = (payload) => ({
  type: Types.setSMEsList,
  payload
});

export  const setInvestorsList = (payload) => ({
  type: Types.setInvestorsList,
  payload
});