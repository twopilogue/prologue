import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface AuthConfig {
  accessToken: string;
  githubId: string;
  githubImage: string;
  isLogin: boolean;
  hasAuthFile: boolean;
  blogType: 0 | 1 | null;
  template: string;
  actions: {
    setLoginAction: (accessToken: string, githubId: string, githubImage: string) => void;
    setLogoutAction: () => void;
    setBlogTypeAction: (blogType: 0 | 1) => void;
    setAuthFileAction: (hasAuthFile: boolean) => void;
    setTemplateAction: (template: string) => void;
  };
}

export const useAuthStore = create<AuthConfig>()(
  immer((set) => ({
    accessToken: "",
    githubId: "",
    githubImage: "",
    isLogin: false,
    hasAuthFile: false,
    blogType: null,
    template: "",
    actions: {
      setLoginAction: (accessToken: string, githubId: string, githubImage: string) =>
        set(() => ({
          accessToken,
          githubId,
          githubImage,
          isLogin: true,
        })),
      setLogoutAction: () =>
        set(() => ({
          accessToken: "",
          githubId: "",
          githubImage: "",
          isLogin: false,
          hasAuthFile: false,
          blogType: null,
        })),
      setBlogTypeAction: (blogType: 0 | 1 | null) => set(() => ({ blogType })),
      setAuthFileAction: (hasAuthFile: boolean) => set(() => ({ hasAuthFile })),
      setTemplateAction: (template: string) => set(() => ({ template })),
    },
  })),
);

export const useAuthActions = () => useAuthStore((state) => state.actions);
