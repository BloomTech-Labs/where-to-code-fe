import {
  UPDATE_INFO,
  UPDATE_ACTIVITY,
  LOGIN_NOT_COMPLETE,
  LOGIN_SUBMIT,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from "../actions";
import initialState from "../store";

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_INFO:
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        password: action.payload.password
      };
    case UPDATE_ACTIVITY:
      return {
        ...state,
        activityNumber:
          state.activityNumber === state.activity.length - 1
            ? 0
            : state.activityNumber + 1
      };
    case LOGIN_SUBMIT:
      return state;
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginErr: "",
        userID: action.payload.id,
        username: action.payload.username,
        firstname: action.payload.firstName,
        lastname: action.payload.lastName
      };
    case LOGIN_NOT_COMPLETE:
      return { ...state, loginErr: action.payload };
    default:
      return state;
  }
};
