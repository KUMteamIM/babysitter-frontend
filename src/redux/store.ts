import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { appReducer } from "./reducers";
const thunkMiddleware = require("redux-thunk").default;

export const store = createStore(
  appReducer,
  { currentUser: null },
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
