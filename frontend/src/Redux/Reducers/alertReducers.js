import { GET_USER_ERRORS, GET_USER_SUCCESS } from "../Actions/ActionTypes/types";

const initialState = {
  success: " ",
  error: " "
};

export default (state = initialState, action) => {
    switch (action.type) {
      case GET_USER_ERRORS:
        return {
                  loading: false,
                  success: " ",
                  error: action.payload
               }
      case GET_USER_SUCCESS:
        return {
                    loading: false,
                    success: action.payload,
                    error: " "
                }
      default:
        return state;
    }
  }
