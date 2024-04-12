import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";
import styles from "../Setting.module.css";
import TitleSetting from "./components/TitleSetting";
import LogoSetting from "./components/LogoSetting";
import PageSetting from "./components/PageSetting";
import { useAppSelector } from "app/hooks";
import { selectClickedComp } from "slices/settingSlice";
import CategorySetting from "./components/CategorySetting";
import ProfileSetting from "./components/ProfileSetting";
import ContentsSetting from "./components/ContentsSetting";

export const controlImgRef = (type: MutableRefObject<HTMLInputElement>) => {
  if (!type.current) return;
  type.current.click();
};

interface Props {
  logoImg: File;
  setLogoImg: Dispatch<SetStateAction<File>>;
  titleImg: File;
  setTitleImg: Dispatch<SetStateAction<File>>;
}

interface ComponentConfig {
  [key: string]: JSX.Element;
}

const DetailSelector = ({ logoImg, titleImg, setLogoImg, setTitleImg }: Props) => {
  const [logoType, setLogoType] = useState("logoText");
  const clicked: string = useAppSelector(selectClickedComp);
  const components: ComponentConfig = {
    profile: <ProfileSetting />,
    page: <PageSetting />,
    title: <TitleSetting titleImg={titleImg} setTitleImg={setTitleImg} />,
    category: <CategorySetting />,
    logo: <LogoSetting logoImg={logoImg} setLogoImg={setLogoImg} logoType={logoType} setLogoType={setLogoType} />,
    contents: <ContentsSetting />,
  };

  return <div className={styles.checkListContainer}>{components[clicked]}</div>;
};

export default DetailSelector;
