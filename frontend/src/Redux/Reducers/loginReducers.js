import {SUBMIT_LOGIN} from "../Actions/ActionTypes/types";

const initialState = 
        {
          name: "",
          password: "",
          isLoggedIn: false,
          errors: { }
        }
export default (state = initialState, action) => {
    switch (action.type){
        case SUBMIT_LOGIN :
            return {
                ...state,
            initialState : action.payload 
            }
        default:
            return state;
    }
}