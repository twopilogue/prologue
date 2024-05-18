import { autoApi } from "apis/Api";

const getAutoExist = async (githubId: string) => {
  const res = await autoApi.getAutoExist(githubId);
  return res.data;
};

const getAutoPost = async (githubId: string) => {
  const res = await autoApi.getAutoPost(githubId);
  return res.data;
};

export { getAutoExist, getAutoPost };
