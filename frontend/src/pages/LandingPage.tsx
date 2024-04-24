import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingMain from "features/landing/LandingMain";
import Axios from "apis/JsonAxios";
import api from "apis/BaseUrl";
import { useAuthStore } from "stores/authStore";

const LandingPage = () => {
  const navigate = useNavigate();

  // const { login, authFile, accessToken, githubId } = useSelector((state: rootState) => state.auth);
  const login = useAuthStore((state) => state.login);
  const authFile = useAuthStore((state) => state.authFile);
  const accessToken = useAuthStore((state) => state.accessToken);
  const githubId = useAuthStore((state) => state.githubId);

  useEffect(() => {
    if (login) {
      if (authFile) navigate("/dashboard");
      else {
        Axios.get(api.blog.getRepoList(accessToken, githubId)).then((res) => {
          if (res.data.checkRepository) navigate("create/reset");
          else navigate("/create");
        });
      }
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
