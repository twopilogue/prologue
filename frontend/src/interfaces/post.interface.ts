export interface PostCommonConfig {
  title: string;
  description: string;
  category: string;
}

export interface PostListConfig extends PostCommonConfig {
  tag: string[];
  date: string;
  directory: string;
  imgUrl: string;
}

export interface PostDetailConfig extends PostCommonConfig {
  content: string;
  tagList: string[];
  fileList?: any[];
  files?: any[];
  images?: {
    name: string;
    url: string;
  }[];
}

export interface TempPostConfig {
  tempPostId: number;
  title: string;
  summary: string;
  updatedAt: string;
}

export interface TempPostDetailConfig extends TempPostConfig {
  description: string;
  tags: string[];
  content: string;
  createdAt?: string;
  category: string;
}
