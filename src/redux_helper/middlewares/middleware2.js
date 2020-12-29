import {ADD_CART, SHOW_ALERT} from '../constants/action-types';

export const foundDuplicatedCart = ({getState, dispatch}) => {
    return (next) => {
        return (action) => {
            if(action.type == ADD_CART)
            {   
                // get current store's state
                const state = getState()
                const found = state.cartReducer.cart.filter(item => item == action.payload)
                if(found.length) {
                    return dispatch({type : SHOW_ALERT, payload : {type : 'warning', msg : 'This product is already in your cart!'}})
                }
                else
                {
                    dispatch({type : SHOW_ALERT, payload : {type : 'success', msg : 'The product is added to your cart!'}})
                }
            }
            return next(action)
        }   
    }
}