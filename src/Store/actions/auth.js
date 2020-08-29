import axios from 'axios'
import * as actionTypes from './actionTypes';

export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    };
}
export const authSuccess = (token, userId) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
}
export const authFailed = ( error ) =>{
    return{
        type: actionTypes.AUTH_FAILED,
        error: error
    };
}
export const authSwitch = ( route ) =>{
    return{
        type: actionTypes.AUTH_SWITCH,
        route: route
    };
}
export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationPeriod');
    localStorage.removeItem('userId');
    return{
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const authTimeOut = ( expirationTime ) =>{
    return dispatch => {
        setTimeout(() =>{
          dispatch(logout());
        }, expirationTime * 1000)
    };
};

export const authenticate = (email, password, isSignup ) =>{
    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
       let  url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAz_kKU1N9KMxkYVPqXRbPGFId22Mo98Dg';
        if(!isSignup){
             url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAz_kKU1N9KMxkYVPqXRbPGFId22Mo98Dg';
        }
        axios.post(url, authData)
        .then(res => {
            const expirationPeriod = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationPeriod', expirationPeriod);
            localStorage.setItem('userId', res.data.localId);
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(authTimeOut(res.data.expiresIn));
        })
        .catch(error => {
            dispatch(authFailed(error.response.data.error));
        });
    };
}

export const authRedirectPath = (path) => {
    return{
        type: actionTypes.AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token){
            dispatch(logout());
        }else {
            const expirationPeriod = new Date(localStorage.getItem('expirationPeriod'));
            if ( expirationPeriod <= new Date()){
                dispatch(logout());
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(authTimeOut((expirationPeriod.getTime() - new Date().getTime()) / 1000 ))
            }
        };
    };
}