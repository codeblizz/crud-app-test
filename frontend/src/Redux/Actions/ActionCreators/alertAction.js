import {
        GET_USER_ERRORS,
        GET_USER_SUCCESS,
       } from "../ActionTypes/types";

export const getErrors = (errors) => {
    return {
        type: GET_USER_ERRORS,
        payload: errors
    }
}
export const getSuccess = (success) => {
    return {
        type: GET_USER_SUCCESS,
        payload: success
    }
}
