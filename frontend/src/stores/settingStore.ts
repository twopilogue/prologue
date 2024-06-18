import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  KeyConfig,
  MyBlogInfoConfig,
  MyInfoConfig,
  EditListConfig,
  ComponentCheckConfig,
  ComponentConfig,
  ColorsConfig,
} from "interfaces/setting.interface";
import { Layout } from "react-grid-layout";

interface State {
  // info
  myInfo: MyInfoConfig;
  myBlogInfo: MyBlogInfoConfig;
  // category
  categoryLayoutList: Layout[];
  categoryList: KeyConfig[];
  categoryCnt: number;
  isEditCategory: EditListConfig[];
  // layout
  compLayoutList: Layout[];
  compList: ComponentConfig[];

  // user layout
  userCompLayoutList: Layout[];
  userCompList: ComponentConfig[];
  userCompCheck: ComponentCheckConfig;

  colorList: ColorsConfig;

  clickedLayoutIdx: number;
  clickedComp: string;
  componentCreated: boolean;
}

interface Action {
  actions: {
    setMyInfoAction: (myInfo: MyInfoConfig) => void;
    setMyBlogInfoAction: (myBlogInfo: MyBlogInfoConfig) => void;

    setCategoryLayoutListAction: (categoryLayoutList: Layout[]) => void;
    setCategoryListAction: (categoryList: KeyConfig[]) => void;
    setCategoryCntAction: (categoryCnt: number) => void;
    setIsEditCategoryAction: (isEditCategory: EditListConfig[]) => void;

    setCompLayoutList: (compLayoutList: Layout[]) => void;
    setCompList: (compList: ComponentConfig[]) => void;

    setUserCompLayoutListAction: (userCompLayoutList: Layout[]) => void;
    setUserCompListAction: (userCompList: ComponentConfig[]) => void;
    setUserCompCheckAction: (userCompCheck: ComponentCheckConfig) => void;

    setColorListAction: (colors: ColorsConfig) => void;
    setClickedLayoutIdxAction: (clickedLayoutIdx: number) => void;
    setClickedCompAction: (clickedComp: string) => void;
  };
}

export const initialState: State = {
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

  compLayoutList: [],
  compList: [
    { key: "블로그 로고", id: "logo" },
    { key: "프로필", id: "profile" },
    { key: "카테고리", id: "category" },
    { key: "페이지", id: "page" },
    { key: "타이틀", id: "title" },
    { key: "글 목록", id: "contents" },
  ],

  userCompLayoutList: [],
  userCompList: [],
  userCompCheck: {
    logo: true,
    profile: true,
    category: true,
    page: true,
    title: true,
    contents: true,
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

  clickedLayoutIdx: 0,
  clickedComp: "",
  componentCreated: false,
};

export const useSettingStore = create<State & Action>()(
  immer((set) => ({
    ...initialState,
    actions: {
      setMyInfoAction: (myInfo: MyInfoConfig) => set(() => ({ myInfo })),
      setMyBlogInfoAction: (myBlogInfo: MyBlogInfoConfig) => set(() => ({ myBlogInfo })),

      setCategoryLayoutListAction: (categoryLayoutList: Layout[]) => set(() => ({ categoryLayoutList })),
      setCategoryListAction: (categoryList: KeyConfig[]) => set(() => ({ categoryList })),
      setCategoryCntAction: (categoryCnt: number) => set(() => ({ categoryCnt })),
      setIsEditCategoryAction: (isEditCategory: EditListConfig[]) => set(() => ({ isEditCategory })),

      setCompLayoutList: (compLayoutList: Layout[]) => set(() => ({ compLayoutList })),
      setCompList: (compList: ComponentConfig[]) => set(() => ({ compList })),

      setUserCompLayoutListAction: (userCompLayoutList: Layout[]) => set(() => ({ userCompLayoutList })),
      setUserCompListAction: (userCompList: ComponentConfig[]) => set(() => ({ userCompList })),
      setUserCompCheckAction: (userCompCheck: ComponentCheckConfig) => set(() => ({ userCompCheck })),

      setColorListAction: (colorList: ColorsConfig) => set(() => ({ colorList })),
      setClickedLayoutIdxAction: (clickedLayoutIdx: number) => set(() => ({ clickedLayoutIdx })),
      setClickedCompAction: (clickedComp: string) => set(() => ({ clickedComp })),
      setComponentCreatedAction: (componentCreated: boolean) => set(() => ({ componentCreated })),
    },
  })),
);

export const useSettingActions = () => useSettingStore((state) => state.actions);
