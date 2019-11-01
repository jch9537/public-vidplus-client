import { call, put } from "redux-saga/effects";
import api from "../api";
import {
  ADD_SPACES_ASYNC,
  ADD_SPACE_ASYNC,
  EDIT_SPACE_ASYNC,
  DELETE_SPACE_ASYNC,
  SELECT_SPACE_ASYNC
} from "../actions/types";

// 비동기 처리 (worker 함수)
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
