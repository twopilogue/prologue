const HOST = process.env.REACT_APP_API_BASE_URL + "/api/";

const AUTH = "auth/";
const BLOG = "blog";
const POSTS = "posts";
const DASH = "dashBoard";
const SETTING = "setting";

interface apiInterface {
  auth: {
    uri: () => string;
    login: () => string;
    secret: () => string;
  };
  setting: {
    getCategory: () => string;
  };
}

const api: apiInterface = {
  auth: {
    uri: () => HOST + AUTH + "uri",
    login: () => HOST + AUTH + "login",
    secret: () => HOST + AUTH + "secret",
  },
  setting: {
    getCategory: () => HOST + SETTING + "/category",
  },
};

export default api;
