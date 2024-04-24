import { blogApi } from "apis/Api";

const getRepoList = async (accessToken: string, githubId: string) => {
  const res = await blogApi.getRepoList(accessToken, githubId);
  return res.data.checkRepository;
};

const putBuild = async (accessToken: string, githubId: string) => {
  await blogApi.putBuild(accessToken, githubId);
};

const deleteRepo = async (accessToken: string, githubId: string) => {
  const res = await blogApi.deleteRepo(accessToken, githubId);
  return res.data.statusCode;
};

const selectTemplate = async (accessToken: string, githubId: string, template: string) => {
  const res = await blogApi.postTemplate({ accessToken, githubId, template });
  return res.data.statusCode;
};

const setBuildType = async (accessToken: string, githubId: string) => {
  const res = await blogApi.putBuildType(accessToken, githubId);
  return res.data.statusCode;
};

export { getRepoList, putBuild, deleteRepo, selectTemplate, setBuildType };
