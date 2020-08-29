import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const purchaseSuccess = (id, orderData) =>{
    return{
        type: actionTypes.PURCHASE_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseFailed = (error) =>{
    return{
        type: actionTypes.PURCHASE_FAILED,
        error: error
    }
};

export const purchasingBurger = () =>{
    return{
        type: actionTypes.PURCHASING_BURGER
    }
}
export const purchaseInit = () =>{
    return{
        type: actionTypes.PURCHASE_INIT
    }
}

export const postOrder = (orderData, token) =>{
    return dispatch => {
        dispatch(purchasingBurger());
        axios.post('/orders.json?auth=' + token, orderData)
        .then(response => {
            dispatch(purchaseSuccess(response.data.name, orderData))
        })
        .catch(err => {
            dispatch(purchaseFailed(err))
        });
    }
};

export const fetchOrdersSuccess = (orders) => {
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFailed = (error) => {
    return{
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    };
};

export const fetchOrdersInit = () => {
    return{
        type: actionTypes.FETCH_ORDERS_INIT
    };
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersInit());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
           dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(err => {
            dispatch(fetchOrdersFailed(err));
        })
    }
}
