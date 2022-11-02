import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "../app/store";
import { Layout } from "react-grid-layout";

interface CategoryConfig {
  key: string;
}

interface LayoutConfig {
  layoutList: Layout[];
  categoryList: CategoryConfig[];
  categoryCnt: number;
}

const initialState: LayoutConfig = {
  layoutList: [
    { i: "a", x: 0, y: 0, w: 1, h: 2, static: true, isResizable: false },
    { i: "b", x: 1, y: 0, w: 1, h: 2, isResizable: false },
    { i: "c", x: 2, y: 0, w: 4, h: 3, isResizable: false },
  ],
  categoryList: [{ key: "a" }, { key: "b" }, { key: "c" }],
  categoryCnt: 4,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setLayoutList: (state, { payload }) => {
      state.layoutList = payload;
    },
    setCategoryList: (state, { payload }) => {
      state.categoryList = payload;
    },
    setCategoryCnt: (state, { payload }) => {
      state.categoryCnt = payload;
    },
  },
});
export const { setLayoutList, setCategoryList, setCategoryCnt } =
  settingSlice.actions;

export const selectLayoutList = (state: rootState) => state.setting.layoutList;
export const selectCategoryCnt = (state: rootState) =>
  state.setting.categoryCnt;
export const selectCategoryList = (state: rootState) =>
  state.setting.categoryList;
export default settingSlice.reducer;
