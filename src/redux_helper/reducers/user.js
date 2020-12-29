import {SET_USER, GET_USER, LOGOUT} from '../constants/action-types';
import _localstorage from '../../utils/localstorage';

const initialState = {
    user : {}
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return Object.assign({}, state, {
                user: _localstorage.getItem('vendos_user') == null ? {} : _localstorage.getItem('vendos_user')
            })
        case SET_USER:
            _localstorage.setItem('vendos_user', action.payload)
            return Object.assign({}, state, {
                user : action.payload
            })
        case LOGOUT:
            _localstorage.removeItem('vendos_user')
            return { user : {}}
        default:
            return state
    }
}

export default userReducer;