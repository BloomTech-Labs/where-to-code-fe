import { UPDATE_INFO } from "../actions";
import initialState from "../store";

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_INFO:
      return {
        ...state,
        username: action.payload
      };
    default:
      return state;
  }
};
