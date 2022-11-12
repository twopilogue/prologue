import React from "react";
import BlogCreateBox from "features/blog/blogCreate/BlogCreateBox";
import BlogLayoutSetting from "features/blog/blogCreate/BlogLayoutSetting";
import BlogStepper from "features/blog/blogCreate/BlogStepper";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "app/store";
import { authActions } from "slices/authSlice";
import BlogCustomInfo from "features/blog/BlogCustomInfo";

const CreatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isStepNumber, setStepNumber] = React.useState(0);
  const [radioValue, setRadioValue] = React.useState("CustomLayout");

  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);

  const layoutSetting = async () => {
    console.log(radioValue);
    if (radioValue === "CustomLayout") {
      dispatch(authActions.blogType({ blogType: 0 }));
      chooseTemplate();
    } else if (radioValue === "GatsbyLayout") {
      dispatch(authActions.blogType({ blogType: 1 }));
      navigate("/create/gatsby");
    }
  };

  const chooseTemplate = async () => {
    await Axios.post(api.blog.chooseTemplate(), {
      accessToken: accessToken,
      githubId: githubId,
      template: "prologue-template",
    })
      .then(async (res) => {
        console.log("기본 테마적용 성공", res.data);
        setTimeout(() => [setAuthFile()], 500);
      })
      .catch((err) => {
        console.error("기본 테마적용 err", err);
      });
  };

  const setAuthFile = async () => {
    await Axios.put(api.auth.setAuthFile(), {
      accessToken: accessToken,
      githubId: githubId,
      blogType: 0,
    })
      .then((res) => {
        console.log("블로그 인증 파일 생성", res.data);
        setTimeout(() => [changeBranch()], 500);
      })
      .catch((err) => {
        console.error("블로그 인증 파일 생성", err);
      });
  };

  const changeBranch = async () => {
    await Axios.put(api.blog.changeBranch(accessToken, githubId))
      .then(async (res) => {
        console.log("1. 배포 브랜치 변경", res);
        setSecretRepo();
      })
      .catch((err) => {
        console.error("1. 배포 브랜치 변경", err.data);
      });
  };

  const setSecretRepo = async () => {
    await Axios.put(api.auth.setSecretRepo(accessToken, githubId))
      .then((res) => {
        console.log("2. Repo secrets 생성", res.data);
        setGitWorkflow();
      })
      .catch((err) => {
        console.error("2. Repo secrets 생성", err);
      });
  };

  const setGitWorkflow = async () => {
    await Axios.post(api.blog.setGitWorkflow(accessToken, githubId))
      .then((res) => {
        console.log("3. Workflow 생성", res.data);
        setStepNumber(2);
      })
      .catch((err) => {
        console.error("3. Workflow 생성", err);
      });
  };

  return (
    <div style={{ paddingTop: "5%" }}>
      <BlogStepper step={isStepNumber} />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "5%",
        }}
      >
        {isStepNumber === 0 ? (
          <BlogCreateBox onClick={() => setStepNumber(1)} />
        ) : isStepNumber === 1 ? (
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <BlogLayoutSetting radioValue={radioValue} setValue={setRadioValue} onClick={layoutSetting} />
          </Stack>
        ) : (
          <BlogCustomInfo />
        )}
      </div>
    </div>
  );
};

export default CreatePage;
