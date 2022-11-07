import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "api/api";
import Axios from "api/Axios";
import { useDispatch } from "react-redux";
import { authActions } from "slices/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const code = new URLSearchParams(location.search).get("code");
  
  useEffect(() => {
    async function getAccessToken() {
      const getAccessToken = Axios.get(api.auth.login, {
        params: { code: code },
      }).then((res) => {
        console.log("결과", res.data);
        dispatch(
          authActions.login({
            accessToken: res.data.accessToken,
            githubId: res.data.githubId,
            githubName: res.data.githubName,
            githubImage: res.data.githubImage,
            auth: true,
          })
        );
      });
      
    }
    getAccessToken();
  });




  return (
    <>
      <h1>로그인페이지</h1>
      {name}
    </>
  );
};

export default LoginPage;
