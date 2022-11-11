import React, { ChangeEvent, MutableRefObject, useEffect, useState } from "react";
import styles from "../Setting.module.css";

import TitleSetting from "./components/TitleSetting";
import LogoSetting from "./components/LogoSetting";
import PageSetting from "./components/PageSetting";
import CategoryCntSetting from "../CategoryCntSetting";
import { useAppSelector } from "app/hooks";
import { colorsConfig, selectBlogSettingInfo, selectColors, setColors } from "slices/settingSlice";
import { useDispatch } from "react-redux";
import CategorySetting from "./components/CategorySetting";
import ProfileSetting from "./components/ProfileSetting";

export const controlImgRef = (type: MutableRefObject<HTMLInputElement>) => {
  if (!type.current) return;
  type.current.click();
};

export const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, type: string, func: any) => {
  if (!e.target.files) {
    return;
  }
  console.log(e.target.files[0].name);
  switch (type) {
    case "title":
      func(e.target.files[0]);
      break;
    case "logo":
      func(e.target.files[0]);
      break;
  }
};

const DetailSelector = () => {
  const [titleImg, setTitleImg] = useState(null);
  const [logoImg, setLogoImg] = useState(null);
  const colors: colorsConfig = useAppSelector(selectColors);

  useEffect(() => {
    console.log(colors);
  }, []);

  return (
    <div>
      <div className={styles.checkListContainer}>
        <TitleSetting titleImg={titleImg} setTitleImg={setTitleImg} />
        <LogoSetting logoImg={logoImg} setLogoImg={setLogoImg} />
        <CategorySetting />
        <ProfileSetting />
        <PageSetting />
      </div>
    </div>
  );
};

export default DetailSelector;
