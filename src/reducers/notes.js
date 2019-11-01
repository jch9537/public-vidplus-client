import {
  ADD_NOTES_ASYNC,
  ADD_NOTE_ASYNC,
  EDIT_NOTE_ASYNC,
  DELETE_NOTE_ASYNC
} from "../actions/types";

export default function notes(state = [], action) {
  switch (action.type) {
    case ADD_NOTES_ASYNC:
      return action.notes;
    case ADD_NOTE_ASYNC:
      return [...state, { ...action.note, current: false }];
    case EDIT_NOTE_ASYNC:
      return state.map(note => {
        if (note.id === action.note.id) {
          return action.note;
        } else {
          return note;
        }
      });
    case DELETE_NOTE_ASYNC:
      return state.filter(note => note.id !== action.id);
    default:
      return state;
  }
}
