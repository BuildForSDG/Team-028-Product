import axios from 'axios';
import * as Types from '../types';

export const apiMiddleware =  ({dispatch, getState }) => next => async action =>{
  if (action.type !== Types.api_pending){
    return next(action);
  }

  const { url, method, data, onSuccess, onError} = action.payload;

  next(action);
  try {
    const response =  await  axios.request({
      baseURL: "https://eazsme-backend.herokuapp.com",
      url,
      method,
      data
    });
    const { status, message } =  response.data;

    if (status === "success"){

      dispatch({ type: Types.api_success, payload :{ status, message } });

      if (response.data.result) dispatch({ type: onSuccess, payload: response.data.result });

      if (response.data.data) dispatch({ type: onSuccess, payload: response.data.data });

    }else{
      const fetchedData = response.data.data;

      if (fetchedData.length > 0){
        dispatch({ type: onSuccess, payload: fetchedData })
      }
      else dispatch({ type: Types.api_failure, payload: { status, message } });
    }
  } catch (error) {

    dispatch({type: Types.api_failure});

    if (onError){
      dispatch({type: onError, payload: error.message});
    }
  }
}