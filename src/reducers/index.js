import spaces from "./spaces";
import notes from "./notes";

export default function appReducer(state = {}, action) {
  return {
    spaces: spaces(state.spaces, action),
    notes: notes(state.notes, action)
  };
}
