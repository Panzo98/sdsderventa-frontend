import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { allReducers } from "./reducers";
const finalReducer = combineReducers(allReducers);

const composeEnhancers = composeWithDevTools({});
const store = createStore(
  finalReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
