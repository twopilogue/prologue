import { create } from "zustand";

export const useAuthStore = create(() => ({
  accessToken: "",
  githubId: "",
  githubImage: "",
  login: false,
  authFile: false,
  blogType: null,
  template: "",
}));

export const setLogin = (accessToken: string, githubId: string, githubImage: string) => {
  console.log(`accessToken 저장: ${accessToken}`);
  useAuthStore.setState({
    accessToken,
    githubId,
    githubImage,
    login: true,
  });
};

export const setBlogType = (blogType: 0 | 1) => useAuthStore.setState({ blogType });
export const setAuthFile = (authFile: boolean) => useAuthStore.setState({ authFile });
export const setTemplate = (template: string) => useAuthStore.setState({ template });
