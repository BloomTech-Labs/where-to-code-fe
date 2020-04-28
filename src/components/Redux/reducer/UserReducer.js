import {
  LOGIN_SUCCESS,
  SIGN_OUT,
  UPDATE_SAVED_LOCATIONS,
  UPDATE_USER_VISITS,
  REMOVE_USER_VISIT,
  REMOVE_SAVED_LOCATION
} from "../actions";

const initialState = {
  userID: "",
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  loggedIn: false,
  savedLocations: [],
  visits: []
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
    case REMOVE_SAVED_LOCATION:
      return {
        ...state,
        savedLocations: state.savedLocations.filter(location => location.id !== action.payload)
      }
    case UPDATE_USER_VISITS:
      return {
        ...state,
        visits: action.payload
      };
    case REMOVE_USER_VISIT:
      return {
        ...state,
        visits: state.visits.filter(visit => visit.id !== action.payload)
      }
    default:
      return state;
  }
};

export default userReducer;
