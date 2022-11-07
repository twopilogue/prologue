const HOST = process.env.REACT_APP_API_BASE_URL + "/api/";

const AUTH = "auth/";
const BLOG = "blog";
const POSTS = "posts";
const DASH = "dashBoard";
const SETTING = "setting";

interface apiInterface {
  auth: {
    // url: string;
    login: string;
    secret: string;
  };
  setting: {
    getCategory: () => string;
  };
}

const api: apiInterface = {
  auth: {
    // url: AUTH + "url",
    login: AUTH + "login",
    secret: AUTH + "secret",
  },
  setting: {
    getCategory: () => HOST + SETTING + "/category",
  },
};

export default api;
