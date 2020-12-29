// import { takeEvery, call, put } from "redux-saga/effects";
// import { API_LOGIN, API_REGISTER, SHOW_LOAD, DISMISS_LOAD, SHOW_ALERT,
//   SET_USER, GET_CART, ADD_FAV, SET_FAVS} from '../constants/action-types';
// import {addFav, getAllFavs} from '../../apis/fav';
// import {doLogin, doRegister} from '../../apis/user';
// import _localstorage from '../../utils/localstorage';

// const getUser =()=> {
//   return _localstorage.getItem('user')
// }

// export default function* watcherSaga() {
//   yield takeEvery([API_ADDFAV, API_GETFAV], workerSaga);
// }

// function* workerSaga(action) {
//   try {
//     if(action.type == API_ADDFAV)
//     {
//       yield put({type : SHOW_LOAD, payload : 'Adding to Favourites...'});
//       const payload = yield call(addFav, action.payload);
//       yield put({type : DISMISS_LOAD, payload : ''});
//       yield put({type : API_GETFAV, payload : {}});
//       yield put({type : SHOW_ALERT, payload : {type : 'success', msg : 'The product is added to your favorites!'}});
//     }
//     else if(action.type == API_GETFAV)
//     {
//       let user =  getUser()
//       if (user == null || user.id == null)
//       {
//         yield put({type : SET_FAVS, payload : []});
//       }
//       else
//       {
//         const payload = yield call(getAllFavs, {user_id : user.id});
//         yield put({type : SET_FAVS, payload : payload});
//       }
//     }

//   } catch (e) {
//     console.log(e)
//     yield put({ type: DISMISS_LOAD, payload: '' });
//     if(e.response != null && e.response.data != null && e.response.data.message != null)
//     {
//       yield put({type : SHOW_ALERT, payload : {type : 'error', msg : e.response.data.message }});
//     }
    
//   }
// }
