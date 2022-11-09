import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "app/store";

interface postConfig {
  title: string;
  category: string;
  tag: [];
  contents: string;
}

const initialState: postConfig = {
  title: "",
  category: "",
  tag: [],
  contents: "",
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPostTitle: (state, { payload }) => {
      state.title = payload;
    },
    setPostCategory: (state, { payload }) => {
      state.category = payload;
    },
    setPostTag: (state, { payload }) => {
      state.tag = payload;
    },
    setPostContents: (state, { payload }) => {
      state.contents = payload;
    },
  },
});
export const { setPostTitle, setPostCategory, setPostTag, setPostContents } = postSlice.actions;

export const selectPostTitle = (state: rootState) => state.posts.title;
export const selectPostCategory = (state: rootState) => state.posts.tag;
export const selectPostTag = (state: rootState) => state.posts.tag;
export const selectPostContents = (state: rootState) => state.posts.contents;

export default postSlice.reducer;
