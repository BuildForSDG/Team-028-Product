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

export const fetch = ({url, method,  data, onSuccess, onError})=>({
  type: Types.api,
  payload:{
    url,
    method,
    data,
    onSuccess,
    onError
  }
});