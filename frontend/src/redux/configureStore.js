import { createStore, combineReducers, applyMiddleware } from "redux";
import { Auth } from "./auth";
import { Auditorias } from "./auditorias";
import { UserRegister } from "./userRegister";
import { Informe } from "./informe";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const configureStore = () => {
  const store = createStore(
    combineReducers({
      auth: Auth,
      auditorias: Auditorias,
      userRegister: UserRegister,
      informe: Informe,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
