import { AxiosRequestConfig } from "axios";
import Axios from "./JsonAxios";
import api from "./BaseUrl";
import { BlogInfoConfig } from "slices/settingSlice";
import { DetailConfig } from "pages/DetailSettingPage";
import { ModifiedPageConfig } from "pages/PageSettingPage";
import { PostDetailConfig, PostListConfig } from "slices/postSlice";
import { UserInfoConfig } from "interfaces/auth.interface";

type ServerResponse = {
  message?: string; // 메시지
  statusCode?: number;
};

interface NewPostConfig {
  date: string;
  directory: string;
  title: string;
}

export interface PageConfig {
  label: string;
  posts: boolean;
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
  getNewPosts: (accessToken: string, githubId: string) =>
    Get<{ currentPosts: NewPostConfig[] }>(api.dashboard.getNewPost(accessToken, githubId)),
  getNewBuild: (accessToken: string, githubId: string) =>
    Get<{ latestBuildTime: string }>(api.dashboard.getNewBuildTime(accessToken, githubId)),
  getMonthPosts: (accessToken: string, githubId: string) =>
    Get<{ dateList: string[] }>(api.dashboard.getMonthPosts(accessToken, githubId)),
  getRepoSize: (accessToken: string, githubId: string, template: string) =>
    Get<{ size: number }>(api.dashboard.getRepoSize(accessToken, githubId, template)),
  getTotalPostCount: (accessToken: string, githubId: string) =>
    Get<{ total: number }>(api.dashboard.getTotalPost(accessToken, githubId)),
  getBuildState: (accessToken: string, githubId: string) =>
    Get<{ buildState: "completed" | "progress" }>(api.dashboard.getBildState(accessToken, githubId)),
  getChangeState: (accessToken: string, githubId: string) =>
    Get<{ checkUpdate: boolean }>(api.dashboard.getChangeState(accessToken, githubId)),
};

export const settingApi = {
  getCategory: (accessToken: string, githubId: string) =>
    Get<{ category: string[] }>(api.setting.getCategory(accessToken, githubId)),
  putCategory: (data: { accessToken: string; githubId: string; category: string[] }) =>
    Put(api.setting.modifyCategory(), data),
  getBlog: (accessToken: string, githubId: string) => Get<BlogInfoConfig>(api.setting.getBlog(accessToken, githubId)),
  putBlog: (data: { data: FormData }) => Put(api.setting.modifyBlog(), data),
  getLayout: (accessToken: string, githubId: string) =>
    Get<{ layout: string }>(api.setting.getLayout(accessToken, githubId)),
  putLayout: (data: { accessToken: string; githubId: string; layout: string; layoutJson: string }) =>
    Put(api.setting.modifyLayout(), data),
  getPage: (accessToken: string, githubId: string) =>
    Get<{
      pages: PageConfig[];
    }>(api.setting.getPage(accessToken, githubId)),
  putPage: (data: { accessToken: string; githubId: string; pages: ModifiedPageConfig[] }) =>
    Put(api.setting.modifyPage(), data),
  getDetail: (accessToken: string, githubId: string) => Get<DetailConfig>(api.setting.getDetail(accessToken, githubId)),
  putDetail: (data: { data: FormData }) => Put(api.setting.modifyDetail(), data),
};

export const postApi = {
  writePost: (data: { data: FormData }) => Post(api.posts.writePost(), data),
  getPost: (accessToken: string, githubId: string, directory: string) =>
    Get<PostDetailConfig>(api.posts.getPostDetail(accessToken, githubId, directory)),
  putPost: (data: { data: FormData }) => Put(api.posts.modifyPost(), data),
  deletePost: (data: { accessToken: string; githubId: string; directory: string }) =>
    Delete(api.posts.deletePost(), data),
  getPostList: (accessToken: string, githubId: string, index: number, category: string) =>
    Get<{
      result: {
        Post: PostListConfig[];
        index: number;
        isLast: boolean;
      };
    }>(api.posts.getPostList(accessToken, githubId, index, category)),
  getImgUrl: (data: { data: FormData }) => Get<{ tempImageUrl: string }>(api.posts.getImgUrl(), data),
  getPage: (accessToken: string, githubId: string, pageName: string) =>
    Get(api.posts.getPage(accessToken, githubId, pageName)),
  putPage: (data: { data: Blob }) => Put(api.posts.modifyPage(), data),
};
