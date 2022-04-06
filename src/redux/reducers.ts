import { DefaultState, ReduxCurrentUserAction } from "../interfaces";
import { UPDATE_CURRENT_USER } from "./actions";

const INITIAL_STATE = {
  currentUser: null
};

export const appReducer = (state: DefaultState = INITIAL_STATE, action: ReduxCurrentUserAction) => {
  switch (action?.type) {
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

