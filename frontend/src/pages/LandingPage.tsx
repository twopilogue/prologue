import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import LandingMain from "features/landing/LandingMain";
import Axios from "api/JsonAxios";
import api from "api/BaseUrl";

const LandingPage = () => {
  const navigate = useNavigate();

  const { login, authFile, accessToken, githubId } = useSelector((state: rootState) => state.auth);

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
