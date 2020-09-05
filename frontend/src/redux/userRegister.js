
import * as ActionTypes from './ActionType';

export const UserRegister = (state = {
    isSuccess: false,
    errMess: null
}, action) => {
    switch (action.type) {
        case ActionTypes.USER_REGISTER_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                errMess: null,
            };
        case ActionTypes.USER_REGISTER_FAILED:
            return {
                ...state,
                isSuccess: false,
                errMess: action.message
            };
        default:
            return state
    }
}