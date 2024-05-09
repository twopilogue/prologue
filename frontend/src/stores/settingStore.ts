import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { KeyConfig, MyBlogInfoConfig, MyInfoConfig, EditListConfig } from "interfaces/setting.interface";
import { Layout } from "react-grid-layout";
import { ComponentConfig } from "slices/settingSlice";

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
  componentLayoutList: Layout[];
  componentList: ComponentConfig[];
}

interface Action {
  actions: {
    setMyInfoAction: (myInfo: MyInfoConfig) => void;
    setMyBlogInfoAction: (myBlogInfo: MyBlogInfoConfig) => void;

    setCategoryLayoutListAction: (categoryLayoutList: Layout[]) => void;
    setCategoryListAction: (categoryList: KeyConfig[]) => void;
    setCategoryCntAction: (categoryCnt: number) => void;
    setIsEditCategoryAction: (isEditCategory: EditListConfig[]) => void;

    setComponentLayoutList: (componentLayoutList: Layout[]) => void;
    setComponentList: (componentList: ComponentConfig[]) => void;
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

  componentLayoutList: [],
  componentList: [
    { key: "블로그 로고", id: "logo" },
    { key: "프로필", id: "profile" },
    { key: "카테고리", id: "category" },
    { key: "페이지", id: "page" },
    { key: "타이틀", id: "title" },
    { key: "글 목록", id: "contents" },
  ],
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

      setComponentLayoutList: (componentLayoutList: Layout[]) => set(() => ({ componentLayoutList })),
      setComponentList: (componentList: ComponentConfig[]) => set(() => ({ componentList })),
    },
  })),
);

export const useSettingActions = () => useSettingStore((state) => state.actions);
