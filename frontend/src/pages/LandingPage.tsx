import { Alert, Box, Snackbar, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import LandingMain from "features/landing/LandingMain";
import LandingSub from "features/landing/LandingSub";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { useLocation } from "react-router";

const LandingPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

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
