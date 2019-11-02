import { call, put } from "redux-saga/effects";
import api from "../api";
import {
  ADD_NOTES_ASYNC,
  ADD_NOTE_ASYNC,
  EDIT_NOTE_ASYNC,
  DELETE_NOTE_ASYNC,
  ADD_ERROR
} from "../actions/types";

// 비동기 처리 (worker 함수)
export function* addNotesAsync() {
  try {
    const existingNotes = yield call(api, "notes", "GET");
    yield put({ type: ADD_NOTES_ASYNC, notes: existingNotes });
  } catch (error) {
    yield put({ type: ADD_ERROR, error });
  }
}

export function* addNoteAsync(action) {
  try {
    const newNote = yield call(api, "notes", "POST", action.note);
    yield put({ type: ADD_NOTE_ASYNC, note: newNote });
  } catch (error) {
    yield put({ type: ADD_ERROR, error });
  }
}

export function* editNoteAsync(action) {
  try {
    const id = action.note.id;
    const editedNote = yield call(api, `notes/${id}`, "PUT", action.note);
    yield put({ type: EDIT_NOTE_ASYNC, note: editedNote });
  } catch (error) {
    yield put({ type: ADD_ERROR, error });
  }
}

export function* deleteNoteAsync(action) {
  try {
    const id = action.id;
    yield call(api, `notes/${id}`, "DELETE");
    yield put({ type: DELETE_NOTE_ASYNC, id });
  } catch (error) {
    yield put({ type: ADD_ERROR, error });
  }
}
