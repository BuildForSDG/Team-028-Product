import * as Types from "./types";

export const adminAction = (payload) => ({
  type: Types.admin,
  payload,
  meta: "admin"
});

export const smeAction = (payload) => ({
  type: Types.sme,
  payload,
  meta: "sme"
});

export const investorAction = (payload) => ({
  type: Types.investor,
  payload,
  meta: "investor"
});

export const projectAction = (payload) => ({
  type: Types.project,
  payload,
  meta: "project"
});

export const regulatorAction = (payload) => ({
  type: Types.regulator,
  payload,
  meta: "regulator"
});

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

