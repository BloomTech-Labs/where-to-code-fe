import { UPDATE_PLACE } from '../actions';

const initialState = {
  place: ''
};

export const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLACE:
      return {
        ...state,
        place: action.payload
      };
    default:
      return state;
  }
};
