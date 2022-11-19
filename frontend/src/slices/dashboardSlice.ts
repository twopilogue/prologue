import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface dashboardConfig {
  monthPosts: [];
  newPosts: { directory: string; title: string; date: string }[];
  buildTime: string;
  repoSize: number;
  totalPost: string;
}

interface monthPostsConfig {
  monthPosts: [];
}

interface newPostsConfig {
  newPosts: { directory: string; title: string; date: string }[];
}

interface blogInfoConfig {
  totalPost: string;
  repoSize: string;
}

interface buildTimeConfig {
  buildTime: string;
}

const initialState: dashboardConfig = {
  monthPosts: [],
  newPosts: [],
  buildTime: "",
  repoSize: 0,
  totalPost: "",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    total: (state, action: PayloadAction<dashboardConfig>) => {
      state.monthPosts = action.payload.monthPosts;
      state.newPosts = action.payload.newPosts;
      state.buildTime = action.payload.buildTime;
      state.repoSize = action.payload.repoSize;
      state.totalPost = action.payload.totalPost;
    },
    monthPosts: (state, action: PayloadAction<monthPostsConfig>) => {
      state.monthPosts = action.payload.monthPosts;
    },
    newPosts: (state, action: PayloadAction<newPostsConfig>) => {
      state.newPosts = action.payload.newPosts;
    },
    blogInfo: (state, action: PayloadAction<blogInfoConfig>) => {
      state.totalPost = action.payload.totalPost;
      state.repoSize = Number(action.payload.repoSize);
    },
    buildTime: (state, action: PayloadAction<buildTimeConfig>) => {
      state.buildTime = action.payload.buildTime;
    },
  },
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice.reducer;
