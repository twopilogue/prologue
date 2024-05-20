import { autoApi } from "apis/Api";

const getAutoExist = async (githubId: string) => {
  const res = await autoApi.getAutoExist(githubId);
  return res.data;
};

const getAutoPost = async (githubId: string) => {
  const res = await autoApi.getAutoPost(githubId);
  return res.data;
};

const writeAutoPost = async (data: {
  githubId: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  content: string;
}) => {
  await autoApi.writeAutoPost(data);
};

export { getAutoExist, getAutoPost, writeAutoPost };
