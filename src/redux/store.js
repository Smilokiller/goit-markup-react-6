import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import telBookReducers from "./reducers/telBookReducers";

const store = createStore(telBookReducers, composeWithDevTools());

export default store;
