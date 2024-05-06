import { UserInfoConfig } from "interfaces/auth.interface";

const getUserInfo = (userInfo: UserInfoConfig) => {
  const { accessToken, githubId, githubImage } = userInfo;
  return { accessToken, githubId, githubImage };
};

export { getUserInfo };
