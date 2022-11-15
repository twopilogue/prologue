import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface dashboardConfig {
  monthPosts: [];
  newPost: [];
  buildTime: string;
  repoSize: string;
  totalPost: string;
}

const initialState: dashboardConfig = {
  monthPosts: [],
  newPost: [],
  buildTime: "",
  repoSize: "",
  totalPost: "",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<dashboardConfig>) => {
      state.monthPosts = action.payload.monthPosts;
      state.newPost = action.payload.newPost;
      state.buildTime = action.payload.buildTime;
      state.repoSize = action.payload.repoSize;
      state.totalPost = action.payload.totalPost;
    },
  },
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice.reducer;
