export interface MyInfoConfig {
  nickName: string;
  summary: string;
  profileImg: string | FormData;
}

export interface MyBlogInfoConfig {
  title: string;
  description: string;
  social: object;
}

export interface KeyConfig {
  key: string;
  id: number;
}

export interface EditListConfig extends KeyConfig {
  editable: boolean;
}

export interface ComponentCheckConfig {
  [logo: string]: boolean;
  profile?: boolean;
  category?: boolean;
  page?: boolean;
  title?: boolean;
  contents: boolean;
}
