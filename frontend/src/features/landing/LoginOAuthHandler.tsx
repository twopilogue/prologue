import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/system";
import Button from "@mui/material/Button";
import Text from "components/Text";
import styles from "features/landing/Landing.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import landingMainImg1 from "assets/landing/landingMainImg1.png";
import { Paper } from "@mui/material";
import waveSvg from "assets/landing/wave.svg";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "slices/authSlice";

function LoginOAuthHandler() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const code = new URLSearchParams(location.search).get("code");

  useEffect(() => {
    getAccessToken();
  }, []);

  async function getAccessToken() {
    await Axios.get(api.auth.login(code)).then((res) => {
      dispatch(
        authActions.login({
          accessToken: res.data.accessToken,
          githubId: res.data.githubId,
          githubImage: res.data.githubImage,
        }),
      );
      getRepoList(res.data.accessToken, res.data.githubId);
    });
  }

  // 깃허브 블로그 개설여부
  async function getRepoList(accessToken: string, githubId: string) {
    await Axios.get(api.blog.getRepoList(accessToken, githubId)).then((res) => {
      if (res.data.checkRepository) {
        getAuthFile(accessToken, githubId);
      } else {
        navigate("/create");
      }
    });
  }

  // 서비스 인증 파일 존재 여부
  async function getAuthFile(accessToken: string, githubId: string) {
    await Axios.get(api.auth.getAuthFile(accessToken, githubId)).then((res) => {
      if (res.data.checkAuthFile) {
        dispatch(authActions.blogType({ blogType: res.data.blogType }));
        dispatch(authActions.authFile({ authFile: true }));
        dispatch(authActions.template({ template: res.data.template }));
        setTimeout(() => [setSecretRepo(accessToken, githubId)], 200);
      } else {
        dispatch(authActions.authFile({ authFile: false }));
        navigate("/create/reset");
      }
    });
  }

  async function setSecretRepo(accessToken: string, githubId: string) {
    await Axios.put(api.auth.setSecretRepo(accessToken, githubId)).then(() => {
      navigate("/dashboard");
    });
  }

  return (
    <Box className={styles.mainBox}>
      <div className={styles.loginImgGradient} />
      <img src={waveSvg} className={styles.mainWaveSvg} />
      <Stack direction="row" alignItems="center" spacing={30} sx={{ ml: 5, position: "absolute" }}>
        <Box className={styles.mainLeftBox}>
          <Text value="깃허브 블로그를 편리하게" type="groupTitle" />
          <Stack spacing={0.5} sx={{ pb: 3 }}>
            <Stack className={styles.mainTextBox}>
              <Text value="1분만에 만드는" bold />
              <Text value="나만의 깃허브 블로그" bold />
            </Stack>
          </Stack>
          <Button
            startIcon={<GitHubIcon />}
            sx={{
              backgroundColor: "#2f2f2f",
              color: "white",
              width: "300px",
              borderRadius: "10px",
              zIndex: "1",
              "&:hover": {
                backgroundColor: "#212121",
              },
            }}
          >
            Signup With GitHub
          </Button>
        </Box>
        <Paper elevation={6} square className={styles.mainSlider}>
          <Box sx={{ width: 562, height: 350 }}>
            <img src={landingMainImg1} className={styles.mainImg} />
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
}

export default LoginOAuthHandler;
