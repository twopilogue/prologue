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
    deleteRepo: (accessToken: string, githubId: string) => string;
    triggerStart: (accessToken: string, githubId: string) => string;
    changeBuildType: (accessToken: string, githubId: string) => string;
  };
  dashboard: {
    getNewPost: (accessToken: string, githubId: string) => string;
    getNewBuildTime: (accessToken: string, githubId: string) => string;
    getMonthPosts: (accessToken: string, githubId: string) => string;
    getRepoSize: (accessToken: string, githubId: string, template: string) => string;
    getTotalPost: (accessToken: string, githubId: string) => string;
    getBildState: (accessToken: string, githubId: string) => string;
    getChangeState: (accessToken: string, githubId: string) => string;
  };
  setting: {
    getCategory: (accessToken: string, githubId: string) => string;
    modifyCategory: () => string;
    getBlog: (accessToken: string, githubId: string) => string;
    modifyBlog: () => string;
    getLayout: (accessToken: string, githubId: string) => string;
    modifyLayout: () => string;
    getLayoutDetail: () => string;
    modifyLayoutDetail: () => string;
    getPage: (accessToken: string, githubId: string) => string;
    modifyPage: () => string;
    getDetail: (accessToken: string, githubId: string) => string;
    modifyDetail: () => string;
  };
  posts: {
    writePost: () => string;
    getImgUrl: () => string;
    getPostDetail: (accessToken: string, githubId: string, directory: string) => string;
    modifyPost: () => string;
    deletePost: () => string;
    getPostList: (accessToken: string, githubId: string, index: number, category: string) => string;
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
    deleteRepo: (accessToken: string, githubId: string) =>
      HOST + BLOG + "repo?accessToken=" + accessToken + "&githubId=" + githubId,
    triggerStart: (accessToken: string, githubId: string) =>
      HOST + BLOG + "workflow?accessToken=" + accessToken + "&githubId=" + githubId,
    changeBuildType: (accessToken: string, githubId: string) =>
      HOST + BLOG + "build-type?accessToken=" + accessToken + "&githubId=" + githubId,
  },
  dashboard: {
    getNewPost: (accessToken: string, githubId: string) =>
      HOST + DASHBOARD + "list?accessToken=" + accessToken + "&githubId=" + githubId,
    getNewBuildTime: (accessToken: string, githubId: string) =>
      HOST + DASHBOARD + "latest-build?accessToken=" + accessToken + "&githubId=" + githubId,
    getMonthPosts: (accessToken: string, githubId: string) =>
      HOST + DASHBOARD + "month-posts?accessToken=" + accessToken + "&githubId=" + githubId,
    getRepoSize: (accessToken: string, githubId: string, template: string) =>
      HOST + DASHBOARD + "size?accessToken=" + accessToken + "&githubId=" + githubId + "&template=" + template,
    getTotalPost: (accessToken: string, githubId: string) =>
      HOST + DASHBOARD + "total?accessToken=" + accessToken + "&githubId=" + githubId,
    getBildState: (accessToken: string, githubId: string) =>
      HOST + DASHBOARD + "build?accessToken=" + accessToken + "&githubId=" + githubId,
    getChangeState: (accessToken: string, githubId: string) =>
      HOST + DASHBOARD + "check?accessToken=" + accessToken + "&githubId=" + githubId,
  },
  setting: {
    getCategory: (accessToken: string, githubId: string) =>
      HOST + SETTING + "category?accessToken=" + accessToken + "&githubId=" + githubId,
    modifyCategory: () => HOST + SETTING + "category",
    getBlog: (accessToken: string, githubId: string) =>
      HOST + SETTING + "blog?accessToken=" + accessToken + "&githubId=" + githubId,
    modifyBlog: () => HOST + SETTING + "blog",
    getLayout: (accessToken: string, githubId: string) =>
      HOST + SETTING + "layout?accessToken=" + accessToken + "&githubId=" + githubId,
    modifyLayout: () => HOST + SETTING + "layout",
    getLayoutDetail: () => HOST + SETTING + "layout/css",
    modifyLayoutDetail: () => HOST + SETTING + "layout/css",
    getPage: (accessToken: string, githubId: string) =>
      HOST + SETTING + "pages?accessToken=" + accessToken + "&githubId=" + githubId,
    modifyPage: () => HOST + SETTING + "pages",
    getDetail: (accessToken: string, githubId: string) =>
      HOST + SETTING + "css?accessToken=" + accessToken + "&githubId=" + githubId,
    modifyDetail: () => HOST + SETTING + "css",
  },
  posts: {
    writePost: () => HOST + POSTS,
    getImgUrl: () => HOST + POSTS + "/temp-image",
    getPostDetail: (accessToken: string, githubId: string, directory: string) =>
      HOST + POSTS + "?accessToken=" + accessToken + "&githubId=" + githubId + "&directory=" + directory,
    modifyPost: () => HOST + POSTS,
    deletePost: () => HOST + POSTS,
    getPostList: (accessToken: string, githubId: string, index: number, category: string) =>
      HOST +
      POSTS +
      "/list?accessToken=" +
      accessToken +
      "&githubId=" +
      githubId +
      "&index=" +
      index +
      "&category=" +
      category,
    getPage: (accessToken: string, githubId: string, pageName: string) =>
      HOST + POSTS + "/pages?accessToken=" + accessToken + "&githubId=" + githubId + "&pageName=" + pageName,
    modifyPage: () => HOST + POSTS + "/pages",
  },
};

export default api;
