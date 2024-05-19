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

const writeTempPost = async (data: {
  githubId: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  content: string;
}) => {
  await tempApi.writeTempPost(data);
};

const deleteTempPost = async (githubId: string, tempPostId: number) => {
  await tempApi.deleteTempPost(githubId, tempPostId);
};

export { getTempListCnt, getTempList, getTempPost, writeTempPost, deleteTempPost };
