import React from "react";
import styles from "./Setting.module.css";
import MyGitInfo from "./MyGitInfo";
import MyInfoInput from "./MyInfoInput";
import MyBlogInfoInput from "./MyBlogInfoInput";
import CategoryLayout from "./CategoryLayout";
import ConfirmButton from "./ConfirmButton";
import CategoryCntSetting from "./CategoryCntSetting";
import PageLayout from "./PageLayout";
import LayoutSelector from "./layout/LayoutSelector";

export const blogTabs = [
  {
    label: "블로그 정보 설정",
    Component: (
      <div>
        <MyGitInfo />
        <div className={styles.hr}></div>
        <MyInfoInput />
        <div className={styles.hr}></div>
        <MyBlogInfoInput />
        <ConfirmButton type="blogSetting" />
      </div>
    ),
  },
  {
    label: "카테고리 설정",
    Component: (
      <div>
        <CategoryLayout />
        <CategoryCntSetting />
        <ConfirmButton type="categorySetting" />
      </div>
    ),
  },
  {
    label: "페이지 설정",
    Component: (
      <div>
        <PageLayout />
        <ConfirmButton type="categorySetting" />
      </div>
    ),
  },
];

export const layoutTabs = [
  {
    label: "레이아웃 선택",
    Component: (
      <div>
        <LayoutSelector />
      </div>
    ),
  },
  {
    label: "세부 레이아웃 설정",
    Component: <div>Hello, I am tab 2</div>,
  },
];
