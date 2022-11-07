import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "api/api";
import Axios from "api/Axios";
import { useDispatch } from "react-redux";
import { authActions } from "slices/authSlice";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const code = new URLSearchParams(location.search).get("code");

  useEffect(() => {
    console.log(code);
    async function getAccessToken() {
      Axios.get(api.auth.login(), {
        params: { code: code },
      }).then((res) => {
        console.log("결과", res.data);
        dispatch(
          authActions.login({
            accessToken: res.data.accessToken,
            githubId: res.data.githubId,
            githubImage: res.data.githubImage,
            auth: true,
          }),
        );
      });
    }
    getAccessToken();
  });

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
