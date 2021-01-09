import {SHOW_LOAD, DISMISS_LOAD, SHOW_ALERT, DISMISS_ALERT, OPEN_SIGNIN_MODAL, CLOSE_SIGNIN_MODAL} from '../constants/action-types';

const initialState = {
    loading : false, 
    isSignModal : false,
    msg : '',
    alert_obj : {
        type : 'success',
        msg : ''
    },
}

const LoadingReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case SHOW_LOAD :
            return {...state, loading : true, msg : action.payload}
        case DISMISS_LOAD :
            return {...state, loading : false, msg : ''}
        case SHOW_ALERT :
            return {...state, alert_obj : action.payload}
        case DISMISS_ALERT :
            return {...state, alert_obj : { type : 'success', msg : '' }}
        case OPEN_SIGNIN_MODAL :
            return {...state, isSignModal : true}
        case CLOSE_SIGNIN_MODAL :
            return {...state, isSignModal : false}
        default :
            return state
    }
}

export default LoadingReducer;