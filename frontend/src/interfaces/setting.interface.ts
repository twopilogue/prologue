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

export interface ComponentConfig {
  key: string;
  id: string;
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

export interface ColorsConfig {
  title: {
    background: string;
    text: string;
    titleHeight?: number;
    type: boolean; // 이미지 or 색
    titleText: string;
  };
  category: {
    background: string;
    text: string;
  };
  page: {
    background: string;
    text: string;
    sort: string;
  };
  profile: {
    background: string;
    text: string;
  };
  contents: {
    background: string;
    text: string;
  };
  logo: {
    background: string;
    text: string;
    logoText: string;
  };
}
