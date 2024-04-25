import { postApi } from "apis/Api";

const getImgUrlApi = async (data: FormData) => {
  const res = await postApi.getImgUrl({ data });
  return res.data.tempImageUrl;
};

const getPostListApi = async (accessToken: string, githubId: string, index: number, category: string) => {
  const res = await postApi.getPostList(accessToken, githubId, index, category);
  return res.data.result;
};

const getPostDetailApi = async (accessToken: string, githubId: string, directory: string) => {
  const res = await postApi.getPost(accessToken, githubId, directory);
  return res.data;
};

const writePostApi = async (data: FormData) => {
  await postApi.writePost({ data });
};

const modifyPostApi = async (data: FormData) => {
  await postApi.putPost({ data });
};

const deletePostApi = async (accessToken: string, githubId: string, directory: string) => {
  await postApi.deletePost({ accessToken, githubId, directory });
};

export { getPostListApi, getPostDetailApi, writePostApi, modifyPostApi, deletePostApi, getImgUrlApi };
