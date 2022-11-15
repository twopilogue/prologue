import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authConfig {
  accessToken: string;
  githubId: string;
  githubImage: string;
  login: boolean;
  blogType: null | 0 | 1; // 0:직접 레이아웃 설정, 1: 게시글만 관리
}

interface loginConfig {
  accessToken: string;
  githubId: string;
  githubImage: string;
}

interface authFileConfig {
  authFile: boolean;
}

interface blogTypeConfig {
  blogType: null | 0 | 1;
}

const initialState: authConfig = {
  accessToken: "",
  githubId: "",
  githubImage: "",
  login: false,
  blogType: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<loginConfig>) => {
      state.accessToken = action.payload.accessToken;
      state.githubId = action.payload.githubId;
      state.githubImage = action.payload.githubImage;
      state.login = true;
    },
    logout: (state) => {
      state.githubId = "";
      state.accessToken = "";
      state.githubImage = "";
      state.blogType = null;
      state.login = false;
    },
    blogType: (state, action: PayloadAction<blogTypeConfig>) => {
      state.blogType = action.payload.blogType;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
