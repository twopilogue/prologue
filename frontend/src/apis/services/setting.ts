import { DetailConfig } from "pages/setting/DetailSettingPage";
import { BlogInfoConfig } from "slices/settingSlice";

const getBlogInfoService = async (data: BlogInfoConfig) => {
  const { nickName, summary, profileImg, title, description, social } = data;
  const userInfo = {
    nickName,
    summary,
    profileImg,
  };
  const blogInfo = {
    title,
    description,
    social,
  };
  return { userInfo, blogInfo };
};

const getDetailService = async (data: DetailConfig) => {
  const { css, logoText, titleText, titleColor } = data;
  return { css, logoText, titleText, titleColor };
};

export { getBlogInfoService, getDetailService };
