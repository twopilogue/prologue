import React, { ChangeEvent, MutableRefObject, useEffect, useState } from "react";
import styles from "../Setting.module.css";

import TitleSetting from "./components/TitleSetting";
import LogoSetting from "./components/LogoSetting";
import PageSetting from "./components/PageSetting";
import CategoryCntSetting from "../category/CategoryCntSetting";
import { useAppSelector } from "app/hooks";
import { colorsConfig, selectBlogSettingInfo, selectClickedComp, selectColors, setColors } from "slices/settingSlice";
import { useDispatch } from "react-redux";
import CategorySetting from "./components/CategorySetting";
import ProfileSetting from "./components/ProfileSetting";
import ContentsSetting from "./components/ContentsSetting";

export const controlImgRef = (type: MutableRefObject<HTMLInputElement>) => {
  if (!type.current) return;
  type.current.click();
};

const DetailSelector = () => {
  const [titleImg, setTitleImg] = useState(null);
  const [logoImg, setLogoImg] = useState(null);
  const [logoType, setLogoType] = useState("logoText");
  const clicked: string = useAppSelector(selectClickedComp);
  const components: any = {
    profile: <ProfileSetting />,
    page: <PageSetting />,
    title: <TitleSetting titleImg={titleImg} setTitleImg={setTitleImg} />,
    category: <CategorySetting />,
    logo: <LogoSetting logoImg={logoImg} setLogoImg={setLogoImg} logoType={logoType} setLogoType={setLogoType} />,
    contents: <ContentsSetting />,
  };

  return (
    <div>
      <div className={styles.checkListContainer}>{components[clicked]}</div>
    </div>
  );
};

export default DetailSelector;
