/*eslint-disable*/

import axios from 'axios';

import { createUserUrl, loginUserUrl, logOutUserUrl } from '../helpers/apiEndpoints';

export const CREATE_USER = 'CREATE USER';
export const CREATE_USER_ERROR = 'CREATE USER ERROR';
export const LOGIN_USER = 'LOGIN USER';
export const LOGIN_USER_ERROR = 'LOGIN USER ERROR';
export const LOGOUT_USER = 'LOGOUT USER';
export const LOGGED_IN = 'LOGGED IN';
export const LOGGED_IN_ERROR = 'LOGGED_IN_ERROR';

export const loginStatus = () => dispatch => true;

export const createUser = newUser => async dispatch => {
  let response = {};
  try {
    response = await axios({
      method: 'POST',
      url: createUserUrl,
      data: { user: newUser },
      crossdomain: true,
      withCredentials: true,
    });
    dispatch({
      type: CREATE_USER,
      payload: {
        ...newUser,
        id: response.data.user.id ? response.data.user.id : null,
      },
    });
    return response;
  } catch (error) {
    dispatch({ type: CREATE_USER_ERROR, payload: response.data.errors });
    return error;
  }
};

export const loginUser = user => async dispatch => {
  let response = {};
  try {
    response = await axios.post(loginUserUrl, { user }, {
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    });
    dispatch({
      type: LOGIN_USER,
      payload: response.data,
    });
    return response;
  } catch (error) {
    dispatch({
      type: LOGIN_USER_ERROR,
      payload: error,
    });
    return error;
  }
};

export const logOutUser = () => async dispatch => {
  try {
    dispatch({ type: LOGOUT_USER, payload: {} });
    const response = await axios({
      method: 'DELETE',
      url: logOutUserUrl,
      data: { user: {} },
      crossdomain: true,
      withCredentials: true,
    });
    return response;
  } catch (error) { return (error); }
};
