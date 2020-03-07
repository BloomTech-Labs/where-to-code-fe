import React from "react";

export const UPDATE_INFO = "UPDATE_INFO";

export const userName = name => dispatch => {
  dispatch({
    type: UPDATE_INFO,
    payload: name
  });
};
