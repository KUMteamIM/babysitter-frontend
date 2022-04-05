import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { appReducer } from "./reducers";
const thunkMiddleware = require("redux-thunk").default;

export const store = createStore(
  appReducer,
  {},
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
