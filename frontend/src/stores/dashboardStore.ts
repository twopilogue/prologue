import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface BlogInfoConfig {
  totalPost: number;
  repoSize: number;
}

interface DashboardConfig {
  monthPosts: string[];
  newPosts: { directory: string; title: string; date: string }[];
  buildTime: string;
  repoSize: number;
  totalPost: string;
  actions: {
    setDashboardAction: (payload: DashboardConfig) => void;
    setBlogInfoAction: (payload: BlogInfoConfig) => void;
    setBuildTimeAction: (buildTime: DashboardConfig["buildTime"]) => void;
    setNewPostsAction: (newPosts: DashboardConfig["newPosts"]) => void;
    setMonthPostsAction: (monthPosts: DashboardConfig["monthPosts"]) => void;
  };
}

export const useDashboardStore = create<DashboardConfig>()(
  immer((set) => ({
    monthPosts: [],
    newPosts: [],
    buildTime: "",
    repoSize: 0,
    totalPost: "",
    actions: {
      setDashboardAction: (payload: DashboardConfig) => {
        const { monthPosts, newPosts, buildTime, repoSize, totalPost } = payload;
        console.log("setDashboardAction");
        set(() => ({
          monthPosts,
          newPosts,
          buildTime,
          repoSize,
          totalPost,
        }));
      },
      setBlogInfoAction: (payload: BlogInfoConfig) => {
        const { totalPost, repoSize } = payload;
        set(() => ({
          totalPost,
          repoSize,
        }));
      },
      setBuildTimeAction: (buildTime: DashboardConfig["buildTime"]) =>
        set(() => ({
          buildTime,
        })),
      setNewPostsAction: (newPosts: DashboardConfig["newPosts"]) =>
        set(() => ({
          newPosts,
        })),
      setMonthPostsAction: (monthPosts: DashboardConfig["monthPosts"]) =>
        set(() => ({
          monthPosts,
        })),
    },
  })),
);

export const useDashboardActions = () => useDashboardStore((state) => state.actions);
