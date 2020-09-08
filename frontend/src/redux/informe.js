import * as ActionTypes from "./ActionType";

export const Informe = (
  state = {
    isLoading: true,
    errMess: null,
    informe: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CONSULTAR_INFORME:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        informe: action.payload,
      };

    case ActionTypes.INFORME_LOADING:
      return { ...state, isLoading: true, errMess: null, informe: null };

    case ActionTypes.INFORME_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        informe: null,
      };
    case ActionTypes.DELETE_INFORME:
      return {
        ...state,
        isLoading: false,
        errMess: action.message,
        informe: null,
      };
    default:
      return state;
  }
};
