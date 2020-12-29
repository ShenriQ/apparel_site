import { takeEvery, call, put, all } from "redux-saga/effects";
// import fav from './fav';
import user from './user';

export default function* watcherSaga() {
  // yield all([call(fav), call(user)]);
  yield all([ call(user)]);
}
