import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "../app/store";
import { Layout } from "react-grid-layout";

export interface CategoryConfig {
  key: string;
}

export interface PageConfig {
  key: string;
}

interface LayoutConfig {
  categoryLayoutList: Layout[];
  categoryList: CategoryConfig[];
  categoryCnt: number;

  pageLayoutList: Layout[];
  pageList: PageConfig[];
  pageCnt: number;
}

const initialState: LayoutConfig = {
  categoryLayoutList: [],
  categoryList: [],
  categoryCnt: 1,

  pageLayoutList: [],
  pageList: [],
  pageCnt: 1,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setCategoryLayoutList: (state, { payload }) => {
      state.categoryLayoutList = payload;
    },
    setCategoryList: (state, { payload }) => {
      state.categoryList = payload;
    },
    setCategoryCnt: (state, { payload }) => {
      state.categoryCnt = payload;
    },

    setPageLayoutList: (state, { payload }) => {
      state.pageLayoutList = payload;
    },
    setPageList: (state, { payload }) => {
      state.pageList = payload;
    },
    setPageCnt: (state, { payload }) => {
      state.pageCnt = payload;
    },
  },
});
export const {
  setCategoryLayoutList,
  setCategoryList,
  setCategoryCnt,
  setPageList,
  setPageCnt,
} = settingSlice.actions;

export const selectCategoryLayoutList = (state: rootState) =>
  state.setting.categoryLayoutList;
export const selectCategoryCnt = (state: rootState) =>
  state.setting.categoryCnt;
export const selectCategoryList = (state: rootState) =>
  state.setting.categoryList;

export const selectPageLayoutList = (state: rootState) =>
  state.setting.pageLayoutList;
export const selectPageList = (state: rootState) => state.setting.pageList;
export const selectPageCnt = (state: rootState) => state.setting.pageCnt;

export default settingSlice.reducer;

/*

{ i: "a", x: 0, y: 0, w: 1, h: 2, static: true, isResizable: false },
{ i: "b", x: 1, y: 0, w: 1, h: 2, isResizable: false },
{ i: "c", x: 2, y: 0, w: 1, h: 2, isResizable: false },

{ key: "a" }, { key: "b" }, { key: "c" }

*/
