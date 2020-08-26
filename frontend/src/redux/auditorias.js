import * as ActionTypes from './ActionType';

var updateArr = (arreglo, item) => {
    var auditorias = arreglo.slice();
    var i = auditorias.findIndex((a) => a._id === item._id);
    i !== -1 && auditorias.splice(i, 1, item);
    return auditorias;
};

export const Auditorias = (state = {
    isLoading: true,
    errMess: null,
    auditorias: []
}, action) => {
    switch (action.type) {
        case ActionTypes.CONSULTAR_AUDITORIAS:
            return { ...state, isLoading: false, errMess: null, auditorias: action.payload };

        case ActionTypes.AUDITORIAS_LOADING:
            return { ...state, isLoading: true, errMess: null, auditorias: [] }

        case ActionTypes.AUDITORIAS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };
        case ActionTypes.ADD_AUDITORIA:
            var auditoria = action.payload;
            return { ...state, auditorias: state.auditorias.concat(auditoria) };
        case ActionTypes.DELETE_AUDITORIA:
            var auditoriaDeleted = action.payload;
            return { ...state, auditorias: state.auditorias.filter((auditoria) => auditoria._id !== auditoriaDeleted._id) };
        case ActionTypes.UPDATE_AUDITORIA:
            return { ...state, auditorias: updateArr(state.auditorias, action.payload) };
        default:
            return state;
    }
}