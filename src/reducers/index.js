import spaces from "./spaces";
import notes from "./notes";
import timestamp from "./timestamp";
import currTime from "./currtime";
import errors from "./errors";

export default function appReducer(state = {}, action) {
  return {
    spaces: spaces(state.spaces, action),
    notes: notes(state.notes, action),
    timestamp: timestamp(state.timestamp, action),
    currTime: currTime(state.currTime, action),
    errors: errors(state.errors, action)
  };
}
