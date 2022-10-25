const HOST = process.env.REACT_APP_API_BASE_URL + '/api/';

const AUTH = 'auth';
const BLOG = 'blog';
const POSTS = 'posts';
const DASH = 'dashBoard';
const SETTING = 'setting';

interface apiInterface {
  setting: {
    getCategory: () => string;
  };
}

const api: apiInterface = {
  setting: {
    getCategory: () => HOST + SETTING + '/category',
  },
};

export default api;
