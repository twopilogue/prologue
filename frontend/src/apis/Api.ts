import { AxiosRequestConfig } from "axios";
import Axios from "./JsonAxios";
import api from "./BaseUrl";

type ServerResponse = {
  message?: string; // 메시지
  statusCode?: number;
};

// export interface URIConfig extends ServerResponse {
//   uri: string;
// }

export interface UserInfoConfig {
  accessToken: string;
  githubId: string;
  githubImage: string;
}

export interface ServerErrorResponse {
  code: string;
  message: string;
}

const Get = async <T>(url: string, config?: AxiosRequestConfig) => {
  return await Axios.get<ServerResponse & T>(url, config);
};
const Post = async <T>(url: string, data?: Record<string, unknown | unknown[]>, config?: AxiosRequestConfig) => {
  return await Axios.post<ServerResponse & T>(url, data, config);
};
const Put = async <T>(url: string, data?: Record<string, unknown | unknown[]>, config?: AxiosRequestConfig) => {
  return await Axios.put<ServerResponse & T>(url, data, config);
};
const Delete = async <T>(url: string, data?: Record<string, unknown | unknown[]>) => {
  return await Axios.delete<ServerResponse & T>(url, { data });
};

export const authApi = {
  getUri: () => Get<{ uri: string }>(api.auth.getUri()),
  login: (code: string) => Get<UserInfoConfig>(api.auth.login(code)),
  putSecretRepo: (accessToken: string, githubId: string) => Put(api.auth.setSecretRepo(accessToken, githubId)),
  getAuthFile: (accessToken: string, githubId: string) =>
    Get<{ checkAuthFile: boolean; blogType: 0 | 1; template: string }>(api.auth.getAuthFile(accessToken, githubId)),
  putAuthFile: (data: { accessToken: string; githubId: string; blogType: number; template: string }) =>
    Put<{ checkAuthFile: boolean; blogType: 0 | 1; template: string }>(api.auth.setAuthFile(), data),
};

export const blogApi = {
  postTemplate: (data: { accessToken: string; githubId: string; template: string }) =>
    Post(api.blog.chooseTemplate(), data),
  getRepoList: (accessToken: string, githubId: string) =>
    Get<{ checkRepository: boolean }>(api.blog.getRepoList(accessToken, githubId)),
  deleteRepo: (accessToken: string, githubId: string) => Delete(api.blog.deleteRepo(accessToken, githubId)),
  putBuild: (accessToken: string, githubId: string) => Put(api.blog.triggerStart(accessToken, githubId)),
  putBuildType: (accessToken: string, githubId: string) => Put(api.blog.changeBuildType(accessToken, githubId)),
};

export const dashboardApi = {
  getNewPosts: (accessToken: string, githubId: string) => Get(api.dashboard.getNewPost(accessToken, githubId)),
  getNewBuild: (accessToken: string, githubId: string) => Get(api.dashboard.getNewBuildTime(accessToken, githubId)),
  getMonthPosts: (accessToken: string, githubId: string) => Get(api.dashboard.getMonthPosts(accessToken, githubId)),
  getRepoSize: (accessToken: string, githubId: string, template: string) =>
    Get(api.dashboard.getRepoSize(accessToken, githubId, template)),
  getTotalPostCount: (accessToken: string, githubId: string) => Get(api.dashboard.getTotalPost(accessToken, githubId)),
  getBuildState: (accessToken: string, githubId: string) => Get(api.dashboard.getBildState(accessToken, githubId)),
  getChangeState: (accessToken: string, githubId: string) => Get(api.dashboard.getChangeState(accessToken, githubId)),
};

export const settingApi = {
  getCategory: (accessToken: string, githubId: string) => Get(api.setting.getCategory(accessToken, githubId)),
  putCategory: (data: { accessToken: string; githubId: string; category: [] }) =>
    Put(api.setting.modifyCategory(), data),
  getBlog: (accessToken: string, githubId: string) => Get(api.setting.getBlog(accessToken, githubId)),
  putBlog: (data: {
    accessToken: string;
    githubId: string;
    title: string;
    summary: string;
    nickName: string;
    description: string;
    social: Map<string, string>;
    imageFile: Blob;
  }) => Put(api.setting.modifyBlog(), data),
  getLayout: (accessToken: string, githubId: string) => Get(api.setting.getLayout(accessToken, githubId)),
  putLayout: (data: { accessToken: string; githubId: string; layout: string; layoutJson: string }) =>
    Put(api.setting.modifyLayout(), data),
  getPage: (accessToken: string, githubId: string) => Get(api.setting.getPage(accessToken, githubId)),
  putPage: (data: { accessToken: string; githubId: string; pages: Blob }) => Put(api.setting.modifyPage(), data),
  getDetail: (accessToken: string, githubId: string) => Get(api.setting.getDetail(accessToken, githubId)),
  putDetail: (data: { data: Blob }) => Put(api.setting.modifyDetail(), data),
};

export const postApi = {
  writePost: (data: { data: Blob }) => Post(api.posts.writePost(), data),
  getPost: (accessToken: string, githubId: string, directory: string) =>
    Get(api.posts.getPostDetail(accessToken, githubId, directory)),
  putPost: (data: { data: Blob }) => Put(api.posts.modifyPost(), data),
  deletePost: (data: { accessToken: string; githubId: string; directory: string }) =>
    Delete(api.posts.deletePost(), data),
  getPostList: (accessToken: string, githubId: string, index: number, category: string) =>
    Get(api.posts.getPostList(accessToken, githubId, index, category)),
  getImgUrl: (data: { data: Blob }) => Get(api.posts.getImgUrl(), data),
  getPage: (accessToken: string, githubId: string, pageName: string) =>
    Get(api.posts.getPage(accessToken, githubId, pageName)),
  putPage: (data: { data: Blob }) => Put(api.posts.modifyPage(), data),
};
