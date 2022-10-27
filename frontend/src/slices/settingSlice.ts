import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "../app/store";

interface layoutConfig {
  layout: {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

const initialState: layoutConfig = {
  layout: {
    i: "",
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  },
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setLayout: (state, { payload }) => {
      state.layout = payload;
    },
  },
});

export const { setLayout } = settingSlice.actions;

export const selectLayout = (state: rootState) => state.setting.layout;
export default settingSlice.reducer;
