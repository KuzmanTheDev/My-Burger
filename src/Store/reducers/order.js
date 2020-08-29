import * as actionTypes from '../actions/actionTypes';
import { newObject } from '../../Utilities/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    error: false
};

const newOrder = (state, action)=>{
    const newOrder = newObject( action.orderData, { id: action.orderId});
    return newObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
}
const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            return newObject( state, { purchased: false });
        case actionTypes.PURCHASING_BURGER:
            return newObject( state, { loading: true });
        case actionTypes.PURCHASE_SUCCESS:
            return newOrder(state, action);
        case actionTypes.PURCHASE_FAILED:
            return newObject(state, {loading: false, error: true});
        case actionTypes.FETCH_ORDERS_INIT:
            return newObject(state, {loading: true});
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return newObject(state, {orders: action.orders, loading: false });
        case actionTypes.FETCH_ORDERS_FAILED:
            return newObject(state, {loading: false, error: true});
        default:
            return state;
    }
};

export default reducer;