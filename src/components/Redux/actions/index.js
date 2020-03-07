import React from "react";
import axiosWithAuth from "../../../Helpers/axiosWithAuth";
export const UPDATE_ACTIVITY = "UPDATE_ACTIVITY";
export const UPDATE_INFO = "UPDATE_INFO";

export const LOGIN_NOT_COMPLETE = "LOGIN_NOT_COMPLETE";
export const LOGIN_SUBMIT = "LOGIN_SUBMIT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

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

  if (!creds.email.length > 0 || !creds.password.length > 0) {
    dispatch({
      type: LOGIN_NOT_COMPLETE,
      payload: "Please complete all login fields."
    });
    return;
  } else {
    dispatch({ type: LOGIN_SUBMIT });
    axiosWithAuth()
      .post("/auth/login", {
        email: creds.email,
        password: creds.password
      })
      .then(res => {
        if (res.data !== undefined) {
          dispatch({ type: LOGIN_SUCCESS, payload: res.data });
          localStorage.setItem("token", res.data.token);
          history.push("/dashboard");
        } else dispatch({ type: LOGIN_FAIL, payload: res.data });
      });
  }
};
