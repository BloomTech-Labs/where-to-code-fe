import {
  UPDATE_INFO,
  UPDATE_ACTIVITY,
  LOGIN_SUBMIT,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUBMIT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS
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
        userID: action.payload.id,
        username: action.payload.username,
        firstname: action.payload.firstName,
        lastname: action.payload.lastName
      };
    case LOGIN_FAIL:
      return state;
    default:
      return state;
  }
};
