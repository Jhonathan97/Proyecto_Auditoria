import * as ActionTypes from './ActionType';

export const Auditorias = (state = {
    isLoading: true,
    errMess: null,
    auditorias: []
}, action) => {
    switch (action.type) {
        case ActionTypes.CONSULTAR_AUDITORIAS:
            return { ...state, isLoading: false, errMess: null, auditorias: action.payload };

        case ActionTypes.AUDITORIAS_LOADING:
            return { ...state, isLoading: true, errMess: null, leaders: [] }

        case ActionTypes.AUDITORIAS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };
        default:
            return state;
    }
}