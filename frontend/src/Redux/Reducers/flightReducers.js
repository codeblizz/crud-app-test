import {
  GET_FLIGHT_SUCCESS,
  GET_FLIGHT_ERRORS,
  RESET_FLIGHT,
  CREATE_FLIGHT,
  DELETE_FLIGHT,
  EDIT_FLIGHT,
  GET_ALLFLIGHT,
  UPDATE_FLIGHT,     
} from "../Actions/ActionTypes/types";

const initialState = { 
  flights: [], 
  error: " ", success: " ",
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
      case GET_FLIGHT_ERRORS:
        return { 
                ...state,
                error: payload
                };
      case GET_FLIGHT_SUCCESS:
        return {  
                ...state,
                succes:  payload
                };
      case GET_ALLFLIGHT:
        return { 
                ...state, 
                flights:  payload 
                }
      case CREATE_FLIGHT:
        return { 
                  ...state, 
                  flights: payload,
                }
      case UPDATE_FLIGHT:
        return {
            ...state,
            flights: state.flights.map(x => x._id === payload._id ? payload : x)
            }
      case DELETE_FLIGHT:
        return {
            ...state,
            flights: state.flights.filter(x => x._id !== payload)
            }
      case EDIT_FLIGHT:
        return {
            ...state,
            flights: {...state.payload}
            }
      case RESET_FLIGHT:
        return " "
      default:
        return state; 
    }
}