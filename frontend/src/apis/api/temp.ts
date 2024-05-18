import { tempApi } from "apis/Api";

const getTempListCnt = async (githubId: string) => {
  const res = await tempApi.getTempListCnt(githubId);
  return res.data.count;
};

const getTempList = async (githubId: string) => {
  const res = await tempApi.getTempList(githubId);
  return res.data.data;
};

const getTempPost = async (githubId: string, tempPostId: number) => {
  const res = await tempApi.getTempPost(githubId, tempPostId);
  return res.data;
};

export { getTempListCnt, getTempList, getTempPost };
