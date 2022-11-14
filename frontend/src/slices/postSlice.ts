import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "app/store";

export interface postListConfig {
  title: string;
  date: string;
  description: string;
  category: string;
  tag: [];
  directory: string;
  imgUrl: string;
}

interface postConfig {
  title: string;
  description: string;
  category: string;
  tagList: [];
  content: string;
  fileNameList: [];
  fileList: [];
  postList: postListConfig[];
  postCount: number;
}

const initialState: postConfig = {
  title: "",
  description: "",
  category: "",
  tagList: [],
  content: "",
  fileNameList: [],
  fileList: [],

  postList: [],
  postCount: 0,
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
    setPostFileNameList: (state, { payload }) => {
      state.fileNameList = payload;
    },
    setPostFileList: (state, { payload }) => {
      state.fileList = payload;
    },
    setPostList: (state, { payload }) => {
      state.postList = payload;
    },
    setPostCount: (state, { payload }) => {
      state.postCount = payload;
    },
  },
});
export const {
  setPostTitle,
  setPostDescription,
  setPostCategory,
  setPostTagList,
  setPostContent,
  setPostFileNameList,
  setPostFileList,
  setPostList,
} = postSlice.actions;

export const selectPostTitle = (state: rootState) => state.posts.title;
export const selectPostDescription = (state: rootState) => state.posts.description;
export const selectPostCategory = (state: rootState) => state.posts.category;
export const selectPostTagList = (state: rootState) => state.posts.tagList;
export const selectPostContent = (state: rootState) => state.posts.content;
export const selectPostFileNameList = (state: rootState) => state.posts.fileNameList;
export const selectPostFileList = (state: rootState) => state.posts.fileList;
export const selectPostList = (state: rootState) => state.posts.postList;
export const selectPostCount = (state: rootState) => state.posts.postCount;

export default postSlice.reducer;
