import { call, put } from "redux-saga/effects";
import api from "../api";
import {
  ADD_NOTES_ASYNC,
  ADD_NOTE_ASYNC,
  EDIT_NOTE_ASYNC,
  DELETE_NOTE_ASYNC
} from "../actions/types";

// 비동기 처리 (worker 함수)
export function* addNotesAsync() {
  const existingNotes = yield call(api, "notes", "GET");
  yield put({ type: ADD_NOTES_ASYNC, notes: existingNotes });
}

export function* addNoteAsync(action) {
  const newNote = yield call(api, "notes", "POST", action.note);
  yield put({ type: ADD_NOTE_ASYNC, note: newNote });
}

export function* editNoteAsync(action) {
  const id = action.note.id;
  const editedNote = yield call(api, `notes/${id}`, "PUT", action.note);
  yield put({ type: EDIT_NOTE_ASYNC, note: editedNote });
}

export function* deleteNoteAsync(action) {
  const id = action.id;
  yield call(api, `notes/${id}`, "DELETE");
  yield put({ type: DELETE_NOTE_ASYNC, id });
}
