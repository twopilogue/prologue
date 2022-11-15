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

interface editListConfig {
  title: string;
  description: string;
  category: string;
  tag: [];
}

interface postConfig {
  title: string;
  description: string;
  category: string;
  tagList: [];
  content: string;
  fileList: any[];
  files: [];

  postList: postListConfig[];
  postCount: number;

  editList: editListConfig;
}

const initialState: postConfig = {
  title: "",
  description: "",
  category: "",
  tagList: [],
  content: "",
  fileList: [],
  files: [],

  postList: [],
  postCount: 0,

  editList: {
    title: "",
    description: "",
    category: "",
    tag: [],
  },
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
    setPostFiles: (state, { payload }) => {
      state.files = payload;
    },
    setPostList: (state, { payload }) => {
      state.postList = payload;
    },
    setPostCount: (state, { payload }) => {
      state.postCount = payload;
    },
    setPostEditList: (state, { payload }) => {
      state.editList = payload;
    },
  },
});
export const {
  setPostTitle,
  setPostDescription,
  setPostCategory,
  setPostTagList,
  setPostContent,
  setPostFileList,
  setPostFiles,
  setPostList,
  setPostCount,
  setPostEditList,
} = postSlice.actions;

export const selectPostTitle = (state: rootState) => state.posts.title;
export const selectPostDescription = (state: rootState) => state.posts.description;
export const selectPostCategory = (state: rootState) => state.posts.category;
export const selectPostTagList = (state: rootState) => state.posts.tagList;
export const selectPostContent = (state: rootState) => state.posts.content;
export const selectPostFileList = (state: rootState) => state.posts.fileList;
export const selectPostFiles = (state: rootState) => state.posts.files;
export const selectPostList = (state: rootState) => state.posts.postList;
export const selectPostCount = (state: rootState) => state.posts.postCount;
export const selectPostEditList = (state: rootState) => state.posts.editList;

export default postSlice.reducer;
