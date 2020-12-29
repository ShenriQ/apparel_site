import { takeEvery,takeLatest, call, put, actionChannel } from "redux-saga/effects";
import {API_LOGIN, API_REGISTER, SET_USER, SHOW_LOAD, DISMISS_LOAD, SHOW_ALERT, API_ADDUSER, API_GETUSER,} from '../constants/action-types';
import {firebaseLogin, firebaseRegister, getUserData, setUserData} from '../../apis/user';
import _localstorage from '../../utils/localstorage';

export default function* watcherSaga() {
  yield takeEvery([API_LOGIN, API_REGISTER, API_ADDUSER, API_GETUSER], workerSaga);
}

function* workerSaga(action) {
  try {
    if(action.type == API_LOGIN)
    {
      yield put({type : SHOW_LOAD, payload : 'Loging in...'});
      const login_res = yield call(firebaseLogin, action.payload.user);
      console.log(login_res)
      action.payload.callback('success')
      yield put({type : SHOW_LOAD, payload : 'Loading...'});
      const profile_res = yield call(getUserData, login_res.user.uid);
      console.log(profile_res)
      yield put({type : SET_USER, payload : profile_res});
      yield put({type : DISMISS_LOAD, payload : ''});
      yield put({type : SHOW_ALERT, payload : {type : 'success', msg : 'Login Success!'}});
      action.payload.callback('/apparel')
    }
    else if(action.type == API_REGISTER)
    {
      yield put({type : SHOW_LOAD, payload : 'Registering ...'});
      const register_res = yield call(firebaseRegister, action.payload.user);
      console.log(register_res)
      action.payload.callback('success')
      yield put({type : SHOW_LOAD, payload : 'Loading...'});
      let user = {
        id : register_res.user.uid, email : action.payload.user.email, name : action.payload.user.name, 
        photo : action.payload.user.photo, zipcode : '', country : '', city : '', freeze : 'no', apparel_type : 'All', category : 'Men'}
      const profile_res = yield call(setUserData, user);
      console.log(profile_res)
      yield put({type : SET_USER, payload : user});
      yield put({type : DISMISS_LOAD, payload : ''});
      yield put({type : SHOW_ALERT, payload : {type : 'success', msg : 'Register Success!'}});
      action.payload.callback('/profile')
    }

  } catch (e) {
    console.log(e)
    yield put({ type: DISMISS_LOAD, payload: '' });
    // Handle Firebase auth Errors here.
    var errorCode = e.code;
    var errorMessage = e.message;
    if (errorCode === 'auth/wrong-password') {
        yield put({type : SHOW_ALERT, payload : {type : 'error', msg : 'Wrong password.' }});
    } else {
        yield put({type : SHOW_ALERT, payload : {type : 'error', msg : errorMessage }});
    }
  }
}
