import { UPDATE_INFO, UPDATE_ACTIVITY } from "../actions";
import initialState from "../store";

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_INFO:
      return {
        ...state,
        username: action.payload
      };
    case UPDATE_ACTIVITY:
      return {
        ...state,
        activityNumber:
          state.activityNumber === state.activity.length - 1
            ? 0
            : state.activityNumber + 1
      };
    default:
      return state;
  }
};
