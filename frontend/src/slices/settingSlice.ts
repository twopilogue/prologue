import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "../app/store";
import { Layout } from "react-grid-layout";

export interface KeyConfig {
  key: string;
}

export interface ComponentConfig {
  key: string;
  id: string;
}

export interface ComponentCheckConfig {
  [logo: string]: boolean;
  profile: boolean;
  category: boolean;
  page: boolean;
  title: boolean;
  contents: boolean;
}

interface LayoutConfig {
  categoryLayoutList: Layout[];
  categoryList: KeyConfig[];
  categoryCnt: number;

  pageLayoutList: Layout[];
  pageList: KeyConfig[];
  pageCnt: number;

  componentLayoutList: Layout[];
  componentList: ComponentConfig[];

  checkList: ComponentCheckConfig;

  blogSettingInfo: blogInfoConfig;
}

export interface blogInfoConfig {
  siteMetadata: {
    author: {
      name: string;
      summary: string;
    };
    description: string;
    siteUrl: string;
    social: {
      twitter: string;
    };
    title: string;
  };
  profileImg: string;
}

const initialState: LayoutConfig = {
  categoryLayoutList: [],
  categoryList: [],
  categoryCnt: 1,

  pageLayoutList: [],
  pageList: [],
  pageCnt: 1,

  componentLayoutList: [],
  componentList: [
    { key: "블로그 로고", id: "logo" },
    { key: "프로필", id: "profile" },
    { key: "카테고리", id: "category" },
    { key: "페이지", id: "page" },
    { key: "타이틀", id: "title" },
    { key: "글 목록", id: "contents" },
  ],

  checkList: {
    logo: true,
    profile: true,
    category: true,
    page: true,
    title: true,
    contents: true,
  },

  blogSettingInfo: {
    siteMetadata: {
      author: {
        name: "",
        summary: "",
      },
      description: "",
      siteUrl: "",
      social: {
        twitter: "",
      },
      title: "",
    },
    profileImg: "",
  },
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

    setComponentLayoutList: (state, { payload }) => {
      state.componentLayoutList = payload;
    },
    setComponentList: (state, { payload }) => {
      state.componentList = payload;
    },

    setCheckList: (state, { payload: { logo, category, profile, page, title, contents } }) => {
      state.checkList = { logo, category, profile, page, title, contents };
    },
    setBlogSettingInfo: (state, { payload: { siteMetadata, profileImg } }) => {
      state.blogSettingInfo.siteMetadata = siteMetadata;
      state.blogSettingInfo.profileImg = profileImg;
    },
  },
});
export const {
  setCategoryLayoutList,
  setCategoryList,
  setCategoryCnt,
  setPageList,
  setPageCnt,
  setComponentList,
  setComponentLayoutList,
  setCheckList,
  setBlogSettingInfo,
} = settingSlice.actions;

export const selectCategoryLayoutList = (state: rootState) => state.setting.categoryLayoutList;
export const selectCategoryCnt = (state: rootState) => state.setting.categoryCnt;
export const selectCategoryList = (state: rootState) => state.setting.categoryList;

export const selectPageLayoutList = (state: rootState) => state.setting.pageLayoutList;
export const selectPageList = (state: rootState) => state.setting.pageList;
export const selectPageCnt = (state: rootState) => state.setting.pageCnt;

export const selectComponentLayoutList = (state: rootState) => state.setting.componentLayoutList;
export const selectComponentList = (state: rootState) => state.setting.componentList;

export const selectCheckList = (state: rootState) => state.setting.checkList;

export const selectBlogSettingInfo = (state: rootState) => state.setting.blogSettingInfo;

export default settingSlice.reducer;

/*

{ i: "a", x: 0, y: 0, w: 1, h: 2, static: true, isResizable: false },
{ i: "b", x: 1, y: 0, w: 1, h: 2, isResizable: false },
{ i: "c", x: 2, y: 0, w: 1, h: 2, isResizable: false },

{ key: "a" }, { key: "b" }, { key: "c" }

*/
