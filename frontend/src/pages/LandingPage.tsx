import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "api/Api";
import Axios from "api/JsonAxios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "slices/authSlice";
import { rootState } from "app/store";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth, accessToken, githubId } = useSelector((state: rootState) => state.auth);
  const code = new URLSearchParams(location.search).get("code");

  useEffect(() => {
    if (!auth) getAccessToken();
  });

  async function getAccessToken() {
    await Axios.get(api.auth.login(code)).then((res) => {
      dispatch(
        authActions.login({
          accessToken: res.data.accessToken,
          githubId: res.data.githubId,
          githubImage: res.data.githubImage,
        }),
      );
      navigate("/");
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
        res.data.blogType;
        dispatch(
          authActions.blogType({
            blogType: res.data.blogType,
          }),
        );
        // setSecretRepo(accessToken, githubId);
      }
      else navigate("/create/reset");
    });
  }



  return (
    <>
      <h1>랜딩페이지</h1>
      <br />
      <Stack justifyContent="center" alignItems="center" spacing={2}>
        <NavLink to="/create">블로그 생성</NavLink>
        <NavLink to="/dashboard">대시보드</NavLink>
      </Stack>
    </>
  );
};

export default LandingPage;
