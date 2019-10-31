import {
  ADD_NOTES,
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  SELECT_NOTE
} from "../actions/types";

export default function notes(state = [], action) {
  switch (action.type) {
    case ADD_NOTES:
      return action.notes;
    case ADD_NOTE:
      return [...state, { ...action.note, current: false }];
    case EDIT_NOTE:
      return state.map(note => {
        if (note.id === action.note.id) {
          return action.note;
        } else {
          return note;
        }
      });
    case DELETE_NOTE:
      return state.filter(note => !note.current);
    case SELECT_NOTE:
      return state.map(note => {
        if (note.id === action.id) {
          return { ...note, current: true };
        } else if (note.current) {
          return { ...note, current: false };
        } else {
          return note;
        }
      });
    default:
      return state;
  }
}
