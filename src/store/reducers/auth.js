import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
     });
};

const authFailed = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {token: null, userId: null});
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // in my opinion writing reducers cases like that is A LOT more readable
        // no need to extract logic to functions
        case actionTypes.AUTH_START:
        return {
            ...state,
            error: null,
            loading: true,
        };
        case actionTypes.AUTH_SUCCESS:
         return {
            ...state,
            token: action.idToken,
            userId: action.userId,
            error: null,
            loading: false
        };
        case actionTypes.AUTH_FAIL: return authFailed(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state;
    }
};

export default reducer;