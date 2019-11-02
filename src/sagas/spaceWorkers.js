import { call, put } from "redux-saga/effects";
import api from "../api";
import {
  ADD_SPACES_ASYNC,
  ADD_SPACE_ASYNC,
  EDIT_SPACE_ASYNC,
  DELETE_SPACE_ASYNC,
  SELECT_SPACE_ASYNC,
  ADD_ERROR
} from "../actions/types";

// 비동기 처리 (worker 함수)
export function* addSpacesAsync(action) {
  try {
    const getSpaces = yield call(api, "spaces", "GET");
    yield put({ type: ADD_SPACES_ASYNC, spaces: getSpaces });
  } catch (error) {
    yield put({ type: ADD_ERROR, error });
  }
}

export function* addSpaceAsync(action) {
  try {
    const getSpace = yield call(api, "spaces", "POST", action.space);
    yield put({ type: ADD_SPACE_ASYNC, space: getSpace });
  } catch (error) {
    yield put({ type: ADD_ERROR, error });
  }
}

export function* editSpaceAsync(action) {
  try {
    const id = action.id;
    const editedSpace = yield call(api, `spaces/${id}`, "PUT", action.name);
    yield put({
      type: EDIT_SPACE_ASYNC,
      name: editedSpace.name,
      id: editedSpace.id
    });
  } catch (error) {
    yield put({ type: ADD_ERROR, error });
  }
}

export function* deleteSpaceAsync(action) {
  try {
    const id = action.id;
    const deletedSpace = yield call(api, `space/${id}`, "DELETE");
    yield put({ type: DELETE_SPACE_ASYNC, id: deletedSpace.id });
  } catch (error) {
    yield put({ type: ADD_ERROR, error });
  }
}

export function* selectSpaceAsync(action) {
  try {
    const id = action.id;
    const selectedSpace = yield call(api, `space/${id}`, "GET");
    yield put({ type: SELECT_SPACE_ASYNC, id: selectedSpace.id });
  } catch (error) {
    yield put({ type: ADD_ERROR, error });
  }
}
