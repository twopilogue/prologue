import React from "react";

import DetailSettingPage from "pages/DetailSettingPage";
import MyInfoPage from "pages/MyInfoPage";
import CategoryPage from "pages/CategoryPage";
import PageSettingPage from "pages/PageSettingPage";
import LayoutSettingPage from "pages/LayoutSettingPage";

export const blogTabs = [
  {
    label: "블로그 정보 설정",
    Component: (
      <div>
        <MyInfoPage />
      </div>
    ),
  },
  {
    label: "카테고리 설정",
    Component: (
      <div>
        <CategoryPage />
      </div>
    ),
  },
  {
    label: "페이지 설정",
    Component: (
      <div>
        <PageSettingPage />
      </div>
    ),
  },
];

export const nonUserBlogTabs = [
  {
    label: "블로그 정보 설정",
    Component: (
      <div>
        <MyInfoPage />
      </div>
    ),
  },
];

export const layoutTabs = [
  {
    label: "레이아웃 선택",
    Component: (
      <div>
        <LayoutSettingPage />
      </div>
    ),
  },
  {
    label: "세부 레이아웃 설정",
    Component: (
      <div>
        <DetailSettingPage />
      </div>
    ),
  },
];
