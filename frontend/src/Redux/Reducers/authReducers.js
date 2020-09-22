import {
    SET_CURRENT_USER,
  } from "../Actions/ActionTypes/types";

  const isEmpty = require("is-empty");

  const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload
        };
      default:
        return state;
    }
  }