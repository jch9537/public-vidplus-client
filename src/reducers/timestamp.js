import { CHANGE_TIMESTAMP } from "../actions/types";

export default function timestamp(state = null, action) {
  switch (action.type) {
    case CHANGE_TIMESTAMP:
      return action.time;
    default:
      return state;
  }
}
