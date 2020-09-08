import * as ActionTypes from "./ActionType";
import { baseUrl } from "../shared/baseUrl";

export const requestLogin = (creds) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    creds,
  };
};

export const receiveLogin = (response) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    token: response.token,
  };
};

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message,
  };
};

export const loginUser = (creds) => (dispatch) => {
  dispatch(requestLogin(creds));

  return fetch(baseUrl + "users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  })
    .then(
      (response) => {
        if (response.ok || response.status === 401) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        // If login was successful, set the token in local storage
        localStorage.setItem("token", response.token);
        localStorage.setItem("creds", JSON.stringify(creds));
        // Dispatch the success action
        dispatch(receiveLogin(response));
      } else {
        var error = new Error(response.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => dispatch(loginError(error.message)));
};

//  metodo para hacer envio de datos al servidor utilizando redux
export const sendReport = (dataClient) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");
  return fetch(baseUrl + "informes/auditoria/sendReport", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": bearer
    },
    body: JSON.stringify(dataClient),
    credentials: "same-origin"
  }).catch((error) => dispatch(sendReportError(error.message)));
};

export const sendReportError = (message) => {
  return {
    type: ActionTypes.USER_REGISTER_FAILED,
    message,
  };
};

export const registerUser = (usuario) => (dispatch) => {
  return fetch(baseUrl + "users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  })
    .then(
      (response) => {
        if (response.ok || response.status === 412) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        dispatch(userRegisterSuccess());
      } else {
        var error = new Error(response.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => dispatch(userRegisterError(error.message)));
};

export const userRegisterSuccess = () => ({
  type: ActionTypes.USER_REGISTER_SUCCESS,
});

export const userRegisterError = (message) => {
  return {
    type: ActionTypes.USER_REGISTER_FAILED,
    message,
  };
};

export const loginUserGoogle = () => (dispatch) => {
  return fetch(baseUrl + "users/auth/google", {
    credentials: "same-origin",
  })
    .then(
      (response) => {
        console.log(response);
      },
      (error) => {
        throw error;
      }
    )
    .catch((error) => dispatch(loginError(error.message)));
};

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST,
  };
};

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  };
};

// Logs the user out
export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  localStorage.removeItem("token");
  localStorage.removeItem("creds");
  dispatch(receiveLogout());
};

export const fetchAuditorias = () => (dispatch) => {
  dispatch(auditoriasLoading(true));

  const bearer = "Bearer " + localStorage.getItem("token");
  return fetch(baseUrl + "auditorias", {
    headers: {
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((auditorias) => dispatch(consultarAuditorias(auditorias)))
    .catch((error) => dispatch(auditoriasFailed(error.message)));
};

export const postAuditoria = (auditoria) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "auditorias", {
    method: "POST",
    body: JSON.stringify(auditoria),
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((auditoria) => {
      dispatch(addAuditoria(auditoria));
    })
    .catch((error) =>
      alert("La auditoría no pudo ser creada\nError: " + error.message)
    );
};

export const eliminarAuditoria = (auditoriaId) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "auditorias/" + auditoriaId, {
    method: "DELETE",
    headers: {
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((auditoria) => dispatch(deleteAuditoria(auditoria)))
    .catch((error) =>
      alert("La auditoría no pudo ser eliminar\nError: " + error.message)
    );
};

export const actualizarAuditoria = (auditoriaId, auditoria) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "auditorias/" + auditoriaId, {
    method: "PUT",
    body: JSON.stringify(auditoria),
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((auditoria) => dispatch(updateAuditoria(auditoria)))
    .catch((error) =>
      alert("La auditoría no pudo ser actualizada\nError: " + error.message)
    );
};

export const auditoriasLoading = () => ({
  type: ActionTypes.AUDITORIAS_LOADING,
});

export const auditoriasFailed = (errmess) => ({
  type: ActionTypes.AUDITORIAS_FAILED,
  payload: errmess,
});

export const consultarAuditorias = (auditorias) => ({
  type: ActionTypes.CONSULTAR_AUDITORIAS,
  payload: auditorias,
});

export const addAuditoria = (auditoria) => ({
  type: ActionTypes.ADD_AUDITORIA,
  payload: auditoria,
});

export const deleteAuditoria = (auditoria) => ({
  type: ActionTypes.DELETE_AUDITORIA,
  payload: auditoria,
});

export const updateAuditoria = (auditoria) => ({
  type: ActionTypes.UPDATE_AUDITORIA,
  payload: auditoria,
});

export const fetchInforme = (auditoriaId) => (dispatch) => {
  dispatch(informeLoading(true));

  const bearer = "Bearer " + localStorage.getItem("token");
  return fetch(baseUrl + "informes/" + auditoriaId, {
    headers: {
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok || response.status === 404) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        dispatch(consultarInforme(response.informe));
      } else {
        var error = new Error(response.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => dispatch(informeFailed(error.message)));
};

export const postInforme = (auditoriaId, informe) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");
  return fetch(baseUrl + "informes/" + auditoriaId, {
    method: "POST",
    body: JSON.stringify(informe),
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.status === 201 || response.status === 412) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        dispatch(consultarInforme(response.informe));
      } else {
        var error = new Error(response.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => dispatch(informeFailed(error.message)));
};

export const eliminarInforme = (auditoriaId) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");
  return fetch(baseUrl + "informes/" + auditoriaId, {
    method: "DELETE",
    headers: {
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok || response.status === 404) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        dispatch(deleteInforme("El informe fue eliminado exitosamente!"));
      } else {
        var error = new Error(response.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => dispatch(informeFailed(error.message)));
};

export const postItem = (auditoriaId, item) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");
  return fetch(baseUrl + "informes/" + auditoriaId + "/items", {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.status === 201 || response.status === 412) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        dispatch(consultarInforme(response.informe));
      } else {
        var error = new Error(response.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => dispatch(informeFailed(error.message)));
};

export const editarItem = (auditoriaId, item, itemId) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");
  return fetch(baseUrl + "informes/" + auditoriaId + "/items/" + itemId, {
    method: "PUT",
    body: JSON.stringify(item),
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok || response.status === 404) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        dispatch(consultarInforme(response.informe));
      } else {
        var error = new Error(response.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => dispatch(informeFailed(error.message)));
};

export const deleteInforme = (message) => ({
  type: ActionTypes.DELETE_INFORME,
  message,
});

export const informeLoading = () => ({
  type: ActionTypes.INFORME_LOADING,
});

export const informeFailed = (errmess) => ({
  type: ActionTypes.INFORME_FAILED,
  payload: errmess,
});

export const consultarInforme = (informe) => ({
  type: ActionTypes.CONSULTAR_INFORME,
  payload: informe,
});
