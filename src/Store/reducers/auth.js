import * as actionTypes from '../actions/actionTypes';
import { newObject } from '../../Utilities/utility';

const  initialState = {
    token : null,
    userId : null,
    error : null,
    loading : false,
    authRedirectPath: '/'
}

const authSuccess = (state, action) =>{
    return newObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
}

const authFailed = (state, action) =>{
    return newObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return newObject(state, {
        token: null,
        userId: null
    });
}
const setAuthRedirectPath = (state, action) => {
    return newObject(state, {
        authRedirectPath: action.path
    });
}

const reducer = ( state=initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START: return newObject(state, {error: null, loading: true});
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAILED: return authFailed(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state;
    }
};

export default reducer;