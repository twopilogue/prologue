import { settingApi } from "apis/Api";

const getCategoryApi = async (accessToken: string, githubId: string) => {
  const res = await settingApi.getCategory(accessToken, githubId);
  return res.data.category;
};

const modifyCategoryApi = async (accessToken: string, githubId: string, category: string[]) => {
  const res = await settingApi.putCategory({ accessToken, githubId, category });
  return res.data.statusCode;
};

const getBlogInfoApi = async (accessToken: string, githubId: string) => {
  const res = await settingApi.getBlog(accessToken, githubId);
  return res.data;
};

const modifyBlogApi = async (data: FormData) => {
  await settingApi.putBlog({ data });
};

const getDetailApi = async (accessToken: string, githubId: string) => {
  const res = await settingApi.getDetail(accessToken, githubId);
  return res.data;
};

const modifyDetailApi = async (data: FormData) => {
  await settingApi.putDetail({ data });
};

const getLayoutApi = async (accessToken: string, githubId: string) => {
  const res = await settingApi.getLayout(accessToken, githubId);
  return res.data.layout;
};

const modifyLayoutApi = async (accessToken: string, githubId: string, layout: string, layoutJson: string) => {
  await settingApi.putLayout({ accessToken, githubId, layout, layoutJson });
};

export {
  getCategoryApi,
  modifyCategoryApi,
  getBlogInfoApi,
  modifyBlogApi,
  getDetailApi,
  modifyDetailApi,
  getLayoutApi,
  modifyLayoutApi,
};
