import { CHANGE_CURRTIME } from "../actions/types";

export default function currTime(state = 0, action) {
  switch (action.type) {
    case CHANGE_CURRTIME:
      return action.time;
    default:
      return state;
  }
}
