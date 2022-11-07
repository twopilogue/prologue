// core
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import postReducer from "../slices/postSlice";
import settingReducer from "../slices/settingSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  setting: settingReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type rootState = ReturnType<typeof store.getState>;