import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingMain from "features/landing/LandingMain";
import { useAuthStore } from "stores/authStore";
import { getRepoList } from "apis/api/blog";
import { useShallow } from "zustand/react/shallow";

const LandingPage = () => {
  const navigate = useNavigate();
  const [accessToken, githubId, isLogin, hasAuthFile] = useAuthStore(
    useShallow((state) => [state.accessToken, state.githubId, state.isLogin, state.hasAuthFile]),
  );

  const getRepositoryList = async () => {
    const checkRepository = await getRepoList(accessToken, githubId);
    if (checkRepository) navigate("create/reset");
    else navigate("/create");
  };

  useEffect(() => {
    if (isLogin) {
      if (hasAuthFile) navigate("/dashboard");
      else getRepositoryList();
    }
  }, []);

  return (
    <>
      <Stack justifyContent="center" alignItems="center">
        <LandingMain />
      </Stack>
    </>
  );
};

export default LandingPage;
