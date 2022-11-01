import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "../app/store";
import { Layouts } from "react-grid-layout";

const initialState: Layouts = {
  layoutList: [
    { i: "a", x: 0, y: 0, w: 1, h: 2, static: true, isResizable: false },
    { i: "b", x: 1, y: 0, w: 1, h: 2, isResizable: false },
    { i: "c", x: 2, y: 0, w: 4, h: 3, isResizable: false },
  ],
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
