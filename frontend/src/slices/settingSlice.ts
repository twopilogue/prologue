import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "../app/store";

export interface layoutConfig {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface layoutListConfig {
  layoutList: layoutConfig[];
}

const initialState: layoutListConfig = {
  layoutList: [],
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setLayoutList: (state, { payload }) => {
      state.layoutList = payload;
    },
  },
});

export const { setLayoutList } = settingSlice.actions;

export const selectLayoutList = (state: rootState) => state.setting.layoutList;
export default settingSlice.reducer;
