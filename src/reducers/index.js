import spaces from "./spaces";
import notes from "./notes";
import timestamp from "./timestamp";

export default function appReducer(state = {}, action) {
  return {
    spaces: spaces(state.spaces, action),
    notes: notes(state.notes, action),
    timestamp: timestamp(state.timestamp, action)
  };
}
