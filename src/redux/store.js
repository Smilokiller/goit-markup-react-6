import { telBookReducers } from "./telBookReducers";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["filter"],
};

const { reducer } = telBookReducers;
const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({ reducer: persistedReducer });
persistStore(store);
export default store;
