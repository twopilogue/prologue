import { dashboardApi } from "apis/Api";

const getBuildState = async (accessToken: string, githubId: string) => {
  const res = await dashboardApi.getBuildState(accessToken, githubId);
  return res.data.buildState;
};

const getBuildTime = async (accessToken: string, githubId: string) => {
  const res = await dashboardApi.getNewBuild(accessToken, githubId);
  return res.data.latestBuildTime;
};

const getChangeState = async (accessToken: string, githubId: string) => {
  const res = await dashboardApi.getChangeState(accessToken, githubId);
  return res.data.checkUpdate;
};

const getTotalPostCount = async (accessToken: string, githubId: string) => {
  const res = await dashboardApi.getTotalPostCount(accessToken, githubId);
  return res.data.total;
};

const getNewPosts = async (accessToken: string, githubId: string) => {
  const res = await dashboardApi.getNewPosts(accessToken, githubId);
  return res.data.currentPosts;
};

const getRepoSize = async (accessToken: string, githubId: string, template: string) => {
  const res = await dashboardApi.getRepoSize(accessToken, githubId, template);
  return res.data.size;
};

const getMonthPosts = async (accessToken: string, githubId: string) => {
  const res = await dashboardApi.getMonthPosts(accessToken, githubId);
  return res.data.dateList;
};

export { getBuildState, getBuildTime, getChangeState, getTotalPostCount, getNewPosts, getRepoSize, getMonthPosts };
