import {
  LOGIN_SUCCESS,
  SIGN_OUT,
  UPDATE_SAVED_LOCATIONS
} from "../actions";

const initialState = {
  userID: "",
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  loggedIn: false,
  savedLocations: []
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        userID: action.payload.id,
        username: action.payload.username,
        firstname: action.payload.firstName,
        lastname: action.payload.lastName,
        email: action.payload.email,
        loggedIn: true
      };
    case SIGN_OUT:
      return {
        ...state,
        userID: "",
        username: "",
        firstname: "",
        lastname: "",
        loggedIn: false
      };
    case UPDATE_SAVED_LOCATIONS:
      return {
        ...state,
        savedLocations: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
