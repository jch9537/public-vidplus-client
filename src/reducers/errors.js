import { ADD_ERROR, REMOVE_ERROR } from "../actions/types";

export default function errors(state = [], action) {
  switch (action.type) {
    case ADD_ERROR:
      return [...state, action.error];
    case REMOVE_ERROR:
      return state.filter((error, i) => i !== action.index);
    default:
      return state;
  }
}
