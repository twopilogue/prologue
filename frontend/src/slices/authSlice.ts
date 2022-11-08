import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authConfig {
  accessToken: string;
  githubId: string;
  githubImage: string;
  auth: boolean;
}

const initialState: authConfig = {
  accessToken: "",
  githubId: "",
  githubImage: "",
  auth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<authConfig>) => {
      state.accessToken = action.payload.accessToken;
      state.githubId = action.payload.githubId;
      state.githubImage = action.payload.githubImage;
      state.auth = true;
    },
    logout: (state) => {
      state.githubId = "";
      state.accessToken = "";
      state.auth = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
