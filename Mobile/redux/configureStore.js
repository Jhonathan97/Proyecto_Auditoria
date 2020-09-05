import { createStore, combineReducers, applyMiddleware } from "redux";
import { auth } from "./auth";
import { auditorias } from "./auditorias";
import { userRegister } from "./userRegister";
import { informe } from "./informe";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const configureStore = () => {
  const store = createStore(
    combineReducers({
      auth,
      auditorias,
      userRegister,
      informe,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
