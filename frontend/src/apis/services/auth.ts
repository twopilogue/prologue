import { UserInfoConfig } from "apis/Api";

const getUserInfo = (userInfo: UserInfoConfig) => {
  const { accessToken, githubId, githubImage } = userInfo;
  return { accessToken, githubId, githubImage };
};

export { getUserInfo };
