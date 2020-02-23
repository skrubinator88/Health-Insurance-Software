import {GET_ERRORS, CLEAR_ERRORS} from "./types";

export const returnErrors = (message, status) => {
    return {
        type: GET_ERRORS,
        payload: {message, status}
    }
};

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    }
}