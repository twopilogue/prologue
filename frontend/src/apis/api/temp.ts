import { tempApi } from "apis/Api";

const getTempListCnt = async (githubId: string) => {
  const res = await tempApi.getTempListCnt(githubId);
  return res.data.count;
};

const getTempList = async (githubId: string) => {
  const res = await tempApi.getTempList(githubId);
  return res.data.data;
};

export { getTempListCnt, getTempList };
