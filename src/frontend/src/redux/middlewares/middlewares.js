import axios from 'axios';
import * as Types from '../types';

export const adminMiddleware = (store) => (next) => (action) => {};

export const smeMiddleware = (store) => (next) => (action) => {
  if (!action.meta && action.meta !== "sme") {
    return next(action);
  }
  // do something with sme
  
};

export const investorMiddleware = (store) => (next) => (action) => {};

export const regulatorMiddleware = (store) => (next) => (action) => {};

export const projectMiddleware = (store) => (next) => (action) => {
  if (!action.meta && action.meta !== "project") {
    return next(action);
  }
  // do something with sme
};

export const apiMiddleware =  ({dispatch, getState }) => next => async action =>{
  if (action.type !== Types.api){
    return next(action);
  }

  const { url, method, data, onSuccess, onError} = action.payload;

  dispatch({type: Types.api_pending});

  next(action);

  try {
    const response =  await  axios.request({
      baseURL: "http://localhost:4000",
      url,
      method,
      data
    });

    dispatch({type: Types.api_success});

    dispatch({type: onSuccess, payload: response.data});

  } catch (error) {

    dispatch({type: Types.api_failure});

    if (onError){
      dispatch({type: onError, payload: error.message});
    }
  }
}