import React from "react";

export const UPDATE_ACTIVITY = "UPDATE_ACTIVITY";
export const UPDATE_INFO = "UPDATE_INFO";

export const userName = name => dispatch => {
  dispatch({
    type: UPDATE_INFO,
    payload: name
  });
};

export const setActivity = () => dispatch => {
  dispatch({ type: UPDATE_ACTIVITY });
};
