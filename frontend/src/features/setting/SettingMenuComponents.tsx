import DetailSettingPage from "pages/setting/DetailSettingPage";
import MyInfoPage from "pages/setting/MyInfoPage";
import CategoryPage from "pages/setting/CategoryPage";
// import PageSettingPage from "pages/post/PageSettingPage"; // 임의 삭제
import LayoutSettingPage from "pages/setting/LayoutSettingPage";

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
  // 임의 삭제
  // {
  //   label: "페이지 설정",
  //   Component: (
  //     <div>
  //       <PageSettingPage />
  //     </div>
  //   ),
  // },
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
