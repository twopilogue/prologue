// core
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import authReducer from "../slices/authSlice";
import postReducer from "../slices/postSlice";
import settingReducer from "../slices/settingSlice";
import dashboardReducer from "../slices/dashboardSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "dashboard"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  setting: settingReducer,
  dashboard: dashboardReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type rootState = ReturnType<typeof store.getState>;
