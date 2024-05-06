import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface PostCommonConfig {
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
  image?: {
    name: string;
    url: string;
  }[];
}

interface PostConfig {
  post: PostDetailConfig;

  postList: PostListConfig[];
  postIndex: number;
  postIsLast: boolean;

  editList: PostCommonConfig;

  actions: {
    setPostTitleAction: (title: string) => void;
    setPostDescriptionAction: (description: string) => void;
    setPostCategoryAction: (category: string) => void;
    setPostTagListAction: (tagList: string[]) => void;
    setPostContentAction: (content: string) => void;
    setPostFileListAction: (fileList: any[]) => void;
    resetPostFileListAction: () => void;
    setPostFileAction: (files: any[]) => void;

    setPostListAction: (postList: PostListConfig[]) => void;
    resetPostListAction: () => void;
    setPostIndexAction: (index: number) => void;
    resetPostIndexAction: () => void;
    setPostIsLastAction: (isLast: boolean) => void;
    setPostEditListAction: (editList: PostCommonConfig) => void;
  };
}

export const usePostStore = create<PostConfig>()(
  immer((set) => ({
    post: {
      title: "",
      description: "",
      category: "",
      tagList: [],
      content: "",
      fileList: [],
      files: [],
      image: [],
    },

    postList: [],
    postIndex: -1,
    postIsLast: false,

    editList: {
      title: "",
      description: "",
      category: "",
      tag: [],
    },

    actions: {
      setPostTitleAction: (title: string) => set(() => ({ title })),
      setPostDescriptionAction: (description: string) => set(() => ({ description })),
      setPostCategoryAction: (category: string) => set(() => ({ category })),
      setPostTagListAction: (tagList: string[]) => set(() => ({ tagList })),
      setPostContentAction: (content: string) => set(() => ({ content })),
      setPostFileListAction: (fileList: any[]) => set(() => ({ fileList })),
      resetPostFileListAction: () => set(() => ({ fileList: [] })),
      setPostFileAction: (files: any[]) => set(() => ({ files })),

      setPostListAction: (postList: PostListConfig[]) => set(() => ({ postList })),
      resetPostListAction: () => set(() => ({ PostList: [] })),
      setPostIndexAction: (index: number) => set(() => ({ index })),
      resetPostIndexAction: () => set(() => ({ index: -1 })),
      setPostIsLastAction: (isLast: boolean) => set(() => ({ isLast })),
      setPostEditListAction: (editList: PostCommonConfig) => set(() => ({ editList })),
    },
  })),
);

export const usePostActions = () => usePostStore((state) => state.actions);
