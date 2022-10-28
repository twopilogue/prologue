// core
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import postReducer from "../slices/postSlice";
import settingReducer from "../slices/settingSlice";

const rootReducer = combineReducers({
  posts: postReducer,
  setting: settingReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type rootState = ReturnType<typeof store.getState>;
