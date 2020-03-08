import React from "react";
import axiosWithAuth from "../../../Helpers/axiosWithAuth";
export const UPDATE_ACTIVITY = "UPDATE_ACTIVITY";
export const UPDATE_INFO = "UPDATE_INFO";

export const LOGIN_SUBMIT = "LOGIN_SUBMIT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const REGISTER_SUBMIT = "REGISTER_SUBMIT";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export const userName = name => dispatch => {
  dispatch({
    type: UPDATE_INFO,
    payload: name
  });
};

export const setActivity = () => dispatch => {
  dispatch({ type: UPDATE_ACTIVITY });
};

export const login = (e, creds, history) => dispatch => {
  e.preventDefault();

  dispatch({ type: LOGIN_SUBMIT });
  axiosWithAuth()
    .post("/auth/login", {
      email: creds.email,
      password: creds.password
    })
    .then(res => {
      if (res.data.id) {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        localStorage.setItem("token", res.data.token);
        history.push("/dashboard");
      }
    })
    .catch(err =>
      dispatch({
        type: LOGIN_FAIL,
        payload: "Could not login. Please try again."
      })
    );
};
