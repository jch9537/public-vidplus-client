import {
  ADD_SPACES,
  ADD_SPACE,
  EDIT_SPACE,
  DELETE_SPACE,
  SELECT_SPACE
} from "../actions/types";
const initialState = [
  {
    id: 0,
    url: "https://www.youtube.com/watch?v=568g8hxJJp4",
    name: "funfunfunction_async"
  },
  {
    id: 1,
    url: "https://www.youtube.com/watch?v=2d7s3spWAzo",
    name: "funfunfunction_promise"
  }
];

export default function spaces(state = initialState, action) {
  switch (action.type) {
    case ADD_SPACES:
      return action.spaces;
    case ADD_SPACE:
      // PREVIOUS CODE: return { ...action.space, current: true };
      return [...state, { ...action.space, current: false }];
    case EDIT_SPACE:
      return state.map(space => {
        // PREVIOUS CODE: return space.current ? { ...space, name: action.name } : space;
        return space.id === action.id ? { ...space, name: action.name } : space;
      });
    case DELETE_SPACE:
      return state.filter(space => space.id !== action.id);
    case SELECT_SPACE:
      return state.map(space => {
        if (space.id === action.id) {
          // 새로운 current space를 지정해준다
          return { ...space, current: true };
        } else if (space.current) {
          // 예전의 current space를 deselect
          return { ...space, current: false };
        } else {
          return space;
        }
        // PREVIOUS CODE: return space.id  === action.id ? { ...space, current: true } : space;
      });
    default:
      return state;
  }
}
