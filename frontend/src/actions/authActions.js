import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS
} from './types'
import { returnErrors } from "./errorActions";
import FetchService from "../services/fetchService";
import PostService from "../services/postService";
import {PostServiceModule} from "../App";

export const loadUser = () => async (dispatch, getState) => {
    dispatch({type: USER_LOADING});
    let userId = getState().auth.id;
    let token = getState().auth.token;
    if(userId && token) {
        try {
            let response = await FetchService.fetchUser(userId, token);
            if(response.status === 200) {
                dispatch({
                    type: USER_LOADED,
                    payload: await response.json()
                })
            } else if(response.status === 400) {
                let error = await response.json();
                dispatch(returnErrors(error.error, response.status))
            } else {
                dispatch(returnErrors('An error occurred on the server', response.status))
            }
        } catch(err) {
            dispatch(returnErrors('an error occurred on the server', 500))
            dispatch({
                type: AUTH_ERROR
            })
        }
    } else {
        dispatch(logout())
    }
};

export const login = ({username, password}) => async dispatch => {
    try {
        let response = await PostServiceModule.loginUser(username, password);
        if(response.status === 200) {
            let data = await response.json();
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data
            })
        } else if(response.status === 400) {
            let error = await response.json();
            dispatch(returnErrors(error.error, response.status));
            dispatch({
                type: LOGIN_FAIL
            })
        } else {
            dispatch(returnErrors('An error occurred on the server', response.status))
            dispatch({
                type: LOGIN_FAIL
            })
        }
    } catch(err) {
        dispatch(returnErrors('An error has occurred', 400));
        dispatch({
            type: LOGIN_FAIL
        })
    }
};

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
};

// Setup config/headers and token
export const getToken = getState => {
    // Get token from localstorage
    return getState().auth.token;
};