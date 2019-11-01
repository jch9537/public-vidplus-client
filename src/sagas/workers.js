import { call, put } from "redux-saga/effects";
import api from "../api";
import {
  ADD_SPACES_ASYNC,
  ADD_SPACE_ASYNC,
  EDIT_SPACE_ASYNC,
  DELETE_SPACE_ASYNC,
  SELECT_SPACE_ASYNC,
  ADD_NOTES_ASYNC,
  ADD_NOTE_ASYNC,
  EDIT_NOTE_ASYNC,
  DELETE_NOTE_ASYNC
} from "../actions/types";

// Worker Saga Generator Functions
export function* addSpacesAsync(action) {
  yield put({ type: ADD_SPACES_ASYNC, spaces: action.spaces });
}

export function* addSpaceAsync(action) {
  yield put({ type: ADD_SPACE_ASYNC, space: action.space });
}

export function* editSpaceAsync(action) {
  yield put({ type: EDIT_SPACE_ASYNC, id: action.id });
}

export function* deleteSpaceAsync(action) {
  yield put({ type: DELETE_SPACE_ASYNC, id: action.id });
}

export function* selectSpaceAsync(action) {
  yield put({ type: SELECT_SPACE_ASYNC, id: action.id });
}

export function* addNotesAsync(action) {
  yield put({ type: ADD_NOTES_ASYNC, notes: action.notes });
}

export function* addNoteAsync(action) {
  yield put({ type: ADD_NOTE_ASYNC, note: action.note });
}

export function* editNoteAsync(action) {
  const id = action.note.id;
  const editedNote = yield call(api, `notes/${id}`, "PUT", action.note);
  yield put({ type: EDIT_NOTE_ASYNC, note: editedNote });
}

export function* deleteNoteAsync(action) {
  yield put({ type: DELETE_NOTE_ASYNC, id: action.id });
}
