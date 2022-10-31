import React from "react";
import TabMenu from "../features/setting/TabMenu";
import SideMenu from "features/setting/SideMenu";
import LayoutSelector from "features/setting/LayoutSelector";
import LayoutSample from "features/setting/layout/LayoutSample";

const SettingPage = () => {
  return (
    <>
      <SideMenu />
      <TabMenu />
      <LayoutSelector />
      <LayoutSample />
    </>
  );
};

export default SettingPage;
