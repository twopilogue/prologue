import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "../app/store";
import { Layout } from "react-grid-layout";

export interface myInfoProps {
  nickName: string;
  summary: string;
  profileImg: string | FormData;
}

export interface myBlogInfoProps {
  title: string;
  description: string;
  social: object;
}

export interface KeyConfig {
  key: string;
  id: number;
}

export interface PageConfig {
  id: number;
  label: string;
  posts: boolean;
  type: string;
  oldName?: string;
}

export interface ComponentConfig {
  key: string;
  id: string;
}

export interface editList {
  key: string;
  id: number;
  editable: boolean;
}

export interface ComponentCheckConfig {
  [logo: string]: boolean;
  profile?: boolean;
  category?: boolean;
  page?: boolean;
  title?: boolean;
  contents: boolean;
}

export interface blogInfoConfig {
  nickName: string;
  summary: string;
  profileImg: string | FormData;
  title: string;
  description: string;
  social: object;
}

export interface colorsConfig {
  title: {
    background: string;
    text: string;
    titleHeight: number;
    type: boolean; // 이미지 or 색
    titleText: string;
  };
  category: {
    background: string;
    text: string;
  };
  page: {
    background: string;
    text: string;
    sort: string;
  };
  profile: {
    background: string;
    text: string;
  };
  contents: {
    background: string;
    text: string;
  };
  logo: {
    background: string;
    text: string;
    logoText: string;
  };
}

interface LayoutConfig {
  myInfo: myInfoProps;
  myBlogInfo: myBlogInfoProps;

  categoryLayoutList: Layout[];
  categoryList: KeyConfig[];
  categoryCnt: number;
  isEditCategory: editList[];

  pageLayoutList: Layout[];
  pageList: PageConfig[];
  pageCnt: number;
  pageDeleList: PageConfig[];
  isEditPage: editList[];

  componentLayoutList: Layout[];
  componentList: ComponentConfig[];

  userComponentLayoutList: Layout[];
  userComponentList: ComponentConfig[];
  userCheckList: ComponentCheckConfig;

  origin: {
    originComponentLayoutList: Layout[];
    originComponentList: ComponentConfig[];
    originCheckList: ComponentCheckConfig;
  };

  checkList: ComponentCheckConfig;

  blogSettingInfo: blogInfoConfig;

  colorList: colorsConfig;

  clickedComp: string;
  clickedLayoutIdx: number;
  componentCreated: boolean;
}

export const initialState: LayoutConfig = {
  myInfo: {
    nickName: "",
    summary: "",
    profileImg: null,
  },
  myBlogInfo: {
    title: "",
    description: "",
    social: {},
  },

  categoryLayoutList: [],
  categoryList: [],
  categoryCnt: 1,
  isEditCategory: [],

  pageLayoutList: [],
  pageList: [],
  pageCnt: 1,
  pageDeleList: [],
  isEditPage: [],

  componentLayoutList: [],
  componentList: [
    { key: "블로그 로고", id: "logo" },
    { key: "프로필", id: "profile" },
    { key: "카테고리", id: "category" },
    { key: "페이지", id: "page" },
    { key: "타이틀", id: "title" },
    { key: "글 목록", id: "contents" },
  ],

  userComponentLayoutList: [],
  userComponentList: [],
  userCheckList: {
    logo: true,
    profile: true,
    category: true,
    page: true,
    title: true,
    contents: true,
  },

  origin: {
    originComponentLayoutList: [],
    originComponentList: [],
    originCheckList: {
      logo: true,
      profile: true,
      category: true,
      page: true,
      title: true,
      contents: true,
    },
  },

  checkList: {
    logo: true,
    profile: true,
    category: true,
    page: true,
    title: true,
    contents: true,
  },

  blogSettingInfo: {
    nickName: "",
    summary: "",
    profileImg: "",
    title: "",
    description: "",
    social: {},
  },

  colorList: {
    title: {
      background: "",
      text: "",
      titleHeight: 0,
      type: true,
      titleText: "",
    },
    category: {
      background: "",
      text: "",
    },
    page: {
      background: "",
      text: "",
      sort: "",
    },
    profile: {
      background: "",
      text: "",
    },
    contents: {
      background: "",
      text: "",
    },
    logo: {
      background: "",
      text: "",
      logoText: "",
    },
  },

  clickedComp: "logo",
  clickedLayoutIdx: 0,
  componentCreated: false,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setMyInfo: (state, { payload: { nickName, summary, profileImg } }) => {
      state.myInfo.nickName = nickName;
      state.myInfo.summary = summary;
      state.myInfo.profileImg = profileImg;
    },
    setMyBlogInfo: (state, { payload: { title, description, social } }) => {
      state.myBlogInfo.title = title;
      state.myBlogInfo.description = description;
      state.myBlogInfo.social = social;
    },

    setCategoryLayoutList: (state, { payload }) => {
      state.categoryLayoutList = payload;
    },
    setCategoryList: (state, { payload }) => {
      state.categoryList = payload;
    },
    setCategoryCnt: (state, { payload }) => {
      state.categoryCnt = payload;
    },
    setIsEditCategory: (state, { payload }) => {
      state.isEditCategory = payload;
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
    setPageDeleList: (state, { payload }) => {
      state.pageDeleList = payload;
    },
    setIsEditPage: (state, { payload }) => {
      state.isEditPage = payload;
    },

    setComponentLayoutList: (state, { payload }) => {
      state.componentLayoutList = payload;
    },
    setComponentList: (state, { payload }) => {
      state.componentList = payload;
    },

    setUserComponentLayoutList: (state, { payload }) => {
      state.userComponentLayoutList = payload;
    },

    setUserComponentList: (state, { payload }) => {
      state.userComponentList = payload;
    },

    setUserCheckList: (state, { payload }) => {
      state.userCheckList = payload;
    },

    setOrigin: (state, { payload }) => {
      state.origin = payload;
    },
    setCheckList: (state, { payload: { logo, category, profile, page, title, contents } }) => {
      state.checkList = { logo, category, profile, page, title, contents };
    },
    setBlogSettingInfo: (state, { payload }) => {
      state.blogSettingInfo = payload;
    },
    setColors: (state, { payload }) => {
      state.colorList = payload;
    },
    setClickedComp: (state, { payload }) => {
      state.clickedComp = payload;
    },
    setClickedLayoutIdx: (state, { payload }) => {
      state.clickedLayoutIdx = payload;
    },
    setComponentCreated: (state, { payload }) => {
      state.componentCreated = payload;
    },
  },
});
export const {
  setMyInfo,
  setMyBlogInfo,
  setCategoryLayoutList,
  setCategoryList,
  setCategoryCnt,
  setIsEditCategory,
  setPageLayoutList,
  setPageList,
  setPageCnt,
  setPageDeleList,
  setIsEditPage,
  setComponentList,
  setComponentLayoutList,
  setUserComponentLayoutList,
  setOrigin,
  setUserComponentList,
  setUserCheckList,
  setCheckList,
  setBlogSettingInfo,
  setColors,
  setClickedComp,
  setClickedLayoutIdx,
  setComponentCreated,
} = settingSlice.actions;

export const selectMyInfo = (state: rootState) => state.setting.myInfo;
export const selectMyBlogInfo = (state: rootState) => state.setting.myBlogInfo;

export const selectCategoryLayoutList = (state: rootState) => state.setting.categoryLayoutList;
export const selectCategoryCnt = (state: rootState) => state.setting.categoryCnt;
export const selectCategoryList = (state: rootState) => state.setting.categoryList;
export const selectIsEditCategory = (state: rootState) => state.setting.isEditCategory;

export const selectPageLayoutList = (state: rootState) => state.setting.pageLayoutList;
export const selectPageList = (state: rootState) => state.setting.pageList;
export const selectPageCnt = (state: rootState) => state.setting.pageCnt;
export const selectPageDeleList = (state: rootState) => state.setting.pageDeleList;
export const selectIsEditPage = (state: rootState) => state.setting.isEditPage;

export const selectComponentLayoutList = (state: rootState) => state.setting.componentLayoutList;
export const selectComponentList = (state: rootState) => state.setting.componentList;

export const selectUserComponentLayoutList = (state: rootState) => state.setting.userComponentLayoutList;
export const selectOrigin = (state: rootState) => state.setting.origin;
export const selectUserComponentList = (state: rootState) => state.setting.userComponentList;
export const selectUserCheckList = (state: rootState) => state.setting.userCheckList;

export const selectCheckList = (state: rootState) => state.setting.checkList;

export const selectBlogSettingInfo = (state: rootState) => state.setting.blogSettingInfo;

export const selectColors = (state: rootState) => state.setting.colorList;

export const selectClickedComp = (state: rootState) => state.setting.clickedComp;
export const selectClickedLayoutIdx = (state: rootState) => state.setting.clickedLayoutIdx;
export const selectComponentCreated = (state: rootState) => state.setting.componentCreated;

export default settingSlice.reducer;

/* 배경색 기준 텍스트 컬러 설정 */
export const getTextColor = (hexColor: string) => {
  const color = hexColor.slice(1); // # 제거
  const rgb = parseInt(color, 16); // 10진수 변환
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luma < 127.5 ? "#ffffff" : "#000000";
};
