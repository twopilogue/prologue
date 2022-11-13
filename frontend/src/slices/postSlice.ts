import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "app/store";

interface postConfig {
  title: string;
  description: string;
  category: string;
  tagList: [];
  content: string;
  fileList: [];
}

const initialState: postConfig = {
  title: "",
  description: "",
  category: "",
  tagList: [],
  content: "",
  fileList: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPostTitle: (state, { payload }) => {
      state.title = payload;
    },
    setPostDescription: (state, { payload }) => {
      state.description = payload;
    },
    setPostCategory: (state, { payload }) => {
      state.category = payload;
    },
    setPostTagList: (state, { payload }) => {
      state.tagList = payload;
    },
    setPostContent: (state, { payload }) => {
      state.content = payload;
    },
    setPostFileList: (state, { payload }) => {
      state.fileList = payload;
    },
  },
});
export const { setPostTitle, setPostDescription, setPostCategory, setPostTagList, setPostContent, setPostFileList } =
  postSlice.actions;

export const selectPostTitle = (state: rootState) => state.posts.title;
export const selectPostDescription = (state: rootState) => state.posts.description;
export const selectPostCategory = (state: rootState) => state.posts.category;
export const selectPostTagList = (state: rootState) => state.posts.tagList;
export const selectPostContent = (state: rootState) => state.posts.content;
export const selectPostFileList = (state: rootState) => state.posts.fileList;

export default postSlice.reducer;
