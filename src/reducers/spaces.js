import {
  ADD_SPACES,
  ADD_SPACE,
  EDIT_SPACE,
  DELETE_SPACE,
  SELECT_SPACE
} from "../actions/types";

export default function spaces(state = [], action) {
  switch (action.type) {
    case ADD_SPACES:
      return action.spaces;
    case ADD_SPACE:
      return { ...action.space, current: true };
    case EDIT_SPACE:
      return state.map(space => {
        return space.current ? { ...space, name: action.name } : space;
      });
    case DELETE_SPACE:
      return state.filter(space => space.id !== action.id);
    case SELECT_SPACE:
      return state.map(space => {
        return space.id === action.id ? { ...space, current: true } : space;
      });
    default:
      return state;
  }
}
