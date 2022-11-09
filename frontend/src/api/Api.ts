// 기본 url
const HOST = process.env.REACT_APP_API_BASE_URL + "/api/";

// 세부 url
const AUTH = "auth/";
const BLOG = "blog/";
const DASHBOARD = "dashboard/";
const SETTING = "setting/";
const POSTS = "posts";

interface apiInterface {
  auth: {
    getUri: () => string;
    login: (code: string) => string;
    setSecretRepo: (accessToken: string, githubId: string) => string;
    getAuthFile: (accessToken: string, githubId: string) => string;
    setAuthFile: () => string;
  };
  blog: {
    chooseTemplate: () => string;
    getRepoList: (accessToken: string, githubId: string) => string;
    setRepo: (accessToken: string, githubId: string) => string;
    deleteRepo: (accessToken: string, githubId: string) => string;
    setGitWorkflow: (accessToken: string, githubId: string) => string;
    changeBranch: (accessToken: string, githubId: string) => string;
  };
  dashboard: {
    getNewPost: (accessToken: string, githubId: string) => string;
    getNewBuildTime: (accessToken: string, githubId: string) => string;
    getMonthPosts: (accessToken: string, githubId: string) => string;
    getRepoSize: (accessToken: string, githubId: string) => string;
  };
  setting: {
    getCategory: (accessToken: string, githubId: string) => string;
    modifyCategory: () => string;
    getBlog: (accessToken: string, githubId: string) => string;
    modifyBlog: () => string;
    getLayout: () => string;
    modifyLayout: () => string;
    getLayoutDetail: () => string;
    modifyLayoutDetail: () => string;
    getPage: (accessToken: string, githubId: string) => string;
    modifyPage: () => string;
  };
  posts: {
    writePost: () => string;
    getPostDetail: (accessToken: string, githubId: string, directory: string) => string;
    modifyPost: () => string;
    deletePost: () => string;
    getPostList: (accessToken: string, githubId: string, page: number) => string;
    getPage: (accessToken: string, githubId: string, pageName: string) => string;
    modifyPage: () => string;
  };
}

const api: apiInterface = {
  auth: {
    getUri: () => HOST + AUTH + "uri",
    login: (code: string) => HOST + AUTH + "login?code=" + code,
    setSecretRepo: (accessToken: string, githubId: string) =>
      HOST + AUTH + "secrets?accessToken=" + accessToken + "&githubId=" + githubId,
    getAuthFile: (accessToken: string, githubId: string) =>
      HOST + AUTH + "check?accessToken=" + accessToken + "&githubId=" + githubId,
    setAuthFile: () => HOST + AUTH + "check",
  },
  blog: {
    chooseTemplate: () => HOST + BLOG + "template",
    getRepoList: (accessToken: string, githubId: string) =>
      HOST + BLOG + "list?accessToken=" + accessToken + "&githubId=" + githubId,
    setRepo: (accessToken: string, githubId: string) =>
      HOST + BLOG + "repo?accessToken=" + accessToken + "&githubId=" + githubId,
    deleteRepo: (accessToken: string, githubId: string) =>
      HOST + BLOG + "repo?accessToken=" + accessToken + "&githubId=" + githubId,
    setGitWorkflow: (accessToken: string, githubId: string) =>
      HOST + BLOG + "workflow?accessToken=" + accessToken + "&githubId=" + githubId,
    changeBranch: (accessToken: string, githubId: string) =>
      HOST + BLOG + "deploy-branch?accessToken=" + accessToken + "&githubId=" + githubId,
  },
  dashboard: {
    getNewPost: (accessToken: string, githubId: string) =>
      HOST + DASHBOARD + "list?accessToken=" + accessToken + "&githubId=" + githubId,
    getNewBuildTime: (accessToken: string, githubId: string) =>
      HOST + DASHBOARD + "latest-build?accessToken=" + accessToken + "&githubId=" + githubId,
    getMonthPosts: (accessToken: string, githubId: string) =>
      HOST + DASHBOARD + "month-posts?accessToken=" + accessToken + "&githubId=" + githubId,
    getRepoSize: (accessToken: string, githubId: string) =>
      HOST + DASHBOARD + "size?accessToken=" + accessToken + "&githubId=" + githubId,
  },
  setting: {
    getCategory: (accessToken: string, githubId: string) =>
      HOST + SETTING + "category?accessToken=" + accessToken + "&githubId=" + githubId,
    modifyCategory: () => HOST + SETTING + "category",
    getBlog: (accessToken: string, githubId: string) =>
      HOST + SETTING + "blog?accessToken=" + accessToken + "&githubId=" + githubId,
    modifyBlog: () => HOST + SETTING + "blog",
    getLayout: () => HOST + SETTING + "layout",
    modifyLayout: () => HOST + SETTING + "layout",
    getLayoutDetail: () => HOST + SETTING + "layout/detail",
    modifyLayoutDetail: () => HOST + SETTING + "layout/detail",
    getPage: (accessToken: string, githubId: string) =>
      HOST + SETTING + "pages?accessToken=" + accessToken + "&githubId=" + githubId,
    modifyPage: () => HOST + SETTING + "pages",
  },
  posts: {
    writePost: () => HOST + POSTS,
    getPostDetail: (accessToken: string, githubId: string, directory: string) =>
      HOST + POSTS + "?accessToken=" + accessToken + "&githubId=" + githubId + "&directory=" + directory,
    modifyPost: () => HOST + POSTS,
    deletePost: () => HOST + POSTS,
    getPostList: (accessToken: string, githubId: string, page: number) =>
      HOST + POSTS + "/list?accessToken=" + accessToken + "&githubId=" + githubId + "&page=" + page,
    getPage: (accessToken: string, githubId: string, pageName: string) =>
      HOST + POSTS + "/pages?accessToken=" + accessToken + "&githubId=" + githubId + "&pageName=" + pageName,
    modifyPage: () => HOST + POSTS + "/pages",
  },
};

export default api;
