import {
  ADD_SPACES,
  ADD_SPACE,
  EDIT_SPACE,
  DELETE_SPACE,
  SELECT_SPACE,
  ADD_NOTES,
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  CHANGE_TIMESTAMP
} from "./types";

export function addSpaces(spaces) {
  return { type: ADD_SPACES, spaces };
}

export function addSpace(space) {
  return { type: ADD_SPACE, space };
}

export function editSpace(name, id) {
  return { type: EDIT_SPACE, name, id };
}

export function deleteSpace(id) {
  return { type: DELETE_SPACE, id };
}

export function selectSpace(id) {
  return { type: SELECT_SPACE, id };
}

export function addNotes(notes) {
  return { type: ADD_NOTES, notes };
}

export function addNote(note) {
  return { type: ADD_NOTE, note };
}

export function editNote(note, id) {
  return { type: EDIT_NOTE, note, id };
}

export function deleteNote(id) {
  return { type: DELETE_NOTE, id };
}

export function changeTimestamp(time) {
  return { type: CHANGE_TIMESTAMP, time };
}
