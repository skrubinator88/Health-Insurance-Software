import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS
} from '../../actions/types'
const initialState = {
    token: localStorage.getItem('token'),
    id: localStorage.getItem('userId'),
    user: null,
    isAuthenticated: null,
    isLoading: false,
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('userId', action.payload.userId);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            return {
                ...state,
                token: null,
                id: null,
                user: null,
                isAuthenticated: false
            };
        default:
            return state;
    }
};

export default authReducer;