import { UPDATE_PLACE } from "../actions";
import { UPDATE_MAP } from "../actions";

const initialState = {
  place: "", 
  map: null
};

export const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLACE:
      return {
        ...state,
        place: action.payload
      };
    case UPDATE_MAP:
      return {
        ...state,
        map: action.payload
      };
    default:
      return state;
  }
};
