// core
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import postReducer from "../slices/postSlice";

const rootReducer = combineReducers({
  posts: postReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type rootState = ReturnType<typeof rootReducer>;
