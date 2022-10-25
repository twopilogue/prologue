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

export default rootReducer;

export type rootState = ReturnType<typeof rootReducer>;
